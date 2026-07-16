import { useState, useEffect, useRef } from "react";
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
    images: [iosAppImage, roboticsImage, arduinoImage],
  },
  {
    id: 2,
    title: "Robotics & Embedded Systems",
    description: "Build intelligent robots and embedded systems with hands-on projects using microcontrollers, sensors, and motor control.",
    images: [roboticsImage, arduinoImage,computerImage],
  },
  {
    id: 3,
    title: "Arduino & IoT Development",
    description: "Learn to build interactive electronic projects with Arduino and explore the world of Internet of Things (IoT).",
    images: [arduinoImage, computerImage, pythonImage]
  },
  {
    id: 4,
    title: "Introduction to Basic Computer Skills",
    description: "Build confidence with everyday software: master Word, Excel, PowerPoint, email, and basic digital navigation for school, office, and career success",
    images: [computerImage, arduinoImage, pythonImage],
  },
  {
    id: 5,
    title: "Python Programming Bootcamp",
    description: "A practical Python bootcamp for beginners: write clean code, automate workflows, and build real-world projects using Python's most popular tools and frameworks.",
    images: [pythonImage, arduinoImage , computerImage],
  },
  {
    id: 6,
    title: "Scratch Programming for Kids",
    description: "Introduce young learners to programming concepts through fun, interactive projects. Develop problem-solving skills and creativity while building their own games and animations.",
    images: [scratchImage, computerImage, pythonImage],
  },
];

function resolveImage(path) {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('/assets')) return path;
  return supabase.storage.from('impact-highlights-images').getPublicUrl(path).data.publicUrl;
}

function normalizeHighlight(highlight) {
  // Prefer a gallery array if your table has one; fall back to the single image_path
  let images = [];
  if (Array.isArray(highlight.gallery_paths) && highlight.gallery_paths.length > 0) {
    images = highlight.gallery_paths.map(resolveImage);
  } else if (highlight.image_path) {
    images = [resolveImage(highlight.image_path)];
  }

  return {
    id: highlight.id,
    title: highlight.title || 'Impact Highlight',
    description: highlight.summary || highlight.content || '',
    images: images.filter(Boolean),
  };
}

// Pulls the first "number + label" pair out of a description, e.g.
// "357 students participated" -> { value: "357", label: "students" }
function extractStat(description) {
  if (!description) return null;
  const match = description.match(/(\d[\d,]*)\+?\s+([a-zA-Z][a-zA-Z\s]{2,20}?)(?:[.,]| participated| attended| showcased)/);
  if (!match) return null;
  const value = match[1];
  const label = match[2].trim().split(/\s+/).slice(-2).join(' ');
  return { value, label };
}

// Renders a masonry-style evidence gallery, layout adapts to how many photos exist.
function EvidenceGrid({ images, title, stat }) {
  // Ensure every gallery renders using the same 3-photo layout.
  const originalCount = images.length || 0;
  const filled = (() => {
    const arr = (images || []).slice();
    if (arr.length === 0) return [];
    while (arr.length < 3) arr.push(arr[arr.length - 1]);
    return arr.slice(0, 3);
  })();

  const shown = filled;
  const extraCount = Math.max(0, originalCount - 3);
  const countClass = 'count-3';

  return (
    <div className="ihz-media">
      <div className={`ihz-grid ${countClass}`}>
        {shown.map((src, i) => (
          src ? (
            <div className="ihz-photo" key={i}>
              <img src={src} alt={`${title} — evidence ${i + 1}`} loading="lazy" />
              {i === shown.length - 1 && extraCount > 0 && (
                <div className="ihz-photo-overlay">+{extraCount}</div>
              )}
            </div>
          ) : null
        ))}
      </div>
      {stat && (
        <div className="ihz-stat-badge">
          <span className="ihz-stat-value">{stat.value}</span>
          <span className="ihz-stat-label">{stat.label}</span>
        </div>
      )}
    </div>
  );
}

function HighlightRow({ program, index, reduceMotion }) {
  const rowRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isReversed = index % 2 === 1;
  const stat = extractStat(program.description);

  useEffect(() => {
    if (reduceMotion) {
      setIsVisible(true);
      return;
    }
    const el = rowRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div
      ref={rowRef}
      className={`ihz-row${isReversed ? ' reversed' : ''}${isVisible ? ' visible' : ''}${index % 2 === 0 ? ' tint' : ''}`}
    >
      <EvidenceGrid images={program.images} title={program.title} stat={stat} />

      <div className="ihz-content">
        <span className="ihz-eyebrow">Impact Story</span>
        <h3 className="ihz-title">{program.title}</h3>
        <p className="ihz-desc">{program.description}</p>
      </div>
    </div>
  );
}

export default function Impact() {
  const [programs, setPrograms] = useState(DEFAULT_PROGRAMS);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    async function loadImpactHighlights() {
      try {
        const { data, error } = await supabase
          .from('impact_highlights')
          .select('id, title, summary, content, image_path, gallery_paths, is_published, sort_order, created_at')
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (error) throw error;

        const rows = data || [];
        const publishedRows = rows.filter(item => item.is_published);
        const visibleRows = publishedRows.length > 0 ? publishedRows : rows;
        const livePrograms = visibleRows
          .map(normalizeHighlight)
          .filter(item => item.title && item.description && item.images.length > 0);

        if (livePrograms.length > 0) {
          setPrograms(livePrograms);
        }
      } catch (error) {
        console.error('Failed to load impact highlights:', error);
      }
    }

    loadImpactHighlights();
  }, []);

  return (
    <section className="ihz-section">
      <div className="ihz-header">
        <h2 className="ihz-page-title">Impact <span>Highlights</span></h2>
        <p className="ihz-page-subtitle">Impact in action; empowering learners, transforming futures.</p>
      </div>

      <div className="ihz-thread-wrap">
        <div className="ihz-thread" aria-hidden="true" />
        {programs.map((program, index) => (
          <HighlightRow
            key={program.id}
            program={program}
            index={index}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </section>
  );
}