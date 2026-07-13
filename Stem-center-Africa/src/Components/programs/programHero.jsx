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

const ProgramHero = ({ program }) => {
  if (!program) return null;

  const groupLabel = GROUP_LABELS[program.group] || "Programs";

  return (
    <section className="ph-hero" aria-label={`${program.title} hero`}>

      {/* ── Background photo with overlay ── */}
      <div className="ph-hero__bg-photo" aria-hidden="true">
        <img src={program.heroImage} alt="" className="ph-hero__photo" />
      </div>
      <div className="ph-hero__overlay" aria-hidden="true" />

      {/* ── Main content ── */}
      <div className="container ph-hero__content">

        {/* Breadcrumb */}
<nav className="ph-breadcrumb" aria-label="Breadcrumb">
  <Link to="/">Home</Link>
  <span className="ph-breadcrumb__sep">&gt;</span>
  <Link to="/programs">Programs</Link>
  <span className="ph-breadcrumb__sep">&gt;</span>
  <span className="ph-breadcrumb__current">{groupLabel}</span>
  <span className="ph-breadcrumb__sep">&gt;</span>
  <span className="ph-breadcrumb__current">{program.title}</span>
</nav>

        <div className="row">
          <div className="col-lg-8">

            {/* Eyebrow badge */}
            <div className="ph-badge">
              <span className="ph-badge__dot" />
              {groupLabel}
            </div>

            {/* Title */}
            <h1 className="ph-hero__title">{program.title}</h1>

            {/* Description */}
            <p className="ph-hero__sub">{program.description}</p>

          </div>
        </div>

      </div>

    </section>
  );
};

export default ProgramHero;