import '../../Styles/ProgramOverview.css';

const ProgramOverview = ({ program }) => {
  if (!program) return null;

  return (
    <section className="po-section">
      <div className="container">
        <div className="row g-5">

          {/* ── LEFT: Overview + Learning Outcomes ── */}
          <div className="col-lg-8">
            <span className="po-eyebrow">Overview</span>
            <h2 className="po-heading">About This Program</h2>
            <p className="po-desc">{program.fullDescription}</p>

            {program.learningOutcomes?.length > 0 && (
              <div className="po-outcomes">
                <h3 className="po-outcomes__title">What You'll Learn</h3>
                <ul className="po-outcomes__list">
                  {program.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="po-outcomes__item">
                      <i className="bi bi-check-circle-fill po-outcomes__icon"></i>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ── RIGHT: Quick Facts Sidebar ── */}
          <div className="col-lg-4">
            <div className="po-sidebar">
              <h3 className="po-sidebar__title">Program Details</h3>

              <div className="po-fact">
                <i className="bi bi-clock-fill po-fact__icon"></i>
                <div>
                  <span className="po-fact__label">Duration</span>
                  <span className="po-fact__value">{program.duration}</span>
                </div>
              </div>

              <div className="po-fact">
                <i className="bi bi-people-fill po-fact__icon"></i>
                <div>
                  <span className="po-fact__label">Age Group</span>
                  <span className="po-fact__value">{program.ageGroup}</span>
                </div>
              </div>

              <div className="po-fact">
                <i className="bi bi-bar-chart-fill po-fact__icon"></i>
                <div>
                  <span className="po-fact__label">Level</span>
                  <span className="po-fact__value">{program.level}</span>
                </div>
              </div>

              <div className="po-fact">
                <i className="bi bi-geo-alt-fill po-fact__icon"></i>
                <div>
                  <span className="po-fact__label">Format</span>
                  <span className="po-fact__value">{program.format}</span>
                </div>
              </div>

              <a href="#enroll" className="po-sidebar__btn">
                Enroll Now
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProgramOverview;