import '../../Styles/GirlsInSTEMHero.css';
import { Link } from 'react-router-dom';

const GirlsInSTEMHero = ({ program }) => {
  if (!program) return null;

  const hasOutline = program.hasOutline !== false;
  const hasEvidence = program.hasEvidence !== false;

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
            <h1 className="ph-hero__title">
              {program.title === 'Empowering Girls. Innovating the Future.' ? (
                <>
                  Empowering Girls. <em>Innovating the Future.</em>
                </>
              ) : (
                program.title
              )}
            </h1>

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
                  <Link
                    to="/programs"
                    className="ph-cta ph-cta--solid"
                  >
                    Our Programs
                    <i className="bi bi-arrow-right ph-cta__icon"></i>
                  </Link>
                )}
                {hasEvidence && (
                  <a href="#evidence" className="ph-cta ph-cta--ghost">
                    <i className="bi bi-heart ph-cta__icon ph-cta__icon--leading"></i>
                    Get Involved
                  </a>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Bottom stats bar */}
        <ul className="ph-facts" role="list">
          {program.duration && (
            <li className="ph-facts__item">
              <i className="bi bi-clock-fill ph-facts__icon" aria-hidden="true"></i>
              <span className="ph-facts__text">
                <span className="ph-facts__label">female participation</span>
                <span className="ph-facts__value">{program.duration}</span>
              </span>
            </li>
          )}
          {program.ageGroup && (
            <li className="ph-facts__item">
              <i className="bi bi-people-fill ph-facts__icon" aria-hidden="true"></i>
              <span className="ph-facts__text">
                <span className="ph-facts__label">GIRLS BY 2030</span>
                <span className="ph-facts__value">{program.ageGroup}</span>
              </span>
            </li>
          )}
          {program.level && (
            <li className="ph-facts__item">
              <i className="bi bi-bar-chart-fill ph-facts__icon" aria-hidden="true"></i>
              <span className="ph-facts__text">
                <span className="ph-facts__label">Level</span>
                <span className="ph-facts__value">{program.level}</span>
              </span>
            </li>
          )}
          {program.format && (
            <li className="ph-facts__item">
              <i className="bi bi-geo-alt-fill ph-facts__icon" aria-hidden="true"></i>
              <span className="ph-facts__text">
                <span className="ph-facts__label">Format</span>
                <span className="ph-facts__value">{program.format}</span>
              </span>
            </li>
          )}
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

export default GirlsInSTEMHero;
