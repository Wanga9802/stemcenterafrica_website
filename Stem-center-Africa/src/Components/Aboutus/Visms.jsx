import React from 'react';
import '../../Styles/Vismis.css';
import compliance from '../../assets/compliance.png';
import partners from '../../assets/partners.png';
import reputation from '../../assets/reputation.png';
import verified from '../../assets/verified.png';

const icons = [partners, compliance, reputation, verified];

function Us() {
  const info = [
    {
      title: "Our Vision",
      subtitle: "A world in which anyone can create their future",
      description: "Our vision is to empower Africans with the skills and opportunities to shape the future they envision for themselves."
    },
    {
      title: "Our Mission",
      subtitle: "To promote STEM education through innovation",
      description: "To inspire the next generation of mathematicians, scientists, and engineers and excite learners of all ages about the power and beauty of STEM education. We aim to promote creative and critical thinkers and problem-solvers who we believe will help spur the economic growth of not only African countries but the world at large."
    }
  ];

  const values = [
    { description: "Collaboration" },
    { description: "Accountability" },
    { description: "Excellence" },
    { description: "Integrity" }
  ];

  return (
    <section className="visms-section">
      <div className="container visms-container">

        {/* ── Vision & Mission row ── */}
        <div className="row visms-top-row">
          {info.map((item, index) => (
            <div key={index} className="col-12 col-md-6 visms-info-col">
              <h3 className="visms-title mb-3">{item.title}</h3>
              <p className="visms-subtitle mb-3">{item.subtitle}</p>
              <p className="visms-desc">{item.description}</p>
            </div>
          ))}
        </div>

        {/* ── Core Values row ── */}
        <div className="row visms-values-header-row">
          <div className="col-12 text-center">
            <h3 className="visms-values-heading">Our Core Values</h3>
          </div>
        </div>

        <div className="row visms-cards-row">
          {values.map((item, index) => (
            <div key={index} className="col-6 col-lg-3 visms-card-col">
              <div className="visms-card">
                <div className="visms-card-icon">
                  <img src={icons[index]} alt={`${item.description} icon`} className="value-icon-img" />
                </div>
                <p className="visms-card-label">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Us;
