import '../../Styles/Projects.css';
import projects from '../../data/Projects';

export default function ProjectsShowcase() {
  const featuredProjects = projects.slice(0, 4);

  return (
    <section className="pj-section">
      <div className="container">

        {/* ── Header Row ── */}
        <div className="row align-items-end pj-header">
          <div className="col-md-8">
            <span className="pj-eyebrow">Student Projects</span>
            <h2 className="pj-heading">Young Innovators. Big Ideas.</h2>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <a href="/projects" className="pj-view-more-btn">
              View More Projects
            </a>
          </div>
        </div>

        {/* ── Cards Row ── */}
        <div className="row g-4 pj-cards-row">
          {featuredProjects.map((project) => (
            <div className="col-md-3" key={project.id}>
              <div className="pj-card shadow-lg">
                <div className="pj-card__image-wrap">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="pj-card__image"
                  />
                </div>
                <div className="pj-card__body">
                  <span className="pj-card__tag">{project.tag}</span>
                  <h3 className="pj-card__title">{project.title}</h3>
                  <p className="pj-card__desc">{project.description}</p>
                  <a href={`/projects/${project.slug}`} className="pj-card__link">
                    View Project
                    
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}