import { useState } from "react";
import '../../Styles/Tour.css';

const heroVideo = {
  id: 1,
  videoUrl: "https://youtu.be/FOb3VA2R7aU",
};

function extractYouTubeId(url) {
  if (!url) return null;
  const shortMatch = url.match(/youtu\.be\/([\w-]{11})/);
  if (shortMatch) return shortMatch[1];

  const fullMatch = url.match(/[?&]v=([\w-]{11})/);
  if (fullMatch) return fullMatch[1];

  const embedMatch = url.match(/embed\/([\w-]{11})/);
  if (embedMatch) return embedMatch[1];

  return null;
}

function getYouTubeEmbedUrl(url, muted) {
  const videoId = extractYouTubeId(url);
  if (!videoId) return url;

  const muteParam = muted ? 1 : 0;
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muteParam}&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1`;
}

function MuteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function UnmuteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

export default function Tour() {
  const [muted, setMuted] = useState(true);

  if (!heroVideo.videoUrl) return null;

  const embedUrl = getYouTubeEmbedUrl(heroVideo.videoUrl, muted);

  return (
    <section className="tour-hero" aria-label="Impact highlights video">
      <div className="tour-hero-media">
        <iframe
          key={muted ? 'muted' : 'unmuted'}
          className="tour-hero-iframe"
          title="STEM Center Africa impact video"
          src={embedUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <button
        type="button"
        className="tour-hero-mute-btn"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
      >
        {muted ? <MuteIcon /> : <UnmuteIcon />}
      </button>
    </section>
  );
}
