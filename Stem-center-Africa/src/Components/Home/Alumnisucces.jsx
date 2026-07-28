import { useRef, useState } from "react";
import '../../Styles/Alumnisuccess.css';
import VideoEmbed from "../WoStem/VideoEmbed";

const alumniData = [
  {
    id: 1,
    name: "Sarah Kipchoge",
    title: "Software Engineer at Google",
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700&q=80',
    videoUrl: "https://youtu.be/xGO2Ww54eYQ",
    quote: "STEM Center Africa transformed my coding journey. The mentorship and resources helped me land my dream job."
  },
  {
    id: 2,
    name: "Michael Ochieng",
    title: "Data Scientist at Microsoft",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80',
    videoUrl: "https://youtu.be/xGO2Ww54eYQ",
    quote: "The AI/ML training at STEM Center Africa gave me the foundation I needed to excel in data science."
  }
];

function SpotlightCard({ person, onPlay }) {
  const handlePlayClick = () => {
    if (person.videoUrl && person.videoUrl !== "#") {
      if (typeof onPlay === 'function') onPlay(person.videoUrl);
    }
  };

  return (
    <div className="alumni-spotlight-card">
      <div className="alumni-spotlight-thumb" style={{ backgroundImage: `url(${person.image})` }}>
        <button
          type="button"
          className="alumni-play-button"
          onClick={handlePlayClick}
          aria-label="Play video"
        >
          <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <polygon points="6,3 20,12 6,21" />
          </svg>
        </button>
      </div>
      <div className="alumni-spotlight-content">
        <h3>{person.name}</h3>
        <p className="alumni-card-title">{person.title}</p>
        <p className="alumni-card-quote">"{person.quote}"</p>
      </div>
    </div>
  );
}

export default function AlumniSuccessStories({ compact = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openVideo, setOpenVideo] = useState(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const goNext = () => setActiveIndex((i) => (i + 1) % alumniData.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + alumniData.length) % alumniData.length);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (compact) {
    const person = alumniData[activeIndex];
    return (
      <>
        <div className="alumni-compact">
          <h2 className="alumni-title alumni-title--compact">Stories of change</h2>
          <div
            className="alumni-spotlight-track"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <SpotlightCard person={person} onPlay={setOpenVideo} />
          </div>
          <div className="alumni-spotlight-nav">
            <button onClick={goPrev} aria-label="Previous story" className="alumni-nav-btn">‹</button>
            <div className="alumni-dots" role="tablist" aria-label="Alumni slides">
              {alumniData.map((_, i) => (
                <button
                  key={i}
                  className={`alumni-dot${activeIndex === i ? " active" : ""}`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-selected={activeIndex === i}
                  role="tab"
                />
              ))}
            </div>
            <button onClick={goNext} aria-label="Next story" className="alumni-nav-btn">›</button>
          </div>
        </div>

        {openVideo && (
          <div className="alumni-video-modal-overlay" onClick={() => setOpenVideo(null)}>
            <div className="alumni-video-modal" onClick={(e) => e.stopPropagation()}>
              <button className="alumni-video-modal-close" onClick={() => setOpenVideo(null)} aria-label="Close video">✕</button>
              <VideoEmbed url={openVideo} title="Story of change video" />
            </div>
          </div>
        )}
      </>
    );
  }

  // original grid/carousel layout unchanged for standalone use
  return (
    <section className="alumni-section">
      {/* ...unchanged original JSX from your file... */}

      {openVideo && (
        <div className="alumni-video-modal-overlay" onClick={() => setOpenVideo(null)}>
          <div className="alumni-video-modal" onClick={(e) => e.stopPropagation()}>
            <button className="alumni-video-modal-close" onClick={() => setOpenVideo(null)} aria-label="Close video">✕</button>
            <VideoEmbed url={openVideo} title="Story of change video" />
          </div>
        </div>
      )}
    </section>
  );
}