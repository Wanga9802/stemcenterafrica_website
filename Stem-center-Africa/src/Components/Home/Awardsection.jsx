import { useEffect, useRef, useState } from "react";
import '../../Styles/Awardsection.css';
import { supabase } from '../../lib/supabaseClient'
import pythonImg from '../../assets/python.jpg'
import scratchImg from '../../assets/scratch.jpg'
import roboticsImg from '../../assets/Robotics.jpg'
import arduinoImg from '../../assets/ARDUINO.jpg'

const DEFAULT_AWARDS = [
  {
    id: 1,
    image: pythonImg,
    label: "Moringa listed among the most promising EdTech startups from Sub-Saharan Africa by HolonIQ",
  },
  {
    id: 2,
    image: scratchImg,
    label: "Higher Education Tech Leader 2021",
  },
  {
    id: 3,
    image: roboticsImg,
    label: "Moringa Named as World Technology Pioneers in 2021",
  },
  {
    id: 4,
    image: arduinoImg,
    label: "Most Preferred Corporate Training Institution 2021",
  },
  {
    id: 5,
    image: arduinoImg,
    label: "Best Tech Education Provider — East Africa 2022",
  },
  {
    id: 6,
    image: arduinoImg,
    label: "Top Cybersecurity Training Institution 2023",
  },
];

function normalizeAward(award) {
  return {
    id: award.id ?? award.label,
    image: award.image_path || award.image || award.image_url || '',
    label: award.title || award.label || '',
  }
}

function AwardCard({ award, style }) {
  return (
    <div className="award-item" style={style}>
      <div className="award-image-wrap">
        <img 
          src={award.image} 
          alt={award.label}
          className="award-image"
        />
      </div>
      <p className="award-label">{award.label}</p>
    </div>
  );
}

export default function AwardsSection() {
  // Mobile carousel state
  const [activeIndex, setActiveIndex] = useState(0);
  const [awards, setAwards] = useState(DEFAULT_AWARDS);
  const [loading, setLoading] = useState(true);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    const autoScrollDelay = 45000;

    const intervalId = setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % awards.length);
    }, autoScrollDelay);

    return () => clearInterval(intervalId);
  }, [awards.length]);

  useEffect(() => {
    async function loadAwards() {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('awards')
          .select('id, title, image_path, created_at')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Failed to load awards:', error)
          setAwards(DEFAULT_AWARDS)
          setLoading(false)
          return
        }

        if (!data || data.length === 0) {
          setAwards(DEFAULT_AWARDS)
          setLoading(false)
          return
        }

        const liveAwards = data.map(normalizeAward).filter(a => a.label && a.image)
        setAwards(liveAwards.length > 0 ? liveAwards : DEFAULT_AWARDS)
      } catch (e) {
        console.error('Error loading awards:', e)
        setAwards(DEFAULT_AWARDS)
      } finally {
        setLoading(false)
      }
    }

    loadAwards()
  }, [])

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove  = (e) => { touchEndX.current  = e.touches[0].clientX; };
  const handleTouchEnd   = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && activeIndex < awards.length - 1) setActiveIndex(i => i + 1);
      if (diff < 0 && activeIndex > 0)                 setActiveIndex(i => i - 1);
    }
    touchStartX.current = null;
    touchEndX.current   = null;
  };

  return (
    <section className="awards-section">
      <div className="awards-bg-texture" aria-hidden="true" />

      <div className="awards-container">

        {/* ── Heading ── */}
        <div className="awards-heading-col">
          <h2 className="awards-title">Our Awards</h2>
        </div>

      
        {/* ── RIGHT SIDE ── */}
        <div className="awards-right">

          {/* Desktop: horizontal scroll row */}
          <div className="awards-scroll-track">
            <div className="awards-scroll-inner">
              {[...awards, ...awards].map((award, i) => (
                <AwardCard
                  key={`${award.id}-${i}`}
                  award={award}
                  style={{ animationDelay: `${i * 0.08}s` }}
                />
              ))}
            </div>
          </div>

          {loading && awards.length === 0 && (
            <div className="awards-loading-message">Loading awards…</div>
          )}

          <div
            className="awards-mobile-carousel"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="awards-mobile-inner"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {awards.map((award) => (
                <div className="awards-mobile-slide" key={award.id}>
                  <AwardCard award={award} />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination dots (mobile only) */}
          <div className="awards-dots" role="tablist" aria-label="Award slides">
            {awards.map((_, i) => (
              <button
                key={i}
                className={`awards-dot${activeIndex === i ? " active" : ""}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to award ${i + 1}`}
                aria-selected={activeIndex === i}
                role="tab"
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
