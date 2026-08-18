import '../../Styles/WoStemPrograms.css';

// Swap these image imports for your own WoSTEM photos —
// keeping the same variable names below is enough.
import codingImg from '../../assets/wostemei.JPG';
import roboticsImg from '../../assets/wostemo.JPG';
import scienceImg from '../../assets/evidence/science/scie7.jpg';
import designImg from '../../assets/evidence/diy/d9.jpg';

const WOSTEM_PROGRAMS = [
  {
    id: 1,
    title: 'Coding & Programming',
    description: 'Python, Scratch, Web Development',
    icon: 'bi-code-slash',
    color: '#7C3AED',
    image: codingImg,
  },
  {
    id: 2,
    title: 'Robotics & Electronics',
    description: 'Hands-on robotics, Arduino, IoT',
    icon: 'bi-cpu-fill',
    color: '#7C3AED',
    image: roboticsImg,
  },
  {
    id: 3,
    title: 'Science & Environment',
    description: 'STEM for sustainability & climate action',
    icon: 'bi-flower3',
    color: '#7C3AED',
    image: scienceImg,
  },
  {
    id: 4,
    title: 'Design & Innovation',
    description: '3D design, prototyping, problem solving',
    icon: 'bi-lightbulb-fill',
    color: '#7C3AED',
    image: designImg,
  },
];

const WoStemPrograms = () => {
  return (
    <section className="wsp-section">
      <div className="container">
        <h2 className="wsp-title">Opportunities Designed for Girls</h2>

        <div className="row wsp-row">
          {WOSTEM_PROGRAMS.map((program) => (
            <div className="col-md-3 col-sm-6 col-12" key={program.id}>
              <div className="wsp-card">
                <div className="wsp-card__photo-wrap">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="wsp-card__photo"
                  />

                </div>

                <div className="wsp-card__body">
                  <h3 className="wsp-card__title">{program.title}</h3>
                  <p className="wsp-card__desc">{program.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WoStemPrograms;
