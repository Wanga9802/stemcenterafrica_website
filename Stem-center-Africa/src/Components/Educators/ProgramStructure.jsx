import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import '../../Styles/ProgramStructure.css';

const phases = [
  {
    phase: 'Phase 1',
    title: 'Foundations of STEM & CBC Integration',
    duration: '2 days',
    description: 'Introduces CBC competencies and STEM integration principles.',
    activities: [
      'Workshop on CBC core competencies and 21st-century skills',
      'Introduction to project-based learning and inquiry-based instruction',
      'Case studies from Kenyan schools',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Coding & Computational Thinking',
    duration: '3 days',
    description: 'Focus on Scratch and integrating coding into lessons.',
    activities: [
      'Hands-on Scratch coding sessions',
      'Developing cross-curricular Scratch projects (math games, science simulations)',
      'Designing learner-centered coding tasks aligned with CBC learning outcomes',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Maker-Centered STEM Pedagogy',
    duration: '3 days',
    description: 'Promotes learning through design and making.',
    activities: [
      'Introduction to the Engineering Design Process',
      'Maker challenges using local, low-cost materials',
      'Integration of digital tools: micro:bit, Arduino, Tinkercad',
    ],
  },
  {
    phase: 'Phase 4',
    title: 'Lesson Design & Classroom Implementation',
    duration: '4–6 weeks',
    description: 'Application and peer learning.',
    activities: [
      'Teachers co-design and pilot STEM lessons',
      'Peer feedback and reflective practice sessions',
      'Classroom mentorship and virtual coaching',
    ],
  },
  {
    phase: 'Phase 5',
    title: 'Showcase & Community of Practice',
    duration: 'Ongoing',
    description: 'Reflection and sustainability.',
    activities: [
      'STEM Expo / Teacher Showcase',
      'Creation of the MakerQuest Educators Network',
      'Ongoing webinars, newsletters, and an online repository of STEM lessons',
    ],
  },
];

export default function ProgramStructure() {
  const [openPhase, setOpenPhase] = useState(0);

  return (
    <section className="ps" id="structure">
      <div className="ps__header">
        <span className="ps__eyebrow">Program Structure</span>
        <h2 className="ps__title">The build path: five phases, one classroom-ready teacher</h2>
      </div>

      <div className="ps__trace" role="list">
        {phases.map(({ phase, title, duration, description, activities }, i) => {
          const isOpen = openPhase === i;
          return (
            <div className="ps__node-wrap" key={phase} role="listitem">
              <button
                className={`ps__node ${isOpen ? 'is-open' : ''}`}
                onClick={() => setOpenPhase(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                <div className="ps__node-top">
                  <span className="ps__node-phase">{phase}</span>
                  <span className="ps__node-duration">{duration}</span>
                  <ChevronDown className={`ps__chevron ${isOpen ? 'is-open' : ''}`} size={16} />
                </div>
                <h3 className="ps__node-title">{title}</h3>
                <p className="ps__node-desc">{description}</p>

                {isOpen && (
                  <ul className="ps__activities">
                    {activities.map((a) => <li key={a}>{a}</li>)}
                  </ul>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
