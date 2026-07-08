import { useRef, useState } from "react";
import '../../Styles/Tour.css';
import tour from '../../assets/about.png';

const alumni = [
  {
    id: 1,
   
    thumbnail: tour,
    videoUrl: "https://youtu.be/FOb3VA2R7aU",

  },

];

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  try {
    const shortMatch = url.match(/youtu\.be\/([\w-]{11})/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1`;

    const fullMatch = url.match(/[?&]v=([\w-]{11})/);
    if (fullMatch) return `https://www.youtube.com/embed/${fullMatch[1]}?autoplay=1`;

    const embedMatch = url.match(/embed\/([\w-]{11})/);
    if (embedMatch) return `https://www.youtube.com/embed/${embedMatch[1]}?autoplay=1`;

    return url;
  } catch (e) {
    return url;
  }
}

function VideoCard({ person, isPlaying, onPlay, onClose }) {
  const handlePlayClick = () => {
    if (typeof onPlay === 'function') onPlay();
  };

  const embedUrl = getYouTubeEmbedUrl(person.videoUrl);

  return (
    <div className="alumnii-video-card">
      <div className="alumnii-card-thumbnail" style={{ backgroundImage: `url(${person.thumbnail})` }}>
        {!isPlaying && (
          <button
            type="button"
            className="alumnii-play-button"
            onClick={handlePlayClick}
            aria-label="Play video"
          >
            <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <polygon points="6,3 20,12 6,21" />
            </svg>
          </button>
        )}

        {isPlaying && (
          <>
            <iframe
              className="alumnii-card-iframe"
              title={`video-${person.id}`}
              src={embedUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button className="alumnii-video-close" onClick={onClose} aria-label="Close video">×</button>
          </>
        )}
      </div>

    </div>
  );
}

export default function Tour() {
  const [playing, setPlaying] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
 
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  function getYouTubeEmbedUrl(url) {
    if (!url) return null;
    try {
      // handle youtu.be short links
      const shortMatch = url.match(/youtu\.be\/([\w-]{11})/);
      if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1`;

      // handle full youtube URLs
      const fullMatch = url.match(/[?&]v=([\w-]{11})/);
      if (fullMatch) return `https://www.youtube.com/embed/${fullMatch[1]}?autoplay=1`;

      // handle already-embed URLs or direct ids
      const embedMatch = url.match(/embed\/([\w-]{11})/);
      if (embedMatch) return `https://www.youtube.com/embed/${embedMatch[1]}?autoplay=1`;

      // fallback: return the original URL (will likely fail to embed)
      return url;
    } catch (e) {
      return url;
    }
  }
 
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
 
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && activeIndex < alumni.length - 1) setActiveIndex((i) => i + 1);
      if (diff < 0 && activeIndex > 0) setActiveIndex((i) => i - 1);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <>
  

     <section className="alumnii-section">
        <div className="alumnii-container">
          {/* Header */}
        
 
          {/* ── Desktop grid ── */}
          <div className="alumnii-desktop-grid">
            {alumni.map((person) => (
              <VideoCard
                key={person.id}
                person={person}
                isPlaying={playing === person.id}
                onPlay={() => setPlaying(person.id)}
                onClose={() => setPlaying(null)}
              />
            ))}
          </div>
 
          {/* ── Mobile carousel ── */}
          <div
            className="alumnii-carousel-track"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="alumnii-carousel-inner"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {alumni.map((person) => (
                <div className="alumnii-carousel-slide" key={person.id}>
                  <VideoCard
                    person={person}
                    isPlaying={playing === person.id}
                    onPlay={() => setPlaying(person.id)}
                    onClose={() => setPlaying(null)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* inline iframe is rendered inside each VideoCard when playing */}
 
          {/* Pagination dots (mobile only) */}
          <div className="alumnii-dots" role="tablist" aria-label="Alumni slides">
            {alumni.map((_, i) => (
              <button
                key={i}
                className={`alumnii-dot${activeIndex === i ? " active" : ""}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={activeIndex === i}
                role="tab"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
