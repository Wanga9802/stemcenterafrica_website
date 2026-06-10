import React, { useEffect, useRef, useState } from "react";
import '../../Styles/CallToAction.css';

export default function CallToAction({
  badgeText = "Ready to build something great?",
  titlePrefix = "Ready to get started with the right",
  serviceTitle = null,
  titleSuffix = "package",
  titleAccent = "Starts With One Conversation.",
  description = "Whether you need a website, a booking system, a mobile app, or full AI automation — we scope it, price it fairly, and build it right.",
  buttonText = "Request a Solution",
  serviceName = "solution"
}) {
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

  // Generate WhatsApp message
  const whatsappMessage = `Hi, I'd like to inquire about your ${serviceName} services`;
  const whatsappUrl = `https://wa.me/254759924543?text=${encodeURIComponent(whatsappMessage)}`;

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
              {badgeText}
            </div>

            {/* Heading */}
            <h2 className="cta-card__title">
              {titlePrefix}{" "}
              {serviceTitle ? (
                <span style={{ color: '#E91E8C' }}>
                  {serviceTitle} {titleSuffix}
                </span>
              ) : (
                titleAccent && (
                  <span className="cta-card__title--accent">
                    {titleAccent}
                  </span>
                )
              )}
            </h2>

            {/* Subtitle (conditionally rendered) */}
            {description && (
              <p className="cta-card__subtitle">
                {description}
              </p>
            )}

            {/* Actions */}
            <div className="cta-card__actions">
              <a
                href={whatsappUrl}
                className="cta-btn cta-btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="cta-btn__icon"></span>
                {buttonText}
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
