import '../../Styles/projects.css';
import roboticsProjectImage from '../../assets/choo.png';
import droneProjectImage from '../../assets/sasti.png';
import scienceProjectImage from '../../assets/yaye.png';
import threeDProjectImage from '../../assets/solaf.png';

const featuredProjects = [
  {
    id: 'robotics',
    image: roboticsProjectImage,
    tag: 'smart toilet',
    description: 'A hands-free toilet system that pairs an ultrasonic distance sensor with a microcontroller to detect when a user approaches, then automatically triggers the dispensing mechanism ',
    href: '/programs/arduino#projects',
  },
  {
    id: 'drone',
    image: threeDProjectImage,
    tag: 'SolarBotAfrica',
    description: 'This time, we challenged our students to build our own robot, a project we call SolarBot Africa. Working together with our team, the students used Tinkercad to 3D-design the body',
    href: '/programs/3d-designing#projects',
  },
  {
    id: 'science',
    image: scienceProjectImage,
    tag: 'Gemla-AI agent',
    description: 'An AI innovation initiative building an intelligent multimodal learning analytics system. GEMLA-Agent explores how',
    href: '/innovationhub#gemla-agent',
  },
  {
    id: 'three-d-design',
    image: droneProjectImage,
    tag: 'Sustainable Home',
    description: 'These young students imagined what a sustainable home could look like and brought their ideas to life through a model. From imagination to creation,',
    href: '/programs/diy#projects',
  },
];

export default function ProjectsShowcase() {
  return (
    <section className="pj-section">
      <div className="container">

        {/* ── Header Row ── */}
        <div className="row align-items-end pj-header">
          <div className="col-md-8">
            <span className="pj-eyebrow">Student Projects</span>
            <h2 className="pj-heading">Young Innovators. Big Ideas.</h2>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <a href="/programs" className="pj-view-more-btn">
              Explore Our Programs
            </a>
          </div>
        </div>

        {/* ── Cards Row ── */}
        <div className="row g-4 pj-cards-row">
          {featuredProjects.map((project) => (
            <div className="col-md-3" key={project.id}>
              <div className="pj-card shadow-lg">
                <div className="pj-card__image-wrap">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="pj-card__image"
                  />
                </div>
                <div className="pj-card__body">
                  <span className="pj-card__tag">{project.tag}</span>
                  <h3 className="pj-card__title">{project.title}</h3>
                  <p className="pj-card__desc">{project.description}</p>
                  <a href={project.href} className="pj-card__link">
                    view project
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
