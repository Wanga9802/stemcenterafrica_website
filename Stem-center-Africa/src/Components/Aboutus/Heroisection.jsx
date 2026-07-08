import '../../Styles/Heroisection.css';
import React from 'react';
import storo from '../../assets/storyour.jpg';

const defaultStory = {
  title: 'Our Story',
  paragraphs: [
    "STEM Center Africa, founded in 2017, is a nonprofit based at Edenview Academy in Oyugis, Kenya. We offer mathematics, science, technology, and engineering programs that aim to inspire the next generation of mathematicians, scientists, and engineers and excite learners of all ages about the power and beauty of STEM education. We promote creativity, critical thinking, and problem-solving skills that we believe will help spur the economic growth of not only African countries but the world at large.",
  ],
  imageSrc: storo,
  imageAlt: 'Students working on computers at STEM Center Africa',
};

export default function Heroisection({ title, paragraphs, imageSrc, imageAlt }) {
  const storyTitle      = title      || defaultStory.title;
  const storyParagraphs = paragraphs || defaultStory.paragraphs;

  return (
    <section className="our-story-section" aria-label="Our story section">

      {/* ── Animated floating orbs (matches HeroSection) ── */}
      <div className="story-orb story-orb--1" aria-hidden="true" />
      <div className="story-orb story-orb--2" aria-hidden="true" />
      <div className="story-orb story-orb--3" aria-hidden="true" />

      {/* ── Main content ── */}
      <div className="container">
        <div className="row align-items-center">

          {/* Left: text */}
          <div className="col-12 col-md-12 col-lg-6 story-text-col">
            <h2 className="story-eyebrow">{storyTitle}</h2>
            <div className="story-body">
              {storyParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div className="col-12 col-md-12 col-lg-6 story-image-col">
            <div className="story-image-wrapper">
              <img
                className="story-img"
                src={imageSrc || defaultStory.imageSrc}
                alt={imageAlt || defaultStory.imageAlt}
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── Wave transition to white ── */}
      <div className="story-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,46 C280,86 520,86 760,54 C1000,24 1220,22 1440,44 L1440,120 L0,120 Z" />
        </svg>
      </div>

    </section>
  );
}
