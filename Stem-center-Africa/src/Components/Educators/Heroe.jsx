import '../../Styles/Heroe.css';
import HeroPhoto from '../../assets/problem.jpg';

const EducatorsHero = () => {
  return (
    <section className="ph-hero" aria-label="STEM Educators hero">

      {/* ── Background photo with overlay + dot texture (same as ProgramHero) ── */}
      <div className="ph-hero__bg-photo" aria-hidden="true">
        <img src={HeroPhoto} alt="" className="ph-hero__photo" />
      </div>
      <div className="ph-hero__overlay" aria-hidden="true" />
      <div className="ph-hero__dots" aria-hidden="true" />

      {/* ── Main content ── */}
      <div className="container ph-hero__content">

        <div className="row">
          <div className="col-lg-12">

            {/* Breadcrumb */}
            <nav className="ph-breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span className="ph-breadcrumb__sep">&gt;</span>
              <span className="ph-breadcrumb__current">STEM Educators</span>
            </nav>

            {/* Title */}
            <h1 className="ph-hero__title">
              Empowering Educators. Inspiring <em>Innovators</em>
            </h1>

            {/* Description */}
            <p className="ph-hero__sub">
              We equip teachers with the skills, tools, and confidence to
              deliver engaging hands-on STEM learning that prepares young
              people for the future.
            </p>

            {/* CTAs */}
            <div className="ph-cta-row">
              <a href="/partner-with-us" className="ph-cta ph-cta--solid">
                Become Educator partner
                <i className="bi bi-arrow-right ph-cta__icon"></i>
              </a>
              <a href="/educator-application" className="ph-cta ph-cta--ghost">
                <i className="bi bi-download ph-cta__icon ph-cta__icon--leading"></i>
                Apply for next cohort
              </a>
            </div>

          </div>
        </div>

      </div>

      {/* ── Bottom wave cutout (same as ProgramHero) ── */}
      <svg
        className="ph-hero__wave"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Accent line — sits behind/above the main wave, thin gradient stroke */}
        <path
          d="M0,30 C240,75 480,-10 720,10 C960,30 1200,75 1440,25"
          fill="none"
          stroke="url(#waveAccentGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Main wave — solid white cutout */}
        <path
          d="M0,50 C240,100 480,10 720,30 C960,50 1200,100 1440,50 L1440,100 L0,100 Z"
          fill="#ffffff"
        />
        <defs>
          <linearGradient id="waveAccentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E91E8C" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
      </svg>

    </section>
  );
};

export default EducatorsHero;
