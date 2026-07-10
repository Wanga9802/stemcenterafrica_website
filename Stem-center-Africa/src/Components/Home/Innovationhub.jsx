import { Link } from 'react-router-dom'
import '../../Styles/InnovationHub.css';
import embeddedImg from '../../assets/embedded.png';
import aiImg from '../../assets/ai.png';
import codeImg from '../../assets/code.png';
import researchImg from '../../assets/research-study.png';
import printingImg from '../../assets/3d-printing.png';
import groupImg from '../../assets/group-chat.png';

const capabilities = [
  { id: 1, img: embeddedImg, label: "Robotics & Embedded Systems" },
  { id: 2, img: aiImg, label: "AI & Machine Learning Training" },
  { id: 3, img: codeImg, label: "Software & App Development" },
  { id: 4, img: researchImg, label: "Research & Prototyping" },
  { id: 5, img: printingImg, label: "3D Printing & Fabrication" },
  { id: 6, img: groupImg, label: "School & Community Partnerships" },
];

export default function InnovationHub() {
  return (
    <section className="ih-section">
      <div className="container">
        <div className="row align-items-center g-4">

          {/* ── LEFT: Text Column ── */}
          <div className="col-lg-5">
            <span className="ih-eyebrow">SCA Innovation Hub</span>
            <h2 className="ih-heading">
              Research. Develop.<br />Transform.
            </h2>
            <p className="ih-text">
              Our Innovation Hub drives research, develops AI solutions,
              builds prototypes, and partners with schools and communities
              to solve real-world challenges across Africa.
            </p>
            <Link to="/innovationhub" className="ih-btn">
              Learn More
            </Link>
          </div>

          {/* ── RIGHT: Capability Grid ── */}
          <div className="col-lg-7">
            <div className="ih-grid">
              {capabilities.map((item) => (
                <div className={`ih-card ih-card--c${item.id}`} key={item.id}>
                  <div className="ih-icon-badge">
                    <img src={item.img} alt="" className="ih-badge-img" />
                  </div>
                  <span className="ih-card__label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}