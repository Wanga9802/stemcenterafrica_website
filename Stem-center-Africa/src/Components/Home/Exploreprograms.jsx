import { useState, useEffect } from "react";
import '../../Styles/Explore.css';
import iosAppImage from '../../assets/iOS app development.jpg';
import roboticsImage from '../../assets/Robotics.jpg';
import arduinoImage from '../../assets/ARDUINO.jpg';
import computerImage from '../../assets/computers.jpg';
import pythonImage from '../../assets/python.jpg';
import scratchImage from '../../assets/scratch.jpg';

const programs = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    description:
      "Master web development with our comprehensive bootcamp and get career-ready. Learn HTML, CSS, JavaScript, and modern frameworks.",
    image: iosAppImage,
    icon: "☁️",
    accent: "#ff2d78",
  },
  {
    id: 2,
    title: "Robotics & Embedded Systems",
    description:
      "Build intelligent robots and embedded systems with hands-on projects using microcontrollers, sensors, and motor control.",
    image: roboticsImage,
    icon: "💻",
    accent: "#ff2d78",
  },
  {
    id: 3,
    title: "Arduino & IoT Development",
    description:
      "Learn to build interactive electronic projects with Arduino and explore the world of Internet of Things (IoT).",
    image: arduinoImage,
    icon: "�",
    accent: "#ff2d78",
  },
  {
    id: 4,
    title: "Introduction to Basic Computer Skills",
    description:
      "Build confidence with everyday software: master Word, Excel, PowerPoint, email, and basic digital navigation for school, office, and career success",
    image: computerImage,
    icon: "📊",
    accent: "#ff2d78",
  },
  {
    id: 5,
    title: "Python Programming Bootcamp",
    description:
      "A practical Python bootcamp for beginners: write clean code, automate workflows, and build real-world projects using Python’s most popular tools and frameworks.",
    image: pythonImage,
    icon: "🔐",
    accent: "#ff2d78",
  },
  {
    id: 6,
    title: "Scratch Programming for Kids",
    description:
      "Introduce young learners to programming concepts through fun, interactive projects. Develop problem-solving skills and creativity while building their own games and animations.",
    image: scratchImage,
    icon: "🎨",
    accent: "#ff2d78",
  },
];
 

 
const DEFAULT_CARDS_PER_PAGE = 3;
 
 export default function ExplorePrograms() {
   const [page, setPage] = useState(0);
   const [cardsPerPage, setCardsPerPage] = useState(DEFAULT_CARDS_PER_PAGE);
 
   useEffect(() => {
     const updateCardsPerPage = () => {
       setCardsPerPage(window.innerWidth <= 640 ? 1 : DEFAULT_CARDS_PER_PAGE);
     };
 
     updateCardsPerPage();
     window.addEventListener('resize', updateCardsPerPage);
     return () => window.removeEventListener('resize', updateCardsPerPage);
   }, []);
 
   const totalPages = Math.max(1, Math.ceil(programs.length / cardsPerPage));
   const visible = programs.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage);
 
   useEffect(() => {
     if (page >= totalPages) {
       setPage(totalPages - 1);
     }
   }, [page, totalPages]);
 
  return (
    <>
      <section className="ep-section">
        <div className="ep-container">
          {/* Header */}
          <div className="ep-header">
            <h2 className="ep-title">
              Explore Our <span>Programs</span>
            </h2>
            <p className="ep-subtitle">
              World-class bootcamps designed to equip African youth with the skills to thrive in the global tech economy.
            </p>
          </div>
 
          {/* Carousel with side arrows */}
          <div className="ep-carousel-outer">
            <button
              className="ep-nav-btn left"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              aria-label="Previous"
            >
              ‹
            </button>
 
            <div className="ep-grid">
              {visible.map((program) => (
                <div className="ep-card" key={program.id}>
                  <img
                    src={program.image}
                    alt={program.title}
                    className="ep-card-img"
                  />
                  <div className="ep-card-body">
                    <h3 className="ep-card-title">{program.title}</h3>
                    <p className="ep-card-desc">{program.description}</p>
                  </div>
                  <div className="ep-card-footer">
                    <a href="#" className="ep-learn-btn">Learn More </a>
                  </div>
                </div>
              ))}
            </div>
 
            <div className="ep-pagination-dots">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`ep-dot${index === page ? ' active' : ''}`}
                  onClick={() => setPage(index)}
                  aria-label={`Go to page ${index + 1}`}
                  type="button"
                />
              ))}
            </div>
 
            <button
              className="ep-nav-btn right"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              aria-label="Next"
            >
              ›
            </button>
          </div>
 
            {/* Ongoing Intakes */}
          <div className="ep-intakes">
            <p className="ep-intakes-label">Ongoing Intakes All Year Round</p>
            <a href="#map-section" className="ep-book-btn">Book a Call</a>
          </div>
        
        </div>
      </section>
    </>
  );
}