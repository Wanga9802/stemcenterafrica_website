import '../../Styles/ProgramOutline.css';

const ProgramOutline = ({ program }) => {
  if (!program) return null;

  const objectives = program.learningOutcomes || [];
  const outline = program.outline || [];
  const outlineDescription = program.outlineDescription || '';

  if (objectives.length === 0 && outline.length === 0) return null;

  return (
    <section className="pol-section" id="outline">
      <div className="container">
        <div className="row g-5">

          {/* ── Left: heading, intro, objectives ── */}
          <div className="col-lg-4">
            <div className="pol-header">
              <span className="pol-eyebrow">What You'll Learn</span>
              <h2 className="pol-heading">Program Outline</h2>
              {outlineDescription && (
                <p className="pol-intro">{outlineDescription}</p>
              )}
            </div>

            {objectives.length > 0 && (
              <ul className="pol-objectives">
                {objectives.map((item, index) => (
                  <li key={index} className="pol-objectives__item">
                    <i className="bi bi-check-circle-fill pol-objectives__icon"></i>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ── Right: horizontal timeline / roadmap ── */}
          {outline.length > 0 && (
            <div className="col-lg-8">
              <div className="pol-timeline">
                {outline.map((item, index) => (
                  <div className="pol-step" key={index}>
                    <div className="pol-step__row">
                      <div className="pol-step__node">
                        {item.icon ? (
                          <i className={`bi ${item.icon}`}></i>
                        ) : (
                          <span className="pol-step__node-number">{index + 1}</span>
                        )}
                      </div>
                      {index < outline.length - 1 && (
                        <span className="pol-step__connector" aria-hidden="true"></span>
                      )}
                    </div>

                    {item.label && (
                      <span className="pol-step__label">{item.label}</span>
                    )}
                    <h4 className="pol-step__title">{item.title}</h4>
                    {item.description && (
                      <p className="pol-step__desc">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default ProgramOutline;
