import { useState, useEffect, useRef } from "react";
import '../../Styles/Difference.css';
import iosAppImage from '../../assets/mitchi.jpg';
import roboticsImage from '../../assets/inclusive.jpg';
import arduinoImage from '../../assets/problem.jpg';
import computerImage from '../../assets/refresh.jpg';

const programs = [
  {
    id: 1,
    title: "Project based learning",
    description:
      "We dont just teach theory, we provide hands-on experience through project-based learning. Students work on real-world projects that enhance their understanding and skills.",
    image: iosAppImage,
    accent: "#ff2d78",
  },
  {
    id: 2,
    title: "Inclusive & Diverse community",
    description:
      "We foster an inclusive and diverse community where all students feel welcome and supported in their learning journey.",
    image: roboticsImage,
    accent: "#1B2A6B",
  },
  {
    id: 3,
    title: "Problem solving skills",
    description:
      "We take a problem solving approach to challenges to create solutions through STEM.",
    image: arduinoImage,
    accent: "#0F1A45",
  },
  {
    id: 4,
    title: "Refreshements and Digital Literacy",
    description:
      "We often provide refreshments and promote digital literacy, ensuring students have access to the necessary resources and knowledge to thrive in a technology-driven world.",
    image: computerImage,
    accent: "#7B8FC0",
  },
];

const DEFAULT_CARDS_PER_PAGE = 3;

export default function Difference() {
  // index = the starting card position in the rolling window (not a "page")
  const [index, setIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(DEFAULT_CARDS_PER_PAGE);
  const [direction, setDirection] = useState("next"); // drives slide animation direction
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const updateCardsPerPage = () => {
      setCardsPerPage(window.innerWidth <= 640 ? 1 : DEFAULT_CARDS_PER_PAGE);
    };
    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  const total = programs.length;

  // Build the visible window by wrapping around the array with modulo.
  // This is what makes it "seamless" -- there is always a full row of cards,
  // and once you go past the last one it just continues from the first again.
  const visible = Array.from({ length: Math.min(cardsPerPage, total) }, (_, i) => {
    const cardIndex = (index + i) % total;
    return programs[cardIndex];
  });

  const goNext = () => {
    setDirection("next");
    setAnimKey((k) => k + 1);
    setIndex((i) => (i + 1) % total);
  };

  const goPrev = () => {
    setDirection("prev");
    setAnimKey((k) => k + 1);
    setIndex((i) => (i - 1 + total) % total);
  };

  // Dots represent each possible starting position (one per card),
  // since the window can start anywhere and loops continuously.
  const goToIndex = (i) => {
    setDirection(i > index ? "next" : "prev");
    setAnimKey((k) => k + 1);
    setIndex(i % total);
  };

  return (
    <>
      <section className="ep-section">
        <div className="ep-container">
          <div className="ep-header">
            <h2 className="epi-title">What makes Us Different</h2>
          </div>

          <div className="ep-carousel-outer">
            <button
              className="ep-nav-btn left"
              onClick={goPrev}
              aria-label="Previous"
            >
              ‹
            </button>

            <div className="ep-carousel-viewport">
              <div className="epi-grid" key={animKey} data-direction={direction}>
                {visible.map((program, idx) => {
                  const color = program.accent || '#ff2d78';
                  return (
                    <div
                      className="epi-card shadow-lg"
                      key={`${program.id}-${index}-${idx}`}
                      style={{ borderLeft: `6px solid ${color}` }}
                    >
                      <img
                        src={program.image}
                        alt={program.title}
                        className="ep-card-img"
                      />
                      <div className="ep-card-body">
                        <h3 className="epi-card-title">{program.title}</h3>
                        <p className="ep-card-desc">{program.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="ep-pagination-dots">
              {programs.map((_, i) => (
                <button
                  key={i}
                  className={`ep-dot${i === index ? ' active' : ''}`}
                  onClick={() => goToIndex(i)}
                  aria-label={`Go to card ${i + 1}`}
                  type="button"
                />
              ))}
            </div>

            <button
              className="ep-nav-btn right"
              onClick={goNext}
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
      </section>
    </>
  );
}