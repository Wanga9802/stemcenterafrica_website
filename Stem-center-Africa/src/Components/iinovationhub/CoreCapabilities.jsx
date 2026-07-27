import { useEffect, useState } from 'react';
import '../../Styles/CoreCapabilities.css';
import HubPhoto from '../../assets/inov.jpeg';

const capabilities = [
  {
    icon: 'bi-cpu',
    title: 'AI & Machine Learning',
    description: 'Designing, prototyping, and evaluating responsible AI systems.',
    items: [
      'AI solution design and prototyping',
      'AI data collection and preparation',
      'Multimodal AI systems',
      'AI model evaluation',
      'Human-in-the-loop AI workflows',
      'Responsible AI implementation',
    ],
  },
  {
    icon: 'bi-bar-chart-line',
    title: 'Data Engineering & Analytics',
    description: 'Turning raw, human-centered data into clear impact insights.',
    items: [
      'Data collection and structuring',
      'Data cleaning and preparation',
      'Dataset creation and enrichment',
      'Data annotation workflows',
      'Analytics pipelines',
      'Impact measurement systems',
      'Data-driven decision support',
    ],
  },
  {
    icon: 'bi-code-slash',
    title: 'Software Development',
    description: 'Building web and cloud applications for real-world scale.',
    items: [
      'Web application development',
      'Backend systems and databases',
      'Cloud-based applications',
      'Workflow automation',
      'Digital platforms',
      'Data dashboards',
      'API-driven solutions',
    ],
  },
  {
    icon: 'bi-cloud-check',
    title: 'Enterprise AI & Cloud',
    description: 'Combining AI, cloud, and data into deployable solutions.',
    items: [
      'AI models',
      'Cloud infrastructure',
      'Data systems',
      'User interfaces',
      'Automation workflows',
    ],
  },
];

const CoreCapabilities = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const isModalOpen = activeIndex !== null;
  const activeItem = isModalOpen ? capabilities[activeIndex] : null;

  const closeModal = () => setActiveIndex(null);

  // Lock body scroll + allow ESC to close while modal is open
  useEffect(() => {
    if (!isModalOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <section className="cc-section" aria-label="Core capabilities">
      <div className="container">

        <div className="row align-items-stretch cc-message-row">
<div className="col-lg-7">
  <div className="cc-message cc-anim">
    <p className="cc-message__text">
      At our SCA STEM IHub, we are driven by a bold vision to spark ideas and develop groundbreaking products that have the power to change the world. We cultivate a dynamic environment where thinkers, makers, and problem-solvers come together to experiment, collaborate, and turn bold concepts into real-world impact. Through hands-on design, mentorship, and cutting-edge tools, we empower innovators—especially youth and early-stage entrepreneurs—to explore challenges in education, health, technology, and sustainability, and to reimagine solutions that are not only functional but transformative. At SCA STEM-Hub, innovation isn't just an outcome—it's our way of thinking, creating, and shaping the future.
    </p>
  </div>
</div>

          <div className="col-lg-5">
            <div className="cc-message-image cc-anim">
              <img src={HubPhoto} alt="SCA STEM Hub innovation" />
            </div>
          </div>
        </div>

        {/* ── Header ── */}
        <div className="cc-header cc-anim">
          <h2 className="cc-header__title">
            Core <em>Capabilities</em>
          </h2>
        </div>

        {/* ── Capability cards ── */}
        <div className="row g-4">
          {capabilities.map((item, index) => (
            <div className="col-md-3 col-sm-6 col-12" key={item.title}>
              <div className={`cc-card shadow-lg cc-anim cc-anim--delay-${index + 1}`}>
                <h3 className="cc-card__title">{item.title}</h3>
                <p className="cc-card__desc">{item.description}</p>

                <button
                  type="button"
                  className="cc-card__toggle"
                  onClick={() => setActiveIndex(index)}
                >
                  View Capabilities
                  
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Modal ── */}
      {isModalOpen && (
        <div
          className="cc-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.title} capabilities`}
          onClick={closeModal}
        >
          <div className="cc-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="cc-modal__close"
              onClick={closeModal}
              aria-label="Close"
            >
              <i className="bi bi-x-lg" />
            </button>

            <h3 className="cc-modal__title">{activeItem.title}</h3>
            <p className="cc-modal__desc">{activeItem.description}</p>

            <ul className="cc-modal__list">
              {activeItem.items.map((point) => (
                <li key={point}>
                  <i className="bi bi-check2-circle" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default CoreCapabilities;
