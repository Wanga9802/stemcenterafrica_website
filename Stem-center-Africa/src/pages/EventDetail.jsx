import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import '../Styles/EventsDetails.css';

/* ─── Date helpers ─────────────────────────────────────────── */
function formatEventDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}

function formatDateRange(startDate, endDate) {
  if (!endDate || startDate === endDate) return formatEventDate(startDate);
  return `${formatEventDate(startDate)} – ${formatEventDate(endDate)}`;
}

function getDateBadge(dateString) {
  const date = new Date(dateString);
  return {
    day: date.getDate(),
    month: date.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
  };
}

function truncateText(text, maxChars) {
  if (!text || text.length <= maxChars) return text;
  return `${text.slice(0, maxChars).trim()}...`;
}

/* ─── Rich description renderer ────────────────────────────── */
function DescriptionBlock({ block }) {
  switch (block.type) {
    case 'paragraph':
      return <p className="ed-desc-paragraph">{block.text}</p>;

    case 'heading':
      return <h3 className="ed-desc-heading">{block.text}</h3>;

    case 'highlight':
      return (
        <div className="ed-desc-highlight">
          <span className="ed-desc-highlight-label">{block.label}:</span>
          <span className="ed-desc-highlight-text"> {block.text}</span>
          {block.subtext && (
            <div className="ed-desc-highlight-sub">📍 {block.subtext}</div>
          )}
        </div>
      );

    case 'stats':
      return (
        <div className="ed-desc-stats">
          {block.items.map((item, i) => (
            <div key={i} className="ed-desc-stat-item">
              {item}
            </div>
          ))}
        </div>
      );

    case 'list':
      return (
        <ul className="ed-desc-list">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case 'tags':
      return (
        <div className="ed-desc-tags">
          {block.items.map((tag, i) => (
            <span key={i} className="ed-desc-tag">
              {tag}
            </span>
          ))}
        </div>
      );

    case 'links':
      return (
        <div className="ed-desc-links">
          {block.items.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="ed-desc-link"
            >
              → {link.label}
            </a>
          ))}
        </div>
      );

    case 'hashtags':
      return <p className="ed-desc-hashtags">{block.text}</p>;

    default:
      return null;
  }
}

/* ─── QR Code block ─────────────────────────────────────────── */
function QRCodeBlock({ qr }) {
  return (
    <div className="ed-qr-block">
      {qr.label && <p className="ed-qr-label">{qr.label}:</p>}
      <a href={qr.linkUrl} target="_blank" rel="noreferrer" className="ed-qr-link-row">
        🔗 {qr.linkLabel}
      </a>
      <img src={qr.imageUrl} alt={`QR code – ${qr.linkLabel}`} className="ed-qr-image" />
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────── */

function EventDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchEvent() {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', eventId)
          .single();
        if (error) throw error;
        if (!mounted) return;
        if (data) {
          setEvent({
            id: data.id || data.event_id,
            title: data.title,
            location: data.location,
            startDate: data.start_date,
            endDate: data.end_date,
            time: data.time,
            excerpt: data.excerpt,
            descriptionBlocks: data.description_blocks,
            imageUrl: data.image_url,
            registerUrl: data.register_url,
            requiresRegistration: data.requires_registration,
            qrCodes: data.qr_codes,
          });
        }
      } catch (err) {
        // console.error('Failed to load event', err)
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchEvent();
    return () => { mounted = false; };
  }, [eventId]);

  if (loading) {
    return (
      <div className="event-detail-loading container">
        <p>Loading event…</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="event-detail-notfound container">
        <h2>Event not found</h2>
        <p>The event you are looking for does not exist or may have been moved.</p>
        <Link to="/events" className="button-secondary">
          Back to Events
        </Link>
      </div>
    );
  }

  const badge = getDateBadge(event.startDate);
  const dateRange = formatDateRange(event.startDate, event.endDate);
  const heroExcerpt = truncateText(event.excerpt, 220);

  // Fallback: if no descriptionBlocks, wrap plain description string
  const blocks =
    event.descriptionBlocks ||
    (event.description
      ? [{ type: 'paragraph', text: event.description }]
      : []);

  return (
    <main className="event-detail-page">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="ed-hero">
        <div className="ed-hero-inner container">
          {/* Date badge */}
          <div className="ed-hero-badge">
            <span className="ed-hero-badge-day">{badge.day}</span>
            <span className="ed-hero-badge-month">{badge.month}</span>
          </div>

          <h1 className="ed-hero-title">{event.title}</h1>
          <p className="ed-hero-excerpt">{heroExcerpt}</p>

          <div className="ed-hero-meta">
            <strong>{dateRange}</strong>
            {event.time && <> | {event.time}</>}
          </div>

          {/* Scroll chevron */}
          <button
            className="ed-hero-chevron"
            aria-label="Scroll to details"
            onClick={() =>
              document
                .querySelector('.ed-body')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </section>

      {/* ── Body ──────────────────────────────────────────────── */}
      <section className="ed-body container">
        <div className="ed-grid">

          {/* LEFT COLUMN */}
          <div className="ed-left">

            {/* Join Us box */}
            <div className="ed-box">
              <h2 className="ed-box-title">Join Us</h2>

              <div className="ed-join-dates">
                <p className="ed-join-daterange">{dateRange}</p>
                {event.time && <p className="ed-join-time">@ {event.time}</p>}
                {event.location && <p className="ed-join-location">{event.location}</p>}
              </div>

              {event.requiresRegistration && (
                <a
                  className="ed-btn-primary"
                  href={event.registerUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Register Now
                </a>
              )}

              <hr className="ed-box-divider" />

              {/* Mini date card */}
              <div className="ed-mini-card">
                <div className="ed-mini-badge">
                  <span className="ed-mini-badge-day">{badge.day}</span>
                  <span className="ed-mini-badge-month">{badge.month}</span>
                </div>
                <div className="ed-mini-dates">
                  <p>{formatEventDate(event.startDate)}</p>
                  {event.endDate && event.endDate !== event.startDate && (
                    <>
                      <p className="ed-mini-dash">–</p>
                      <p>{formatEventDate(event.endDate)}</p>
                    </>
                  )}
                  {event.time && <p className="ed-mini-time">{event.time}</p>}
                </div>
              </div>
            </div>

            {/* QR code boxes */}
            {event.qrCodes && event.qrCodes.length > 0 && (
              <div className="ed-box ed-qr-box">
                {event.qrCodes.map((qr, i) => (
                  <QRCodeBlock key={i} qr={qr} />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="ed-right">

            {/* Image at top */}
            {event.imageUrl && (
              <div
                className="ed-event-image"
                style={{ backgroundImage: `url(${event.imageUrl})` }}
                role="img"
                aria-label={event.title}
              />
            )}

            {/* Rich description */}
            <div className="ed-box ed-description-box">
              <h2 className="ed-box-title">About the Event</h2>
              {blocks.map((block, i) => (
                <DescriptionBlock key={i} block={block} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default EventDetail;
