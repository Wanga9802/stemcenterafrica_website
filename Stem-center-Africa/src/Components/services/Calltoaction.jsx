import React, { useEffect, useRef, useState } from "react";
import '../../Styles/CallToAction.css';

export default function CallToAction() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionObs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    const currentSection = sectionRef.current;
    if (currentSection) sectionObs.observe(currentSection);
    return () => { if (currentSection) sectionObs.unobserve(currentSection); };
  }, []);

  return (
    <section className="cta-section" ref={sectionRef}>
      <div className="cta-section__dots" />
      <div className="cta-section__orb cta-section__orb--left" />
      <div className="cta-section__orb cta-section__orb--right" />

      <div className="cta-section__inner">
        <div className={`cta-card ${visible ? "cta-card--visible" : ""}`}>

          {/* Top accent bar */}
          <div className="cta-card__topbar" />

          <div className="cta-card__content">

            {/* Badge */}
            <div className="cta-card__badge">
              <span className="cta-card__badge-dot" />
              Ready to build something great?
            </div>

            {/* Heading */}
            <h2 className="cta-card__title">
              Your Next Digital Product{" "}
              <span className="cta-card__title--accent">
                Starts With One Conversation.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="cta-card__subtitle">
              Whether you need a website, a booking system, a mobile app, or full
              AI automation — we scope it, price it fairly, and build it right.
            </p>

         

            {/* Actions */}
            <div className="cta-card__actions">
              <a
                href="https://wa.me/254759924543?text=Hi%2C%20I%27d%20like%20to%20request%20a%20solution"
                className="cta-btn cta-btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="cta-btn__icon"></span>
                Request a Solution
              </a>
            </div>

           

          </div>
        </div>
      </div>
    </section>
  );
}
