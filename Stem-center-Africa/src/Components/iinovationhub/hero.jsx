import '../../Styles/Hero.css';
import HubPhoto from '../../assets/Elias.jpeg';
import CycleIcon from '../../assets/cycle.png';
import SignalIcon from '../../assets/signal.png';

const InnovationHubHero = () => {
  return (
    <section className="ihh-hero" aria-label="Innovation Hub hero">

      {/* ── Background photo with overlay ── */}
      <div className="ihh-hero__bg-photo" aria-hidden="true">
        <img src={HubPhoto} alt="" className="ihh-hero__photo" />
      </div>
      <div className="ihh-hero__overlay" aria-hidden="true" />

      {/* ── Main content ── */}
      <div className="container ihh-hero__content">

        {/* Breadcrumb */}
        <nav className="ihh-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="ihh-breadcrumb__sep">/</span>
          <span className="ihh-breadcrumb__current">Innovation Hub</span>
        </nav>

        <div className="row">
          <div className="col-lg-8">

            {/* Headline */}
            <h1 className="ihh-hero__headline">
              Where Ideas Become <em>Innovations</em>
            </h1>

            {/* Subheadline */}
            <p className="ihh-hero__sub">
              Bridging the gap between conceptual science and real-world
              application through avant-garde technology and creative intellect.
            </p>



            {/* Quick stats */}
            <div className="ihh-stats">
              <div className="ihh-stat">
                <div className="ihh-stat__value-wrapper">
                  <img src={CycleIcon} alt="Active innovations" className="ihh-stat__icon" />
                  <span className="ihh-stat__value">2</span>
                </div>
                <span className="ihh-stat__label">Active Innovations</span>
              </div>
              <div className="ihh-stat">
                <div className="ihh-stat__value-wrapper">
                  <img src={SignalIcon} alt="Capability areas" className="ihh-stat__icon" />
                  <span className="ihh-stat__value">6</span>
                </div>
                <span className="ihh-stat__label">Capability Areas</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};

export default InnovationHubHero;