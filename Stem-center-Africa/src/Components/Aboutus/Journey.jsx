import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import '../../Styles/Journey.css';

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

function parseDateBadge(dateStr) {
  if (!dateStr) return { day: '', month: '', year: '' };
  const d = new Date(dateStr);
  return {
    day: String(d.getUTCDate()).padStart(2, '0'),
    month: MONTHS[d.getUTCMonth()].slice(0, 3),
    year: String(d.getUTCFullYear()),
  };
}

function resolveImageUrl(path) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  if (path.startsWith('/assets/')) return path;
  const { data } = supabase.storage.from('story-images').getPublicUrl(path);
  return data?.publicUrl ?? null;
}

export default function Journey() {
  const [stories, setStories] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('story_date', { ascending: false });
      if (!error && data?.length) {
        setStories(data);
      }
      setLoading(false);
    }
    fetchStories();
  }, []);

  if (loading) return null; // or a skeleton
  if (!stories.length) return null;

  const total = stories.length;
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const slide = stories[current];
  const badge = parseDateBadge(slide.story_date);
  const imgUrl = resolveImageUrl(slide.image_url);

  return (
    <section className="journey-section">
      <div className="container journey-container">

        {/* ── Heading ── */}
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="journey-heading">Our Journey + Milestones</h2>
          </div>
        </div>

        {/* ── Slider ── */}
        <div className="row justify-content-center align-items-center">

          {/* Prev button */}
          <div className="col-auto d-none d-md-flex">
            <button className="journey-nav-btn" onClick={prev} aria-label="Previous">
              ‹
            </button>
          </div>

          {/* Card */}
          <div className="col-12 col-md-11 col-lg-10">
            <div className="journey-card shadow-lg">

              {/* Left: text */}
              <div className="journey-card-text">
                <h3 className="journey-card-title">{slide.title}</h3>
                <p className="journey-card-desc">{slide.content}</p>
              </div>

              {/* Right: image with date badge */}
              <div className="journey-card-media">
                <div className="journey-date-badge">
                  <span className="journey-date-day-month">{badge.day} {badge.month}</span>
                  <span className="journey-date-year">{badge.year}</span>
                </div>
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt={slide.title}
                    className="journey-card-img"
                  />
                ) : (
                  <div className="journey-card-img journey-card-img--empty" />
                )}
              </div>

            </div>
          </div>

          {/* Next button */}
          <div className="col-auto d-none d-md-flex">
            <button className="journey-nav-btn" onClick={next} aria-label="Next">
              ›
            </button>
          </div>
        </div>

        {/* ── Dots (mobile) ── */}
        <div className="row justify-content-center mt-4">
          <div className="col-auto">
            <div className="journey-dots d-flex d-md-none">
              {stories.map((_, i) => (
                <button
                  key={i}
                  className={`journey-dot${i === current ? ' active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
