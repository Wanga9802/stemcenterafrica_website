import '../../Styles/Explore.css';
import { Link } from 'react-router-dom';
import programs from '../../data/Programs.js';

// Controls which 8 programs show on the homepage, and in what order
const FEATURED_SLUGS = [
  "mathematics",
  "robotics",
  "teacher-training",
  "ai",
];

export default function ExplorePrograms() {
  const featuredPrograms = FEATURED_SLUGS
    .map((slug) => programs.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <section className="ep-section">
      <div className="ep-container">

        {/* Header */}
        <div className="ep-header">
          <span className="ep-eyebrow">Our Programs</span>
          <h2 className="ep-title">
            Hands-on Learning. <span>Real-world Impact.</span>
          </h2>
        </div>

        {/* Programs Grid — 2 rows x 4 cards */}
        <div className="row g-4 ep-grid-row">
          {featuredPrograms.map((program) => (
            <div className="col-md-3 col-6" key={program.id}>
              <a href={`/programs/${program.slug}`} className="ep-card">
                <div className="ep-icon-circle">
                  <img
                    src={program.icon}
                    alt={`${program.title} icon`}
                    className="ep-icon-img"
                  />
                </div>
                <h3 className="ep-card-title">{program.title}</h3>
                <p className="ep-card-desc">{program.description}</p>
                {program.heroImage && (
                  <div className="ep-card-hero">
                    <img
                      src={program.heroImage}
                      alt={`${program.title} hero`}
                      className="ep-card-hero-img"
                    />
                  </div>
                )}
              </a>
            </div>
          ))}
        </div>

        {/* Explore All Programs Link */}
        <div className="ep-all-btn-wrap">
          <Link to="/programs" className="ep-all-btn">
            Explore All Programs
          </Link>
        </div>

      </div>
    </section>
  );
}