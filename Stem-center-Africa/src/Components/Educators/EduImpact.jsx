import { useState, useEffect, useRef } from 'react';
import '../../Styles/EduImpact.css';

// Swap these for real educator photos — keep the same variable names.
import maryPhoto from '../../assets/shalie.JPG';
import educator2Photo from '../../assets/shalie.JPG';
import educator3Photo from '../../assets/shalie.JPG';
import Learnicon from '../../assets/user.png';
import Gilrsicon from '../../assets/accreditation.png';
import Centericon from '../../assets/blocks.png';
import Schoolicon from '../../assets/book.png';

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'The training and resources from STEM Center Africa transformed how I teach. My students are more engaged, curious, and confident in solving real-world problems.',
    name: 'Mary A., STEM Educator',
    location: 'Homa Bay County',
    photo: maryPhoto,
  },
  {
    id: 2,
    quote:
      "Being part of this educator network changed my classroom completely. I now have the tools and confidence to teach STEM concepts hands-on, not just from a textbook.",
    name: 'Joseph K., STEM Educator',
    location: 'Kisumu County',
    photo: educator2Photo,
  },
  {
    id: 3,
    quote:
      'The mentorship and continuous support helped me grow as an educator. My students look forward to STEM lessons now more than ever.',
    name: 'Grace N., STEM Educator',
    location: 'Nakuru County',
    photo: educator3Photo,
  },
];

const AUTO_ROTATE_MS = 5000;

const IMPACT_STATS = [
  {
    id: 1,
    icon: Learnicon,
    color: '#7C3AED',
    value: '19,183+',
    label: 'Learners Reached Since Inception',
  },
  {
    id: 2,
    icon: Gilrsicon,
    color: '#4CAF50',
    value: '69%',
    label: 'Female Participation',
  },
  {
    id: 3,
    icon: Schoolicon,
    color: '#F5820D',
    value: '15+',
    label: 'Schools Impacted',
  },
  {
    id: 4,
    icon: Centericon,
    color: '#2F80ED',
    value: '2',
    label: 'STEM Centers Across Kenya',
  },
];

// ── Count-up helpers ──
// Splits a display string like "19,183+" into a numeric target (19183),
// whether it used comma formatting, and whatever suffix follows ("+", "%", "").
function parseStatValue(raw) {
  const match = String(raw).match(/^([\d,]+)(.*)$/);
  if (!match) {
    return { target: 0, suffix: raw, useComma: false };
  }
  const numStr = match[1];
  return {
    target: parseInt(numStr.replace(/,/g, ''), 10) || 0,
    suffix: match[2] || '',
    useComma: numStr.includes(','),
  };
}

function formatStatNumber(n, useComma) {
  return useComma ? n.toLocaleString('en-US') : String(n);
}

// ── Animated counter ──
// Counts up from 0 to the target once told to start (see `start` prop).
function StatCounter({ value, start, duration = 10000 }) {
  const { target, suffix, useComma } = parseStatValue(value);
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!start || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [start, target, duration]);

  return (
    <span>
      {formatStatNumber(display, useComma)}
      {suffix}
    </span>
  );
}

const EduImpact = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.disconnect(); // only need to trigger once
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const active = TESTIMONIALS[activeIndex];

  return (
    <section className="eim-section">
      <div className="container">
        <div className="row eim-row align-items-stretch">

          {/* ── Left: Testimonial ── */}
          <div className="col-lg-5">
            <div className="eim-testimonial">
              <div className="eim-testimonial__photo-wrap">
                <img
                  src={active.photo}
                  alt={active.name}
                  className="eim-testimonial__photo"
                />
              </div>

              <div className="eim-testimonial__body" key={active.id}>
                <span className="eim-testimonial__quote-mark">&ldquo;</span>
                <p className="eim-testimonial__text">{active.quote}</p>
                <p className="eim-testimonial__name">— {active.name}</p>
                <p className="eim-testimonial__location">{active.location}</p>
              </div>

              <div className="eim-dots">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.id}
                    className={`eim-dot ${i === activeIndex ? 'eim-dot--active' : ''}`}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Impact stats ── */}
          <div className="col-lg-7">
            <h3 className="eim-stats__heading">Our Impact Together</h3>

            <div className="row eim-stats-row" ref={statsRef}>
              {IMPACT_STATS.map((stat) => (
                <div className="col-md-3 col-sm-6 col-6" key={stat.id}>
                  <div
                    className="eim-stat-card shadow-lg"
                    style={{ borderTopColor: stat.color }}
                  >
                    <img
                      src={stat.icon}
                      alt={stat.label}
                      className="eim-stat-card__icon"
                      style={{ color: stat.color }}
                    />
                    <span
                      className="eim-stat-card__value"
                      style={{ color: stat.color }}
                    >
                      <StatCounter value={stat.value} start={statsInView} />
                    </span>
                    <span className="eim-stat-card__label">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EduImpact;
