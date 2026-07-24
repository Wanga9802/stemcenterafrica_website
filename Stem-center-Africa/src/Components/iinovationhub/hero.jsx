import '../../Styles/Hero.css';
import InnovationCenterIcon from '../../assets/solution.png';
import LifelongLearningIcon from '../../assets/lifelong-learning.png';
import ShareIcon from '../../assets/share.png';
import Hubphoto from '../../assets/Elias.jpeg';

// TEMP placeholder — swap for your real Innovation Hub photo (e.g. import HubPhoto from '../../assets/innovation-hub.jpg')
const HubPhoto = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80';

const InnovationHubHero = () => {
  return (
    <section className="ihh-hero" aria-label="Innovation Hub hero">

      {/* ── Background layers (same as homepage) ── */}
      <div className="ihh-hero__bg" aria-hidden="true" />

      {/* ── Full-bleed photo (spans entire section) ── */}
      <div className="ihh-hero__photo-panel ihh-anim ihh-anim--right">
        <img
          src={HubPhoto}
          alt="Students prototyping in the SCA Innovation Hub"
          className="ihh-hero__photo"
        />
      </div>
      <div className="ihh-hero__photo-overlay" aria-hidden="true" />

      <div className="ihh-hero__grid" aria-hidden="true" />
      <div className="ihh-hero__orb ihh-hero__orb--1" aria-hidden="true" />
      <div className="ihh-hero__orb ihh-hero__orb--2" aria-hidden="true" />
      <div className="ihh-hero__orb ihh-hero__orb--3" aria-hidden="true" />

      {/* ── Main content ── */}
      <div className="container ihh-hero__content">
        <div className="row align-items-center g-3">

          {/* ── LEFT: Text column ── */}
          <div className="col-lg-8 col-md-7 p-1">

            {/* Breadcrumb */}
            <nav className="ihh-breadcrumb ihh-anim" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span className="ihh-breadcrumb__sep">&gt;</span>
              <span className="ihh-breadcrumb__current">Innovation Hub</span>
            </nav>

            {/* Headline */}
            <h1 className="ihh-hero__headline ihh-anim ihh-anim--delay-2">
              Inventing Africa's Future - One <em>Innovation</em> at a Time
            </h1>

            {/* Subheadline */}
            <p className="ihh-hero__sub ihh-anim ihh-anim--delay-3">
              SCA Innovation Hub transforms bold ideas into real-world innovations across AI, Robotics, Space, Biotech, Climate Tech, Smart Agriculture, HealthTech, Clean Energy, EdTech and more.
            </p>

            {/* CTA buttons */}
            <div className="ihh-cta-group ihh-anim ihh-anim--delay-4">
              <a href="#innovation-projects" className="ihh-btn-primary">
                Explore Innovations <span className="ihh-btn-icon">→</span>
              </a>
              <a href="#roadmap" className="ihh-btn-secondary">
                Partner with Us <span className="ihh-btn-icon">→</span>
              </a>
            </div>

            {/* Quick stats */}
            <div className="ihh-stats ihh-anim ihh-anim--delay-5">
              <div className="ihh-stat">
                <div className="ihh-stat__icon-wrap">
                  <img src={InnovationCenterIcon} alt="" className="ihh-stat__icon" />
                </div>
                <div className="ihh-stat__text">
                  <span className="ihh-stat__value">2</span>
                  <span className="ihh-stat__label">Innovation Centers</span>
                </div>
              </div>

              <div className="ihh-stat">
                <div className="ihh-stat__icon-wrap">
                  <img src={LifelongLearningIcon} alt="" className="ihh-stat__icon" />
                </div>
                <div className="ihh-stat__text">
                  <span className="ihh-stat__value">18,712+</span>
                  <span className="ihh-stat__label">Learners Reached</span>
                </div>
              </div>

              <div className="ihh-stat">
                <div className="ihh-stat__icon-wrap">
                  <img src={ShareIcon} alt="" className="ihh-stat__icon" />
                </div>
                <div className="ihh-stat__text">
                  <span className="ihh-stat__value">14+</span>
                  <span className="ihh-stat__label">Partner Schools</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default InnovationHubHero;
