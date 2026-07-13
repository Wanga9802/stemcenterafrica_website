import '../../Styles/Programprojects.css';
import projects from '../../data/Projects';

const ProgramProjects = ({ programSlug, programTitle }) => {
  const relatedProjects = projects.filter((p) => p.programSlug === programSlug);

  return (
    <section className="pj-section">
      <div className="container">

        {/* ── Header ── */}
        <div className="row align-items-end pj-header">
          <div className="col-md-8">
            <span className="pj-eyebrow">Student Projects</span>
            <h2 className="pj-heading">What Students Are Building</h2>
          </div>
        </div>

        {relatedProjects.length > 0 ? (
          <div className="row g-4 pj-cards-row">
            {relatedProjects.map((project) => (
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
        ) : (
          <div className="pp-empty-state">
            <i className="bi bi-hourglass-split pp-empty-state__icon"></i>
            <p className="pp-empty-state__text">
              Projects coming soon for {programTitle}.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default ProgramProjects;