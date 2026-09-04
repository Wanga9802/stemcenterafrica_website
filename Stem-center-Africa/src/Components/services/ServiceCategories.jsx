// ServiceCategories.jsx
import '../../Styles/ServiceCategories.css';

import {
  FaLaptopCode, FaRobot, FaMagic, FaChartBar, FaCube, FaRocket,
  FaCalculator, FaSatelliteDish,
  FaChalkboardTeacher, FaBookOpen, FaSchool, FaUserGraduate,
  FaFlask, FaTools, FaCubes, FaBolt, FaDesktop,
  FaLightbulb, FaTrophy, FaWrench, FaSeedling,
  FaBus, FaFemale, FaGlobeAfrica, FaHandshake,
  FaMicroscope, FaClipboardCheck, FaChartPie, FaBullseye, FaFileAlt,
  FaBuilding, FaGlobe, FaLandmark, FaBriefcase, FaHandsHelping, FaCloud, FaPlane,
} from 'react-icons/fa';

const serviceCategories = [
  {
    number: '01',
    eyebrow: 'STEM Education',
    title: 'STEM learning for the next generation',
    description:
      'Hands-on, project-based experiences that build creativity, computational thinking, engineering and problem-solving.',
    services: [
      { icon: FaLaptopCode, title: 'Coding & Computer Science', desc: 'Scratch, Python, computational thinking, programming and digital literacy.' },
      { icon: FaRobot, title: 'Robotics & Engineering', desc: 'Robotics, Arduino, electronics, sensors, automation and engineering design.' },
      { icon: FaMagic, title: 'AI & Generative AI Education', desc: 'AI literacy, responsible AI, prompt engineering and hands-on AI projects.' },
      { icon: FaChartBar, title: 'Data Science & Analytics', desc: 'Data collection, analysis, visualization, statistics and introductory programming for data.' },
      { icon: FaCube, title: '3D Design & Digital Fabrication', desc: 'Tinkercad, SketchUp, prototyping, 3D printing and product design.' },
      { icon: FaRocket, title: 'Space STEM', desc: 'Space science, environmental sensing, astronautics and mission-inspired STEM projects.' },
      { icon: FaCalculator, title: 'Mathematics & Science Innovation', desc: 'Real-world mathematics and science investigations that connect concepts to authentic problems.' },
      { icon: FaSatelliteDish, title: 'IoT & Environmental Monitoring', desc: 'Sensor-based projects for temperature, humidity, soil moisture, air quality and environmental data.' },
      { icon: FaPlane, title: 'Drone Technology', desc: 'Drone technology, data collection, mapping and environmental monitoring projects.' },
    ],
  },
  {
    number: '02',
    eyebrow: 'Teacher & School Capacity',
    title: 'Transforming STEM teaching',
    description:
      'We equip educators and schools with the knowledge, tools and systems needed for meaningful STEM implementation.',
    services: [
      { icon: FaChalkboardTeacher, title: 'Teacher Professional Development', desc: 'Training in PBL, inquiry, maker-centered learning, coding, engineering design and digital tools.' },
      { icon: FaBookOpen, title: 'STEM Curriculum Design', desc: 'Contextualized curricula, project guides, assessments and classroom resources.' },
      { icon: FaSchool, title: 'School STEM Program Development', desc: 'End-to-end STEM program design, implementation, coaching and continuous improvement.' },
      { icon: FaUserGraduate, title: 'STEM Coaching & Mentorship', desc: 'Ongoing support for teachers, STEM club facilitators and school leadership teams.' },
    ],
  },
  {
    number: '03',
    eyebrow: 'STEM Labs & Technology',
    title: 'Building the spaces where innovation happens',
    description:
      'Design and implementation of practical technology environments for schools, communities and organizations.',
    services: [
      { icon: FaFlask, title: 'STEM Lab Setup', desc: 'Planning, equipment selection, installation, curriculum integration and launch support.' },
      { icon: FaTools, title: 'Makerspace Design', desc: 'Design and setup of collaborative spaces for making, prototyping and experimentation.' },
      { icon: FaCubes, title: '3D Printing & Fabrication Labs', desc: 'Digital fabrication workflows, training, prototyping and student design experiences.' },
      { icon: FaBolt, title: 'Electronics & IoT Labs', desc: 'Arduino, sensors, microcontrollers, electronics and connected-device learning environments.' },
      { icon: FaDesktop, title: 'Computer Lab Development', desc: 'Technology planning and digital learning environments for schools and community programs.' },
    ],
  },
  {
    number: '04',
    eyebrow: 'Innovation & Entrepreneurship',
    title: 'From ideas to prototypes to impact',
    description:
      'We create opportunities for young people and early-stage innovators to solve authentic challenges.',
    services: [
      { icon: FaLightbulb, title: 'Innovation Challenges', desc: 'SDG-focused competitions and design challenges that turn community problems into STEM projects.' },
      { icon: FaTrophy, title: 'Hackathons & STEM Competitions', desc: 'End-to-end design, facilitation, judging and showcase experiences.' },
      { icon: FaWrench, title: 'Prototyping & Product Development', desc: 'Ideation, design, fabrication, testing and iteration through the SCA STEM IHub.' },
      { icon: FaSeedling, title: 'Youth Innovation & Entrepreneurship', desc: 'Mentorship that helps young innovators move from ideas toward viable solutions and ventures.' },
    ],
  },
  {
    number: '05',
    eyebrow: 'Outreach & Inclusion',
    title: 'Taking STEM beyond the classroom',
    description:
      'Expanding access to hands-on STEM for learners and communities that are often underserved.',
    services: [
      { icon: FaBus, title: 'Mobile STEM Outreach', desc: 'Bring coding, robotics, electronics, design and science experiences directly to schools and communities.' },
      { icon: FaFemale, title: 'Girls in STEM', desc: 'Mentorship, STEM projects, competitions and leadership opportunities designed to increase girls\u2019 participation.' },
      { icon: FaGlobeAfrica, title: 'Underserved School Programs', desc: 'Flexible STEM experiences for schools with limited access to technology, labs and specialist instruction.' },
      { icon: FaHandshake, title: 'STEM Career Mentorship', desc: 'Connect learners with STEM professionals, researchers, engineers and entrepreneurs.' },
    ],
  },
  {
    number: '06',
    eyebrow: 'Research, Data & Impact',
    title: 'Evidence that drives better STEM programs',
    description:
      'Research and measurement services that help organizations understand what works and improve outcomes.',
    services: [
      { icon: FaMicroscope, title: 'STEM Research', desc: 'Research on STEM education, learning, pedagogy, technology integration and innovation.' },
      { icon: FaClipboardCheck, title: 'Program Evaluation', desc: 'Design and evaluation of STEM interventions, including qualitative and quantitative approaches.' },
      { icon: FaChartPie, title: 'Learning Analytics', desc: 'Use learner data to understand engagement, participation, skills and learning progress.' },
      { icon: FaBullseye, title: 'Impact Measurement', desc: 'Develop indicators, monitoring systems and evidence for funders, partners and programs.' },
      { icon: FaFileAlt, title: 'Educational Research Consulting', desc: 'Research design, data analysis, reporting and evidence-informed STEM program development.' },
    ],
  },
  {
    number: '07',
    eyebrow: 'Organizations & Partnerships',
    title: 'STEM solutions for organizations',
    description:
      'Strategic STEM services for institutions seeking measurable education, workforce and community impact.',
    services: [
      { icon: FaBuilding, title: 'STEM Education Consulting', desc: 'Strategic guidance for schools, NGOs, foundations, governments and education organizations.' },
      { icon: FaGlobe, title: 'NGO & Development Programs', desc: 'Co-design and implementation of STEM programs aligned with development and community priorities.' },
      { icon: FaLandmark, title: 'Government STEM Initiatives', desc: 'Support for scalable STEM education, teacher capacity and innovation initiatives.' },
      { icon: FaBriefcase, title: 'Corporate STEM & CSR Programs', desc: 'Design high-impact STEM education and workforce-readiness programs for corporate partners.' },
      { icon: FaHandsHelping, title: 'Strategic STEM Partnerships', desc: 'Build collaborative programs connecting schools, universities, companies, funders and communities.' },
      { icon: FaCloud, title: 'Educational Technology Implementation', desc: 'Support organizations in selecting and integrating digital learning, AI and technology platforms.' },
    ],
  },
];

const ServiceCategories = () => {
  return (
    <section className="svc-categories">
      <div className="container">
        {serviceCategories.map((category) => (
          <div className="svc-category" key={category.number}>

            {/* Category header */}
            <div className="row svc-category__head align-items-start">
              <div className="col-lg-6">
                <p className="svc-eyebrow">
                  {category.number} / {category.eyebrow.toUpperCase()}
                </p>
                <h2 className="svc-category__title">{category.title}</h2>
              </div>
              <div className="col-lg-6">
                <p className="svc-category__desc">{category.description}</p>
              </div>
            </div>

            {/* Service cards */}
            <div className="row gy-4 svc-category__grid">
              {category.services.map(({ icon: Icon, title, desc }) => (
                <div className="col-12 col-sm-6 col-md-4" key={title}>
                  <div className="svc-card">
                    <Icon className="svc-card__icon" aria-hidden="true" />
                    <h3 className="svc-card__title">{title}</h3>
                    <p className="svc-card__desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceCategories;