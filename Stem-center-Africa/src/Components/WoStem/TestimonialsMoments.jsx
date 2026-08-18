import React, { useState, useEffect, useRef } from "react";
import "../../Styles/TestimonialsMoments.css";
import Jaiimage from "../../assets/evidence/3ddesigning/3d2.jpg"
import Mitchimage from "../../assets/wostemo.JPG"
import Joyimage from "../../assets/wostemei.JPG"
import GalleryImage1 from "../../assets/wostemt.JPG"
import GalleryImage2 from "../../assets/wostemfi.JPG"
import GalleryImage3 from "../../assets/wostemf.JPG"

const DEFAULT_TESTIMONIALS = [
  {
    quote:
      "STEM has given me confidence to build my skills in 3D designing , as I can now create amazing models.",
    name: "Jainice, 14",
    role: "STEM Center Africa Learner",
    avatar: Jaiimage,
  },
  {
    quote:
     "STEM gave me the confidence to believe in myself. I love building robots and I dream of becoming an engineer who will build solutions for my community.",
    name: "Mitchell, 15",
    role: "STEM Center Africa Learner",
    avatar: Mitchimage,
  },
  {
    quote:
       "Before joining STEM, I never imagined coding could be for me. Now I've learnt scratch and I want to teach other girls in my village to code too.",
    name: "Joy, 11",
    role: "STEM Center Africa Learner",
    avatar: Joyimage,
  },
];

const DEFAULT_IMAGES = [
  { src: GalleryImage1, alt: "Girl piloting a drone outdoors" },
  { src: GalleryImage2, alt: "Girls building a robotics project together" },
  { src: GalleryImage3, alt: "Girl working on an electronics circuit board" },
];

export default function TestimonialsMoments({
  testimonials = DEFAULT_TESTIMONIALS,
  images = DEFAULT_IMAGES,
  interval = 5000,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  const displayImages = images.slice(0, 3);

  useEffect(() => {
    if (testimonials.length <= 1) return undefined;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timerRef.current);
  }, [testimonials.length, interval]);

  const goTo = (index) => {
    clearInterval(timerRef.current);
    setActiveIndex(index);
  };

  return (
    <section className="tm-section">
      <div className="container">
        <div className="row align-items-stretch tm-row">
          {/* Left column — Testimonial carousel */}
          <div className="col-lg-5 tm-col-left">
            <p className="tm-eyebrow">Girls. Dreams. Impact.</p>
            <h2 className="tm-heading">Real Stories, Real Impact</h2>

            <div className="tm-carousel" role="region" aria-label="Learner testimonials" aria-live="polite">
              {testimonials.map((t, index) => (
                <article
                  key={t.name}
                  className={`tm-card ${index === activeIndex ? "is-active" : ""}`}
                  aria-hidden={index !== activeIndex}
                >
                  <span className="tm-quote-mark" aria-hidden="true">
                    &ldquo;
                  </span>
                  <div className="tm-card-body">
                    <div className="tm-avatar-wrap">
                      <img className="tm-avatar" src={t.avatar} alt={t.name} />
                    </div>
                    <div className="tm-content">
                      <p className="tm-quote">{t.quote}</p>
                      <p className="tm-name">- {t.name}</p>
                      <p className="tm-role">{t.role}</p>
                    </div>
                  </div>
                </article>
              ))}

              <div className="tm-dots" role="tablist" aria-label="Select testimonial">
                {testimonials.map((t, index) => (
                  <button
                    key={t.name}
                    type="button"
                    role="tab"
                    aria-selected={index === activeIndex}
                    aria-label={`Show testimonial from ${t.name}`}
                    className={`tm-dot ${index === activeIndex ? "is-active" : ""}`}
                    onClick={() => goTo(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right column — Moments that matter */}
          <div className="col-lg-7 tm-col-right">
            <p className="tm-eyebrow">Moments That Matter</p>
            <h2 className="tm-heading">Inspiring Girls Every Day</h2>

            <div className="tm-gallery">
              {displayImages.map((img) => (
                <div className="tm-gallery-item" key={img.src}>
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
