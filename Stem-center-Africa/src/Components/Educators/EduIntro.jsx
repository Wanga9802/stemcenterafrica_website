import { Link } from 'react-router-dom';
import '../../Styles/EduIntro.css';

// Swap these for your real photos — keep the same variable names.
import professionalDevImg from '../../assets/edu1.jpeg';
import teachingResourcesImg from '../../assets/edu4.jpeg';
import educatorCommunityImg from '../../assets/edu2.jpeg';
import recognitionImg from '../../assets/edu3.jpeg';

const PROGRAM_CARDS = [
  {
    id: 1,
    title: 'Professional Development',
    description:
      'Workshops and training to strengthen STEM pedagogy and content knowledge.',
    icon: 'bi-mortarboard-fill',
    color: '#7C3AED',
    image: professionalDevImg,
    linkLabel: 'Learn More',
    linkTo: '#',
  },
  {
    id: 2,
    title: 'Teaching Resources',
    description:
      'Access lesson plans, activities, and open educational resources aligned to your context.',
    icon: 'bi-briefcase-fill',
    color: '#4CAF50',
    image: teachingResourcesImg,
    linkLabel: 'Explore Resources',
    linkTo: '#',
  },
  {
    id: 3,
    title: 'Educator Community',
    description:
      'Connect, share, and collaborate with fellow educators across Kenya and beyond.',
    icon: 'bi-people-fill',
    color: '#F5820D',
    image: educatorCommunityImg,
    linkLabel: 'Join Community',
    linkTo: '#',
  },
  {
    id: 4,
    title: 'Recognition & Growth',
    description:
      'Celebrate your impact and grow your career as a STEM leader.',
    icon: 'bi-clipboard-check-fill',
    color: '#2F80ED',
    image: recognitionImg,
    linkLabel: 'Learn More',
    linkTo: '#',
  },
];

const BENEFITS = [
  'Build skills and confidence',
  'Access practical tools and resources',
  'Get mentorship and peer support',
  'Stay updated on opportunities',
  'Make a lasting impact in your classroom and community',
];

const EduIntro = () => {
  return (
    <section className="ei-section">
      <div className="container">

        {/* ── Heading ── */}
        <div className="ei-heading">
          <h2 className="ei-heading__title">
            Our <span className="ei-heading__highlight">STEM Educator</span> Programs
          </h2>
          <p className="ei-heading__sub">
            Practical training and continuous support for impactful STEM teaching.
          </p>
        </div>

        <div className="row ei-row">

          {/* ── Left: Program cards ── */}
          <div className="col-lg-8">
            <div className="row ei-cards-row">
              {PROGRAM_CARDS.map((card) => (
                <div className="col-md-3 col-sm-6 col-12" key={card.id}>
                  <div className="ei-card shadow-lg">
                    <span
                      className="ei-card__icon"
                      style={{ background: card.color }}
                    >
                      <i className={`bi ${card.icon}`}></i>
                    </span>

                    <h3 className="ei-card__title">{card.title}</h3>
                    <p className="ei-card__desc">{card.description}</p>

                    <div className="ei-card__photo">
                      <img src={card.image} alt={card.title} />
                    </div>

                    <Link
                      to={card.linkTo}
                      className="ei-card__link"
                      style={{ color: card.color }}
                    >
                      {card.linkLabel}
                      <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Benefits card ── */}
          <div className="col-lg-4">
            <div className="ei-benefits">
              <h3 className="ei-benefits__title">
                Why Join Our STEM Educator Network?
              </h3>

              <ul className="ei-benefits__list">
                {BENEFITS.map((benefit, i) => (
                  <li className="ei-benefits__item" key={i}>
                    <i className="bi bi-check-circle-fill ei-benefits__check"></i>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="ei-benefits__divider"></div>


            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EduIntro;
