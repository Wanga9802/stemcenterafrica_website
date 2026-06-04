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
      "eCommerce Storefronts",
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
function ImageCarousel() {
  const { idx, next, prev, setIdx } = useCarousel(IMAGES.length, 4500);
  const slide = IMAGES[idx];

  return (
    <div className="sh-img-card">
      {IMAGES.map((img, i) => (
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
function SolutionsCarousel() {
  const { idx, setIdx } = useCarousel(SOLUTIONS.length, 3800);
  const sol = SOLUTIONS[idx];

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
      <button className="sh-sol-cta">Request a Demo →</button>

      {/* tab indicators */}
      <div className="sh-sol-tabs">
        {SOLUTIONS.map((s, i) => (
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
export default function ServicesHero() {
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
            Trusted Technology Partner
          </span>

          <h1 className="sh-title">
            Smart Solutions for<br />
            <span className="sh-title__accent">African Businesses</span>
          </h1>

          <p className="sh-desc">
            From custom websites and POS systems to school management platforms
            and digital commerce — we build the technology that moves your
            organisation forward.
          </p>

          <ul className="sh-perks">
            {["Schools & Universities", "Retail & Commerce", "Startups & NGOs", "Government Agencies"].map((p, i) => (
              <li key={i} className="sh-perk">
                <span className="sh-perk__check">✓</span> {p}
              </li>
            ))}
          </ul>

          <div className="sh-ctas">
            <button className="sh-cta sh-cta--primary">
              Request a Solution →
            </button>
            <button className="sh-cta sh-cta--outline">
              View All Services
            </button>
          </div>

          {/* stats row */}
          <div className="sh-stats">
            {[["50+", "Projects Delivered"], ["12+", "Industries Served"], ["98%", "Client Satisfaction"]].map(([val, lbl], i) => (
              <div key={i} className="sh-stat">
                <span className="sh-stat__val">{val}</span>
                <span className="sh-stat__lbl">{lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ─────────────────────────────────────────── */}
        <div className="sh-right">
          <ImageCarousel />
          <SolutionsCarousel />
        </div>
      </div>
    </section>
  );
}
