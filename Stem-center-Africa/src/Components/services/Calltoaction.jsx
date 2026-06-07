import React, { useEffect, useRef, useState } from "react";
import '../../Styles/CallToAction.css';

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "5+", label: "Years Experience" },
  { value: "24h", label: "Response Time" },
];

const trustPoints = [
  "No long-term contracts — start small, scale fast",
  "M-Pesa & local payment support built-in",
  "Dedicated support after every launch",
  "Kenya-based team, global standards",
];

export default function CallToAction() {
  const [visible, setVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const sectionRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const sectionObs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    const statsObs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.1 }
    );
    
    const currentSection = sectionRef.current;
    const currentStats = statsRef.current;

    if (currentSection) sectionObs.observe(currentSection);
    if (currentStats) statsObs.observe(currentStats);

    return () => {
      if (currentSection) sectionObs.unobserve(currentSection);
      if (currentStats) statsObs.unobserve(currentStats);
    };
  }, []);

  return (
    <section className="cta-section" ref={sectionRef}>
      {/* Dynamic Background Layout */}
      <div className="cta-section__dots" />
      <div className="cta-section__orb cta-section__orb--left" />
      <div className="cta-section__orb cta-section__orb--right" />

      <div className="cta-section__inner">
        
        {/* ── Stats Bar ── */}
        <div
          className={`cta-stats ${statsVisible ? "cta-stats--visible" : ""}`}
          ref={statsRef}
        >
          {stats.map((s, i) => (
            <div
              className="cta-stat"
              key={i}
              style={{ "--i": i }}
            >
              <span className="cta-stat__value">{s.value}</span>
              <span className="cta-stat__label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Main CTA Card ── */}
        <div className={`cta-card ${visible ? "cta-card--visible" : ""}`}>
          <div className="cta-card__stripe" />

          <div className="cta-card__content">
            <div className="cta-card__badge">
              <span className="cta-card__badge-dot" />
              Ready to build something great?
            </div>

            <h2 className="cta-card__title">
              Your Next Digital Product <br />
              <span className="cta-card__title--pink">Starts With One Conversation.</span>
            </h2>

            <p className="cta-card__subtitle">
              Whether you need a website, a booking system, a mobile app, or full
              AI automation — we scope it, price it fairly, and build it right.
              No fluff, no hidden costs.
            </p>

            <div className="cta-trust">
              {trustPoints.map((point, i) => (
                <div key={i} className="cta-trust__item">
                  <span className="cta-trust__icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </span>
                  {point}
                </div>
              ))}
            </div>

            <div className="cta-card__actions">
              <a
                href="https://wa.me/254759924543?text=Hi%2C%20I%27d%20like%20to%20request%20a%20solution"
                className="cta-btn cta-btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="cta-btn__icon">💬</span>
                Request a Solution
              </a>
              <a href="/services" className="cta-btn cta-btn--ghost">
                View All Services →
              </a>
            </div>

            <p className="cta-card__reassurance">
              🔒 Free consultation · No commitment required · Reply within 24 hours
            </p>
          </div>

          {/* Right interactive visual panel */}
          <div className="cta-card__visual">
            <div className="cta-visual__ring cta-visual__ring--outer" />
            <div className="cta-visual__ring cta-visual__ring--mid" />
            <div className="cta-visual__ring cta-visual__ring--inner" />
            <div className="cta-visual__center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M24 4L44 14V34L24 44L4 34V14L24 4Z" stroke="#E91E8C" strokeWidth="1.5" fill="none" opacity="0.4" />
                <path d="M24 12L36 18V30L24 36L12 30V18L24 12Z" fill="rgba(233,30,140,0.15)" stroke="#E91E8C" strokeWidth="1.5" />
                <circle cx="24" cy="24" r="6" fill="#E91E8C" />
                <circle cx="24" cy="24" r="3" fill="#fff" />
              </svg>
              <span className="cta-visual__label">Let's Build</span>
            </div>

            <div className="cta-float cta-float--1">Web Dev</div>
            <div className="cta-float cta-float--2">AI Tools</div>
            <div className="cta-float cta-float--3">Mobile</div>
            <div className="cta-float cta-float--4">M-Pesa</div>
          </div>
        </div>

      </div>
    </section>
  );
}