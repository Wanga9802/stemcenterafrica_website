import { useRef, useState } from "react";
import '../../Styles/Alumnisuccess.css';

// Hardcoded alumni success stories
const alumniData = [
  {
    id: 1,
    name: "Sarah Kipchoge",
    title: "Software Engineer at Google",
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700&q=80',
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    quote: "STEM Center Africa transformed my coding journey. The mentorship and resources helped me land my dream job."
  },
  {
    id: 2,
    name: "Michael Ochieng",
    title: "Data Scientist at Microsoft",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80',
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    quote: "The AI/ML training at STEM Center Africa gave me the foundation I needed to excel in data science."
  }
];

function VideoCard({ person, onPlay }) {
  const handlePlayClick = () => {
    if (person.videoUrl && person.videoUrl !== "#") {
      window.open(person.videoUrl, '_blank');
    }
  };

  return (
    <div className="alumni-video-card">
      <div className="alumni-card-thumbnail" style={{ backgroundImage: `url(${person.image})` }}>
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
      <div className="alumni-card-content">
        <h3>{person.name}</h3>
        <p className="alumni-card-title">{person.title}</p>
        <p className="alumni-card-quote">"{person.quote}"</p>
      </div>
    </div>
  );
}

export default function AlumniSuccessStories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
 
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && activeIndex < alumniData.length - 1) setActiveIndex((i) => i + 1);
      if (diff < 0 && activeIndex > 0) setActiveIndex((i) => i - 1);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="alumni-section">
      <div className="alumni-container">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="alumni-title">Stories of change</h2>
        </div>

        {/* ── Desktop grid ── */}
        <div className="alumni-desktop-grid">
          {alumniData.map((person) => (
            <VideoCard key={person.id} person={person} />
          ))}
        </div>

        {/* ── Mobile carousel ── */}
        <div
          className="alumni-carousel-track"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="alumni-carousel-inner"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {alumniData.map((person) => (
              <div className="alumni-carousel-slide" key={person.id}>
                <VideoCard person={person} />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination dots (mobile only) */}
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
      </div>
    </section>
  );
}