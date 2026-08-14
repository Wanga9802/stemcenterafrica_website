import { useRef, useState } from "react";
import '../../Styles/Alumnisuccess.css';
import VideoEmbed from "../WoStem/VideoEmbed";
import ThumbHero from '../../assets/thambu.png'
import storyVideo from '../../assets/Stopro.mp4';

const alumniData = [
  {
    id: 1,
    image: ThumbHero,
    videoUrl: storyVideo,
  },
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
        <span className="alumni-spotlight-tag">Stories of Change</span>
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
    </div>
  );
}

function isLocalVideo(url) {
  return typeof url === 'string' && /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
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

  const renderVideoModal = () => {
    if (!openVideo) return null;
    return (
      <div className="alumni-video-modal-overlay" onClick={() => setOpenVideo(null)}>
        <div className="alumni-video-modal" onClick={(e) => e.stopPropagation()}>
          <button className="alumni-video-modal-close" onClick={() => setOpenVideo(null)} aria-label="Close video">✕</button>
          {isLocalVideo(openVideo) ? (
            <video
              className="alumni-local-video"
              src={openVideo}
              controls
              autoPlay
              playsInline
            />
          ) : (
            <VideoEmbed url={openVideo} title="Story of change video" />
          )}
        </div>
      </div>
    );
  };

  if (compact) {
    const person = alumniData[activeIndex];
    return (
      <>
        <div className="alumni-compact">
          <div
            className="alumni-spotlight-track"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <SpotlightCard person={person} onPlay={setOpenVideo} />
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

        {renderVideoModal()}
      </>
    );
  }

  return (
    <section className="alumni-section">
      {/* ...unchanged original JSX from your file... */}

      {renderVideoModal()}
    </section>
  );
}