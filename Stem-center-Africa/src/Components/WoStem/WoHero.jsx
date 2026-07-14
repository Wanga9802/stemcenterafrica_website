import { useEffect, useRef, useState, useCallback } from "react";
import "../../Styles/WostemHero.css";
import wostemo from "../../assets/wostemo.JPG";
import wostemt from "../../assets/wostemt.JPG";
import wostemth from "../../assets/wostemth.JPG";
import wostemf from "../../assets/wostemf.JPG";
import wostemfi from "../../assets/wostemfi.JPG";
import wostemsi from "../../assets/wostemsi.JPG";
import wostemse from "../../assets/wostemse.JPG";

// Swap src with real photo imports/paths — add or remove slides freely
const SLIDES = [
  { id: 1, src: wostemo, alt: "Girls assembling a robot chassis" },
  { id: 2, src: wostemt, alt: "Coding club pair programming" },
  { id: 3, src: wostemth, alt: "3D printing workshop" },
  { id: 4, src: wostemf, alt: "Regional robotics competition" },
  { id: 5, src: wostemfi, alt: "Regional robotics competition" },
  { id: 6, src: wostemsi, alt: "Regional robotics competition" },
  { id: 7, src: wostemse, alt: "Regional robotics competition" },
];

const SLIDE_DURATION = 4500; // ms per slide

export default function WostemHero() {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((i) => {
    setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION);
  }, []);

  useEffect(() => {
    setLoaded(true);
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const handleDotClick = (i) => {
    goTo(i);
    resetTimer();
  };

  return (
    <section className="wostem-hero">
      <div className="wostem-hero-bg">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`wostem-slide${i === index ? " active" : ""}`}
            style={{ backgroundImage: `url(${slide.src})` }}
            role="img"
            aria-label={slide.alt}
          />
        ))}
        <div className="wostem-hero-scrim" />
      </div>

      <div className={`wostem-hero-content${loaded ? " show" : ""}`}>

        <h1 className="wostem-title">
          Inspiring Future Builders
        </h1>
        <p className="wostem-sub">
         DISCOVER . INNOVATION . CREATIVITY
        </p>
      </div>

      <div className="wostem-carousel-controls">
        <div className="wostem-dots">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              className={`wostem-dot${i === index ? " active" : ""}`}
              onClick={() => handleDotClick(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
