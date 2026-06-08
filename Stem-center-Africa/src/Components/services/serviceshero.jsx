import { useState, useEffect, useCallback } from "react";
import '../../Styles/ServiceHero.css'

/* ── DATA ─────────────────────────────────────────────────────────────── */
const IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80",
    badge: "Web Solutions",
    label: "Custom Websites & Platforms",
  },
  {
    url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80",
    badge: "Digital Commerce",
    label: "Point-of-Sale & eCommerce",
  },
  {
    url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&q=80",
    badge: "Education Tech",
    label: "School Management Systems",
  },
  {
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    badge: "Analytics",
    label: "Business Intelligence Dashboards",
  },
];

const SOLUTIONS = [
  {
    sector: "School Solutions",
    tag: "Education",
    tagColor: "#a78bfa",
    items: [
      "Online Admission Portal",
      "Fee Payment & Billing",
      "School Management System",
      "Online Classes & LMS",
    ],
  },
  {
    sector: "Digital Commerce",
    tag: "Business",
    tagColor: "#34d399",
    items: [
      "Point-of-Sale (POS) Systems",
      "Ecommerce Storefronts",
      "Inventory Management",
      "Mobile Payment Integration",
    ],
  },
  {
    sector: "Web & Brand",
    tag: "Digital",
    tagColor: "#FF4D9E",
    items: [
      "Custom Website Design",
      "Brand Identity & Logo",
      "SEO & Digital Marketing",
      "Social Media Management",
    ],
  },
  {
    sector: "Enterprise IT",
    tag: "Infrastructure",
    tagColor: "#fbbf24",
    items: [
      "Network Setup & Support",
      "Cloud Migration Services",
      "Cybersecurity Audits",
      "IT Help Desk & Maintenance",
    ],
  },
];

/* ── HOOK: auto-advance carousel ─────────────────────────────────────── */
function useCarousel(length, interval = 4000) {
  const [idx, setIdx] = useState(0);
  const next = useCallback(() => setIdx((i) => (i + 1) % length), [length]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + length) % length), [length]);

  useEffect(() => {
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [next, interval]);

  return { idx, next, prev, setIdx };
}

/* ── IMAGE CAROUSEL CARD ─────────────────────────────────────────────── */
function ImageCarousel({ images = IMAGES }) {
  const { idx, next, prev, setIdx } = useCarousel(images.length, 4500);
  const slide = images[idx];

  return (
    <div className="sh-img-card">
      {images.map((img, i) => (
        <div
          key={i}
          className={`sh-img-slide ${i === idx ? "sh-img-slide--active" : ""}`}
          style={{ backgroundImage: `url(${img.url})` }}
          aria-hidden={i !== idx}
        />
      ))}

      {/* dark overlay */}
      <div className="sh-img-overlay" />

      {/* badge */}
      <span className="sh-img-badge">{slide.badge}</span>
    </div>
  );
}

/* ── SOLUTIONS CAROUSEL CARD ─────────────────────────────────────────── */
function SolutionsCarousel({ solutions = SOLUTIONS }) {
  const { idx, setIdx } = useCarousel(solutions.length, 3800);
  const sol = solutions[idx];

  return (
    <div className="sh-sol-card">
      {/* header */}
      <div className="sh-sol-header">
        <span
          className="sh-sol-tag"
          style={{ background: `${sol.tagColor}22`, color: sol.tagColor, borderColor: `${sol.tagColor}55` }}
        >
          {sol.tag}
        </span>
      </div>

      {/* animated sector title */}
      <h3 className="sh-sol-title" key={idx}>{sol.sector}</h3>

      {/* items */}
      <ul className="sh-sol-list">
        {sol.items.map((item, i) => (
          <li key={i} className="sh-sol-item" style={{ animationDelay: `${i * 0.07}s` }}>
            <span className="sh-sol-bullet" style={{ background: sol.tagColor }} />
            {item}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button className="sh-sol-cta">Request a Demo</button>

      {/* tab indicators */}
      <div className="sh-sol-tabs">
        {solutions.map((s, i) => (
          <button
            key={i}
            className={`sh-sol-tab ${i === idx ? "sh-sol-tab--active" : ""}`}
            style={i === idx ? { borderColor: sol.tagColor, color: sol.tagColor } : {}}
            onClick={() => setIdx(i)}
          >
            {s.sector}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── MAIN COMPONENT ──────────────────────────────────────────────────── */
export function ServiceHero({
  badge = 'Trusted Technology Partner',
  title = 'Smart Solutions for',
  accent = 'Business Growth',
  description =
    'From custom websites and POS systems to school management platforms and digital commerce — we build the technology that moves your organisation forward.',
  perks = [
    'Schools & Universities',
    'Retail & Commerce',
    'Startups & NGOs',
    'Government Agencies',
  ],
  primaryCta = 'Request a Solution →',
  secondaryCta = 'View All Services',
  onPrimaryClick,
  onSecondaryClick,
  images = IMAGES,
  solutions = SOLUTIONS,
}) {
  return (
    <section className="sh-hero" aria-label="Services hero">
      {/* background layers */}
      <div className="sh-bg-glow sh-bg-glow--left"  aria-hidden="true" />
      <div className="sh-bg-glow sh-bg-glow--right" aria-hidden="true" />

      <div className="sh-inner">
        {/* ── LEFT ──────────────────────────────────────────── */}
        <div className="sh-left">
          <span className="sh-badge">
            <span className="sh-badge__dot" />
            {badge}
          </span>

          <h1 className="sh-title">
            {title}
            <br />
            <span className="sh-title__accent">{accent}</span>
          </h1>

          <p className="sh-desc">{description}</p>

          <ul className="sh-perks">
            {perks.map((p, i) => (
              <li key={i} className="sh-perk">
                <span className="sh-perk__check">✓</span> {p}
              </li>
            ))}
          </ul>

          <div className="sh-ctas">
            <button
              type="button"
              className="sh-cta sh-cta--primary"
              onClick={onPrimaryClick}
            >
              {primaryCta}
            </button>
            <button
              type="button"
              className="sh-cta sh-cta--outline"
              onClick={onSecondaryClick}
            >
              {secondaryCta}
            </button>
          </div>
        </div>

        {/* ── RIGHT ─────────────────────────────────────────── */}
        <div className="sh-right">
          <ImageCarousel images={images} />
          <SolutionsCarousel solutions={solutions} />
        </div>
      </div>
    </section>
  );
}

export default function ServicesHero(props) {
  return <ServiceHero {...props} />;
}
