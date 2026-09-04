// ServiceHero.jsx
import '../../Styles/Servvice.css';
import HeroPhoto from '../../assets/problem.jpg'; // swap to your actual asset

const ServiceHero = () => {
  return (
    <section className="ph-hero" aria-label="Services hero">

      {/* ── Background photo with overlay + dot texture ── */}
      <div className="ph-hero__bg-photo" aria-hidden="true">
        <img src={HeroPhoto} alt="" className="ph-hero__photo" />
      </div>
      <div className="ph-hero__overlay" aria-hidden="true" />
      <div className="ph-hero__dots" aria-hidden="true" />

      {/* ── Main content ── */}
      <div className="container ph-hero__content">
        <div className="row">
          <div className="col-lg-12">

            {/* Eyebrow */}
            <p className="ph-eyebrow">
              STEM Education <span className="ph-eyebrow__sep">•</span> Innovation{' '}
              <span className="ph-eyebrow__sep">•</span> Technology{' '}
              <span className="ph-eyebrow__sep">•</span> Impact
            </p>

            {/* Title */}
            <h1 className="ph-hero__title">
              Building STEM capacity. Creating innovators.
              Solving real-world problems.
            </h1>

            {/* Description */}
            <p className="ph-hero__sub">
              STEM Center Africa partners with schools, educators, governments,
              NGOs, companies and communities to design and deliver practical
              STEM learning, technology, innovation and capacity-building
              solutions.
            </p>

            {/* CTAs */}
            <div className="ph-cta-row">
              <a href="/conversation" className="ph-cta ph-cta--solid">
                Start  a Conversation
              </a>
<a href="/services/all" className="ph-cta ph-cta--ghost">
  Explore Our Services
</a>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom wave cutout ── */}
      <svg
        className="ph-hero__wave"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,30 C240,75 480,-10 720,10 C960,30 1200,75 1440,25"
          fill="none"
          stroke="url(#waveAccentGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
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

export default ServiceHero;