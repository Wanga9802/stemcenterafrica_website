import '../../Styles/Heroe.css';
import HeroPhoto from '../../assets/problem.jpg';

const EducatorsHero = () => {
  return (
    <section className="eh-hero" aria-label="STEM Educators hero">

      {/* ── Background layers (same as Innovation Hub) ── */}
      <div className="eh-hero__bg" aria-hidden="true" />

      {/* ── Full-bleed photo (spans entire section) ── */}
      <div className="eh-hero__photo-panel eh-anim eh-anim--right">
        <img
          src={HeroPhoto}
          alt="Educators leading a STEM training session"
          className="eh-hero__photo"
        />
      </div>
      <div className="eh-hero__photo-overlay" aria-hidden="true" />

      <div className="eh-hero__grid" aria-hidden="true" />
      <div className="eh-hero__orb eh-hero__orb--1" aria-hidden="true" />
      <div className="eh-hero__orb eh-hero__orb--2" aria-hidden="true" />
      <div className="eh-hero__orb eh-hero__orb--3" aria-hidden="true" />

      {/* ── Main content ── */}
      <div className="container eh-hero__content">
        <div className="row align-items-center g-3">

          {/* ── LEFT: Text column ── */}
          <div className="col-lg-8 col-md-7 p-1">

            {/* Breadcrumb */}
            <nav className="eh-breadcrumb eh-anim" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span className="eh-breadcrumb__sep">&gt;</span>
              <span className="eh-breadcrumb__current">STEM Educators</span>
            </nav>

            {/* Headline */}
            <h1 className="eh-hero__headline eh-anim eh-anim--delay-2">
              Equipping Educators to Power Africa's <em>STEM</em> Future
            </h1>

            {/* Subheadline */}
            <p className="eh-hero__sub eh-anim eh-anim--delay-3">
              We train, resource, and support teachers across Africa with the skills, tools, and confidence to bring hands-on STEM learning into every classroom.
            </p>

            {/* CTA buttons */}
            <div className="eh-cta-group eh-anim eh-anim--delay-4">
              <a href="#structure" className="eh-btn-primary">
                Explore Training <i className="bi bi-arrow-right eh-btn-icon" aria-hidden="true"></i>
              </a>
              <a href="#partner" className="eh-btn-secondary">
                Partner with Us <i className="bi bi-download eh-btn-icon" aria-hidden="true"></i>
              </a>
            </div>

            

          </div>

        </div>
      </div>

    </section>
  );
};

export default EducatorsHero;
