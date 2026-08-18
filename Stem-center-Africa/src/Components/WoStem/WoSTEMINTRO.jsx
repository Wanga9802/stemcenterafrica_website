import '../../Styles/WoSTEMINTRO.css';

// Default pillar data — pass `pillars` prop to override/reorder.
// `variant` alternates the icon circle color (pink / purple) to match design.
const DEFAULT_PILLARS = [
  {
    icon: 'bi-lightbulb-fill',
    variant: 'pink',
    title: 'Inspire',
    text: 'Spark curiosity and a love for STEM',
  },
  {
    icon: 'bi-cpu-fill',
    variant: 'purple',
    title: 'Equip',
    text: 'Provide practical skills and tools',
  },
  {
    icon: 'bi-people-fill',
    variant: 'pink',
    title: 'Empower',
    text: 'Build confidence, leadership & voice',
  },
  {
    icon: 'bi-award-fill',
    variant: 'purple',
    title: 'Lead',
    text: 'Support girls to become innovators',
  },
];

const WoStemIntro = ({
  eyebrowLeft = 'ABOUT Girls in STEM',
  titleLead = 'Creating a Future',
  titleTail = 'Where',
  titleHighlight = 'Girls Thrive',
  titleEnd = 'in STEM',
  description = 'Girls in STEM provides hands-on learning, mentorship, and leadership opportunities that break barriers and build a pipeline of confident, innovation-driven girls ready to solve real-world challenges.',
  pillars = DEFAULT_PILLARS,
  eyebrowRight = 'SEE Girls in STEM IN ACTION',
  watchTitle = 'Watch. Be Inspired.',
  watchDescription = 'See how we are transforming lives and building a strong community of girls in STEM.',
  videoId,
  videoCaption = 'WO STEM Impact Video',
}) => {
  return (
    <section className="wsi-section">
      <div className="container">
        <div className="row wsi-row">

          {/* ── Left column ── */}
          <div className="col-lg-6 wsi-col">

            <div className="row">
              <div className="col-12 d-flex flex-column wsi-header-row">
                <span className="wsi-eyebrow">{eyebrowLeft}</span>
                <h3 className="wsi-title">
                  {titleLead}
                  <br />
                  {titleTail} <span className="wsi-title-accent">{titleHighlight}</span> {titleEnd}
                </h3>
                <p className="wsi-description">{description}</p>
              </div>
            </div>

            <div className="row wsi-pillars-row">
              {pillars.map(({ icon, variant, title, text }) => (
                <div className="col-md-3 wsi-pillar" key={title}>
                  <span className={`wsi-pillar__icon wsi-pillar__icon--${variant}`}>
                    <i className={`bi ${icon}`} aria-hidden="true"></i>
                  </span>
                  <h4 className="wsi-pillar__title">{title}</h4>
                  <p className="wsi-pillar__text">{text}</p>
                </div>
              ))}
            </div>

          </div>

          {/* ── Right column ── */}
          <div className="col-lg-6 wsi-col">

            <div className="row">
              <div className="col-12 d-flex flex-column wsi-header-row">
                <span className="wsi-eyebrow">{eyebrowRight}</span>
                <h3 className="wsi-title">{watchTitle}</h3>
              </div>
            </div>

            <div className="row wsi-video-row">
              <div className="col-12">
                <div className="wsi-video-card">
                  <div className="wsi-video-card__frame">
                    {videoId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={videoCaption}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <div className="wsi-video-card__placeholder">
                        <i className="bi bi-play-circle-fill"></i>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WoStemIntro;
