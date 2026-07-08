
// STEMCenter Africa — Hero Section
// Stack: React + Bootstrap 5

import '../../Styles/Herosection.css';
import Logopic from '../../assets/stemlogo_3.jpg';


// ─── Component ─────────────────────────────────────────

const HeroSection = () => {

 

  return (
    
    
    <section className="sc-hero" aria-label="Hero section">

      

      {/* ── Background layers ── */}
      <div className="sc-hero__bg" aria-hidden="true" />
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
             Building a future where every African child has access to World-class STEM
             education, mentorship and opportunities to solve tommorow's challenges.
            </p>

            {/* ── CTA Buttons ── */}
            {/*
              COLOR RATIONALE:
              • Primary (Amber/Gold) — Maximum contrast on dark green background.
                Warm gold pops against cool dark tones, signals ihmportance.
              • Secondary (White outline) — Neutral, non-competing.
                Provides choice without fighting for attention.
            */}
            <div className="sc-cta-group sc-anim sc-anim--delay-4 mb-2">
              <a href="#programs" className="sc-btn-primary">
                Explore Our Programs
                <span className="sc-btn-icon">→</span>
              </a>
              <a href="#donate" className="sc-btn-secondary">
                 Donate Now
                <span className="sc-btn-icon">→</span>
              </a>
            </div>

            {/* ── Trust Indicators ── */}
         

            
            <div className="row d-flex flex-row mt-0 g-2 setu-setu">
               <div className="col-4 card bg-transparent toto-toto">
                  <div className="row d-flex flex-row">
                     <div className="col-4 text-center">
                      <i className="bi bi-person-circle sc-trust__icon"></i>
                     </div>
                     <div className="col-8 d-flex flex-column">
                        <p className="sc-trust__text strong mb-0">18712+</p>
                        <span className="sc-trust__text mt-0">students</span>
                     </div>
                  </div>
               </div>
                <div className="col-4 card bg-transparent toto-toto">
                  <div className="row d-flex flex-row">
                     <div className="col-4 text-center">
                        <i className="bi bi-p-circle-fill sc-trust__icon"></i>
                     </div>
                     <div className="col-8 d-flex flex-column">
                       <p className="sc-trust__text strong mb-0">15+</p>
                        <span className="sc-trust__text mt-0">programs</span>
                     </div>
                  </div>
               </div>
               <div className="col-4 card bg-transparent toto-toto">
                  <div className="row d-flex flex-row">
                     <div className="col-4 text-center">
                       <i className="bi bi-universal-access-circle sc-trust__icon"></i>
                     </div>
                     <div className="col-8 d-flex flex-column">
                           <p className="sc-trust__text strong mb-0">10+</p>
                           <span className="sc-trust__text mt-0">partners</span>
                     </div>
                  </div>
               </div>
               

               

            </div>

          </div>


          {/* ── RIGHT: Illustration Column ── */}
          <div className="col-md-5"> 
            <div className="sc-hero__visual sc-anim sc-anim--right">

              {/* Glow rings */}
              <div className="sc-visual__ring" aria-hidden="true" />
              <div className="sc-visual__ring sc-visual__ring--2" aria-hidden="true" />
               <div className="sc-visual__ring sc-visual__ring--3" aria-hidden="true" />

              {/* Main image */}
              <img src={Logopic} alt="STEM Education Illustration" className='sc-hero__img' />
             
            </div>
          </div>

        </div>
      </div>

    

    </section>
  );
};

export default HeroSection;