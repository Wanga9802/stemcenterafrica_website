import { useRef, useState } from "react";
import '../../Styles/Alumnisuccess.css';

const alumniData = [
  {
    id: 1,
    videoUrl: "https://youtu.be/W6g_gCKoDJI",
  },
];

function getYouTubeVideoId(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function getYouTubeEmbedUrl(videoId) {
  return `https://www.youtube.com/embed/${videoId}`;
}

function SpotlightCard({ person }) {
  const videoId = getYouTubeVideoId(person.videoUrl);
  const embedUrl = videoId ? getYouTubeEmbedUrl(videoId) : null;

  return (
    <div className="alumni-spotlight-card">
      <div className="alumni-spotlight-video-embed">
        <span className="alumni-spotlight-tag">Stories of Change</span>
        {embedUrl && (
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Story of Change"
          ></iframe>
        )}
      </div>
    </div>
  );
}

export default function AlumniSuccessStories({ compact = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
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
      <div className="alumni-compact">
        <div
          className="alumni-spotlight-track"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <SpotlightCard person={person} />
        </div>
        {alumniData.length > 1 && (
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
        )}
      </div>
    );
  }

  return (
    <section className="alumni-section">
      {/* ...unchanged original JSX from your file... */}
    </section>
  );
}
