import '../../Styles/ProgramHero.css';
import { Link } from 'react-router-dom';

const GROUP_LABELS = {
  "computing-software": "Computing & Software",
  "robotics-embedded": "Robotics & Embedded Systems",
  "design-fabrication": "Design & Fabrication",
  "data-ai": "Data, AI & Emerging Tech",
  "science-exploration": "Science & Exploration",
  "creativity-life-skills": "Creativity & Life Skills",
};

// Bottom stats bar — same fields as before, just restyled/repositioned to
// sit as a strip at the base of the hero, above the wave cutout.
const QUICK_FACTS = [
  { key: "duration", icon: "bi-clock-fill", label: "Duration" },
  { key: "ageGroup", icon: "bi-people-fill", label: "Age Group" },
  { key: "level", icon: "bi-bar-chart-fill", label: "Level" },
  { key: "format", icon: "bi-geo-alt-fill", label: "Format" },
];

const ProgramHero = ({ program }) => {
  if (!program) return null;

  const groupLabel = GROUP_LABELS[program.group] || "Programs";
  const hasOutline = program.hasOutline !== false;
  const hasEvidence = program.hasEvidence !== false;

  // Floating badge stack over the photo. Pass `program.badges` (array of
  // { icon, label }) to fully customize — otherwise these are derived from
  // fields you already have (level, duration) plus two sensible defaults.
  const floatingBadges = program.badges?.length
    ? program.badges
    : [
        program.level && { icon: "bi-star-fill", label: `${program.level} Friendly` },
        program.duration && { icon: "bi-clock-fill", label: `${program.duration} Duration` },
        { icon: "bi-mortarboard-fill", label: "Certificate Awarded" },
        { icon: "bi-laptop-fill", label: "Hands-on Projects" },
      ].filter(Boolean);

  return (
    <section className="ph-hero" aria-label={`${program.title} hero`}>

      {/* ── Background photo with overlay + dot texture ── */}
      <div className="ph-hero__bg-photo" aria-hidden="true">
        <img src={program.heroImage} alt="" className="ph-hero__photo" />
      </div>
      <div className="ph-hero__overlay" aria-hidden="true" />
      <div className="ph-hero__dots" aria-hidden="true" />

      {/* ── Main content ── */}
      <div className="container ph-hero__content">

        <div className="row">
          <div className="col-lg-12">

            {/* Title */}
            <h1 className="ph-hero__title">{program.title}</h1>

            {/* Tagline (optional — set program.tagline in your data to use) */}
            {program.tagline && (
              <p className="ph-hero__tagline">{program.tagline}</p>
            )}

            {/* Description */}
            <p className="ph-hero__sub">{program.description}</p>

            {/* CTAs */}
            {(hasOutline || hasEvidence) && (
              <div className="ph-cta-row">
                {hasOutline && (
                  <a href="#outline" className="ph-cta ph-cta--solid">
                    Enroll Now
                    <i className="bi bi-arrow-right ph-cta__icon"></i>
                  </a>
                )}
                {hasEvidence && (
                  <a href="#evidence" className="ph-cta ph-cta--ghost">
                    <i className="bi bi-play-circle-fill ph-cta__icon ph-cta__icon--leading"></i>
                    Watch Class Video
                  </a>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Bottom stats bar */}
        <ul className="ph-facts" role="list">
          {QUICK_FACTS.map(({ key, icon, label }) => (
            program[key] ? (
              <li className="ph-facts__item" key={key}>
                <i className={`bi ${icon} ph-facts__icon`} aria-hidden="true"></i>
                <span className="ph-facts__text">
                  <span className="ph-facts__label">{label}</span>
                  <span className="ph-facts__value">{program[key]}</span>
                </span>
              </li>
            ) : null
          ))}
        </ul>

      </div>

      {/* ── Bottom wave cutout ── */}
      <svg
        className="ph-hero__wave"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,40 C240,90 480,0 720,20 C960,40 1200,90 1440,40 L1440,80 L0,80 Z"
          fill="#ffffff"
        />
      </svg>

    </section>
  );
};

export default ProgramHero;
