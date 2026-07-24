import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import fallbackEvents from '../data/eventsData';
import '../Styles/Events.css';
import faqBannerImg from '../assets/faqs.jpg';

function formatEventDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function formatEventDateRange(startDate, endDate) {
  const start = formatEventDate(startDate);
  const end = formatEventDate(endDate);
  return start === end ? start : `${start} – ${end}`;
}

function formatEventDay(dateString) {
  return new Date(dateString).getDate();
}

function formatEventMonth(dateString) {
  return new Date(dateString)
    .toLocaleDateString(undefined, { month: 'short' })
    .toUpperCase();
}

function Events() {
  const [events, setEvents] = useState(fallbackEvents);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchEvents() {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('start_date', { ascending: true });

        if (error) throw error;

        if (!mounted) return;

        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((r) => ({
            id: r.id || r.event_id,
            title: r.title,
            location: r.location,
            startDate: r.start_date,
            endDate: r.end_date,
            time: r.time,
            excerpt: r.excerpt,
            descriptionBlocks: r.description_blocks,
            imageUrl: r.image_url,
            registerUrl: r.register_url,
            requiresRegistration: r.requires_registration,
            qrCodes: r.qr_codes,
          }));
          setEvents(mapped);
        }
      } catch (err) {
        // keep fallback events on error
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchEvents();
    return () => { mounted = false; };
  }, []);

  return (
    <main className="events-page">
      <section
        className="events-hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(7, 24, 55, 0.55), rgba(15, 47, 96, 0.55)), url(${faqBannerImg})`,
        }}
      >
        <div className="events-hero-content">
          <h1 className="events-hero-header">Events</h1>
        </div>
      </section>

      <section className="container events-grid">
        {loading ? (
          <p>Loading events…</p>
        ) : (
          events.map((event) => {
            return (
              <article key={event.id} className="event-card">
                <div
                  className="event-card-image"
                  style={{ backgroundImage: `url(${event.imageUrl})` }}
                />
                <span className="event-card-date">
                  <span className="event-card-date-day">{formatEventDay(event.startDate)}</span>
                  <span className="event-card-date-month">{formatEventMonth(event.startDate)}</span>
                </span>
                <div className="event-card-body">
                  <h2>{event.title}</h2>
                  <p className="event-card-meta">{event.location}</p>
                  <div className={`event-card-date-row ${event.startDate === event.endDate ? 'single-day' : ''}`}>
                    <p className="event-card-meta-p">
                      {formatEventDateRange(event.startDate, event.endDate)}
                    </p>
                    <span className="event-card-time">@ {event.time}</span>
                  </div>
                  <Link className="event-card-button mt-3" to={`/events/${event.id}`}>
                    View More 
                  </Link>
                </div>
              </article>
            )
          })
        )}
      </section>
    </main>
  );
}

export default Events;
