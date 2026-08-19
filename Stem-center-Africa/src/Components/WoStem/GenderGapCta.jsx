import { Link } from 'react-router-dom';
import '../../Styles/GenderGapCta.css';
import ketuko from '../../assets/handshake.png';

const GenderGapCta = () => {
  return (
    <section className="ggc-section">
      <div className="container">
        <div className="ggc-bar">
          <div className="ggc-bar__left">
            <img src={ketuko} alt="Handshake" className="ggc-icon" />
            <div>
              <h3 className="ggc-title">
                Together, We Can Close the Gender Gap in STEM
              </h3>
              <p className="ggc-subtitle">
                Join us in empowering more girls with the skills and
                opportunities they need to innovate, lead, and change the
                world.
              </p>
            </div>
          </div>

          <div className="ggc-bar__right">
            <Link to="/donate" className="ggc-btn">
              Donate Now
              <i className="bi bi-gift-fill ggc-btn__icon"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderGapCta;
