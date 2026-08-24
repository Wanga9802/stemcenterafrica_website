import { Link } from 'react-router-dom';
import programs from '../data/Programs';
import '../Styles/Programs.css';
import proHero from '../assets/wostemt.JPG';
import BaHero from '../assets/wostemf.JPG';

export default function Programs() {
  return (
    <main className="programs-page">
      {/* ── HERO ── */}
      <section className="programs-hero">
        <div className="programs-hero__decor" aria-hidden="true" />
        <div className="programs-hero__inner container">
          <div className="programs-hero__copy">
            <span className="programs-hero__eyebrow">STEM Education</span>
            <h1 className="programs-hero__title">
              Explore all of our STEM programs
            </h1>
            <p className="programs-hero__subtitle">
              Discover every program built for young learners, educators, and
              communities — with practical skills, real projects, and
              future-ready outcomes.
            </p>
          </div>

          <div className="programs-hero__frame">
            <div
              className="programs-hero__image"
              style={{
                backgroundImage: `url(${proHero})`,
              }}
            />
            <div className="programs-hero__badge">
              <span className="programs-hero__badge-text">Programs</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAM LIST ── */}
      <section className="programs-list-section">
        <div className="programs-list-section__decor" aria-hidden="true" />
        <div className="programs-list-section__container">
          <div
            className="programs-list-section__media"
            style={{
              backgroundImage: `url(${BaHero})`,
            }}
          >
            <h2 className="programs-list-section__title">View Our Programs</h2>

            <div className="programs-grid">
              {programs.map((program) => (
                <article className="program-card" key={program.id}>
                  <div className="program-card__panel">
                    <span className="program-card__number">
                      {program.id.toString().padStart(2, '0')}
                    </span>
                    <span className="program-card__divider" />
                    <h3 className="program-card__title">{program.title}</h3>
                    <Link
                      to={program.path || `/programs/${program.slug}`}
                      className="program-card__button"
                    >
                      More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}