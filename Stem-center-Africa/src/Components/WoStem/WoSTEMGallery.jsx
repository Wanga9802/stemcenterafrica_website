
import { useEffect, useState } from "react";
import { facilitiesGallery } from "../../data/wostemData";
import "../../Styles/WoSTEMGallery.css";

const AUTO_ADVANCE_MS = 4000;

const WoSTEMGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentImage = facilitiesGallery[activeIndex] || facilitiesGallery[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % facilitiesGallery.length);
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="wostem-gallery">
      <div className="wostem-gallery-frame">
        {currentImage ? (
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="wostem-gallery-image"
          />
        ) : null}
      </div>

      <div className="wostem-gallery-dots">
        {facilitiesGallery.map((_, i) => (
          <button
            key={i}
            className={`wostem-dot ${i === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(i)}
            aria-label={`Show image ${i + 1}`}
          />
        ))}
      </div>

      <p className="wostem-gallery-caption">Gallery: WoSTEM in Action</p>
    </section>
  );
};

export default WoSTEMGallery;