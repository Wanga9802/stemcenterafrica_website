import '../../Styles/Herosection.css';
import HeroPhoto from '../../assets/storyour.jpg'; 
import { Link } from 'react-router-dom';

const HeroSection = () => {

  return (

    <section className="sc-hero" aria-label="Hero section">

      {/* ── Background layers ── */}
      <div className="sc-hero__bg" aria-hidden="true" />

      {/* ── Full-bleed photo (spans entire section) ── */}
      <div className="sc-hero__photo-panel sc-anim sc-anim--right">
        <img
          src={HeroPhoto}
          alt="Students engaged in hands-on STEM learning"
          className="sc-hero__photo"
        />
      </div>
      <div className="sc-hero__photo-overlay" aria-hidden="true" />

      <div className="sc-hero__grid" aria-hidden="true" />
      <div className="sc-hero__orb sc-hero__orb--1" aria-hidden="true" />
      <div className="sc-hero__orb sc-hero__orb--2" aria-hidden="true" />
      <div className="sc-hero__orb sc-hero__orb--3" aria-hidden="true" />

      {/* ── Main content ── */}
      <div className="container sc-hero__content">
        <div className="row align-items-center g-3">

          {/* ── LEFT: Text Column ── */}
          <div className="col-md-7 p-1">

            {/* Eyebrow badge */}
            <div className="sc-badge sc-anim sc-anim--delay-1">
              <span className="sc-badge__dot" />
              Promoting STEM Education in Africa & Beyond
            </div>

            {/* Headline */}
            <h1 className="sc-hero__headline sc-anim sc-anim--delay-2">
               Empowering The Next{' '}
              <em>Generation of Innovaters</em>
            </h1>

            {/* Subheadline */}
            <p className="sc-hero__sub sc-anim sc-anim--delay-3">
STEM Center Africa equips young people across Kenya with hands-on skills in robotics, coding, AI, engineering, mathematics, 
electronics, and design thinking through innovation centers, mobile outreach, and school partnerships.
            </p>

            {/* ── CTA Buttons ── */}
            <div className="sc-cta-group sc-anim sc-anim--delay-4 mb-2">
              <a href="/donate" className="sc-btn-primary">
                Donate Today
              </a>
              <Link to="/partner-with-us" className="sc-btn-secondary">
                Partner with us
              </Link>
            </div>



          </div>

        </div>
      </div>

    </section>
  );
};

export default HeroSection;
