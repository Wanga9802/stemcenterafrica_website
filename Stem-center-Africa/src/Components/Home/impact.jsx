import { useState, useRef, useEffect } from "react";
import '../../Styles/ImpactHighlights.css';
import { supabase } from '../../lib/supabaseClient';
import iosAppImage from '../../assets/iOS app development.jpg';
import roboticsImage from '../../assets/Robotics.jpg';
import arduinoImage from '../../assets/ARDUINO.jpg';
import computerImage from '../../assets/computers.jpg';
import pythonImage from '../../assets/python.jpg';
import scratchImage from '../../assets/scratch.jpg';
 
const DEFAULT_PROGRAMS = [
  {
    id: 1,
    title: "STEM Expo/Challenge 2025",
    description: "On December 10, 2025, we hosted a STEM Competition and STEM Fair, during which students showcased their innovation projects and competed in a range of STEM activities. 357 students participated, and 114 parents and guests attended.",
    image: iosAppImage,
  },
  {
    id: 2,
    title: "Robotics & Embedded Systems",
    description: "Build intelligent robots and embedded systems with hands-on projects using microcontrollers, sensors, and motor control.",
    image: roboticsImage,
  },
  {
    id: 3,
    title: "Arduino & IoT Development",
    description: "Learn to build interactive electronic projects with Arduino and explore the world of Internet of Things (IoT).",
    image: arduinoImage,
  },
  {
    id: 4,
    title: "Introduction to Basic Computer Skills",
    description: "Build confidence with everyday software: master Word, Excel, PowerPoint, email, and basic digital navigation for school, office, and career success",
    image: computerImage,
  },
  {
    id: 5,
    title: "Python Programming Bootcamp",
    description: "A practical Python bootcamp for beginners: write clean code, automate workflows, and build real-world projects using Python's most popular tools and frameworks.",
    image: pythonImage,
  },
  {
    id: 6,
    title: "Scratch Programming for Kids",
    description: "Introduce young learners to programming concepts through fun, interactive projects. Develop problem-solving skills and creativity while building their own games and animations.",
    image: scratchImage,
  },
];

function getHighlightImage(imagePath) {
  if (!imagePath) return ''
  if (imagePath.startsWith('http') || imagePath.startsWith('/assets')) return imagePath
  return supabase.storage.from('impact-highlights-images').getPublicUrl(imagePath).data.publicUrl
}

function normalizeHighlight(highlight) {
  return {
    id: highlight.id,
    title: highlight.title || 'Impact Highlight',
    description: highlight.summary || highlight.content || '',
    image: getHighlightImage(highlight.image_path),
  }
}
 
/*
 * Clone-based infinite carousel strategy:
 *
 * We build an extended list:
 *   [clone of LAST] [card 0] [card 1] ... [card n-1] [clone of FIRST]
 *
 * The real cards live at indices 1..n in this list.
 * trackIndex starts at 1 (pointing at real card 0).
 *
 * When the user navigates:
 *   - Into the clone-of-LAST  (trackIndex = 0)  → silently jump to real LAST  (trackIndex = n)
 *   - Into the clone-of-FIRST (trackIndex = n+1) → silently jump to real FIRST (trackIndex = 1)
 *
 * The silent jump happens AFTER the CSS transition ends, so the user never
 * sees a flash — it looks perfectly seamless.
 */
 
export default function Impact() {
  // trackIndex: position within the EXTENDED list (0 = clone-last, 1..n = real, n+1 = clone-first)
  const [trackIndex, setTrackIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [programs, setPrograms] = useState(DEFAULT_PROGRAMS);
  const touchStartX = useRef(null);
  const transitionTimeout = useRef(null);
  const n = programs.length;
 
  // The real active dot index (0-based)
  const dotIndex = trackIndex === 0 ? n - 1
                 : trackIndex === n + 1 ? 0
                 : trackIndex - 1;
 
  // Build the extended slides array: [last, ...real, first]
  const slides = [
    programs[n - 1],   // clone of last
    ...programs,        // real cards
    programs[0],        // clone of first
  ];

  useEffect(() => {
    async function loadImpactHighlights() {
      try {
        const { data, error } = await supabase
          .from('impact_highlights')
          .select('id, title, summary, content, image_path, is_published, sort_order, created_at')
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false })

        if (error) throw error

        const rows = data || []
        const publishedRows = rows.filter(item => item.is_published)
        const visibleRows = publishedRows.length > 0 ? publishedRows : rows
        const livePrograms = visibleRows.map(normalizeHighlight).filter(item => item.title && item.description && item.image)

        if (livePrograms.length > 0) {
          setPrograms(livePrograms)
          setTrackIndex(1)
        }
      } catch (error) {
        console.error('Failed to load impact highlights:', error)
      }
    }

    loadImpactHighlights()
  }, [])
 
  const moveTo = (newTrackIndex, withTransition = true) => {
    setIsTransitioning(withTransition);
    setTrackIndex(newTrackIndex);
  };
 
  const goNext = () => moveTo(trackIndex + 1);
  const goPrev = () => moveTo(trackIndex - 1);
 
  // After a transition into a clone, silently snap to the real card
  const handleTransitionEnd = () => {
    if (trackIndex === 0) {
      // Was showing clone-of-last → jump to real last
      moveTo(n, false);
    } else if (trackIndex === n + 1) {
      // Was showing clone-of-first → jump to real first
      moveTo(1, false);
    }
  };
 
  // Jump to a real card via dot click
  const goToDot = (dotIdx) => moveTo(dotIdx + 1);
 
  // Touch / swipe
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? goNext() : goPrev();
    touchStartX.current = null;
  };
 
  // Re-enable transition after a silent snap (next frame)
  useEffect(() => {
    if (!isTransitioning) {
      transitionTimeout.current = setTimeout(() => setIsTransitioning(true), 20);
    }
    return () => clearTimeout(transitionTimeout.current);
  }, [isTransitioning]);
 
  const trackStyle = {
    '--eli-active': trackIndex,
    transition: isTransitioning ? undefined : 'none',
  };
 
  return (
    <section className="eli-section">
      <div className="eli-container">
 
        {/* Header */}
        <div className="eli-header">
          <h2 className="eli-title">Impact <span>Highlights</span></h2>
          <p className="eli-subtitle">Impact in action; empowering learners, transforming futures.</p>
        </div>
 
        {/* Carousel */}
        <div className="eli-carousel-wrapper">
 
          <button className="eli-nav-btn left" onClick={goPrev} aria-label="Previous">‹</button>
 
          <div
            className="eli-track-container"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="eli-track"
              style={trackStyle}
              onTransitionEnd={handleTransitionEnd}
            >
              {slides.map((program, idx) => {
                const isActive = idx === trackIndex;
                return (
                  <div
                    key={`${program.id}-${idx}`}
                    className={`eli-card${isActive ? ' active' : ''}`}
                    onClick={() => !isActive && moveTo(idx)}
                  >
                    <div className="eli-card-inner">
                      <div className="eli-card-body">
                        <h3 className="eli-card-title">{program.title}</h3>
                        <p className="eli-card-desc">{program.description}</p>
                      </div>
                      <div className="eli-card-img-wrap">
                        <img src={program.image} alt={program.title} className="eli-card-img" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
 
          <button className="eli-nav-btn right" onClick={goNext} aria-label="Next">›</button>
 
        </div>
 
        {/* Dots — always reflect real card position */}
        <div className="eli-pagination-dots">
          {programs.map((_, i) => (
            <button
              key={i}
              className={`eli-dot${i === dotIndex ? ' active' : ''}`}
              onClick={() => goToDot(i)}
              aria-label={`Go to slide ${i + 1}`}
              type="button"
            />
          ))}
        </div>
 
        {/* Intakes */}
        <div className="eli-intakes">
          <p className="eli-intakes-label">We are Nurturing Africa's Tech Talent</p>
          <a href="#" className="eli-book-btn">Explore courses</a>
        </div>
 
      </div>
    </section>
  );
}
