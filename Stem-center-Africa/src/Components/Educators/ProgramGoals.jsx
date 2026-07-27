import { useState } from 'react';
import { Target, Code2, Users, TrendingUp, GraduationCap, Building2 } from 'lucide-react';
import classroomTeachersImg from '../../assets/classroom-teachers.jpg';
import supportStaffImg from '../../assets/support-staff.jpg';
import '../../Styles/ProgramGoals.css';

const goals = [
  {
    icon: Target,
    title: 'Strengthen teaching capacity',
    text: 'Build teachers’ ability to implement CBC-aligned STEM teaching and learning approaches.',
  },
  {
    icon: Code2,
    title: 'Grow digital & computational thinking',
    text: 'Promote digital literacy, coding, and computational thinking in primary and secondary classrooms.',
  },
  {
    icon: Users,
    title: 'Build a teacher community',
    text: 'Foster a community of innovative STEM educators who share best practice and co-design local materials.',
  },
  {
    icon: TrendingUp,
    title: 'Lift student outcomes',
    text: 'Increase student engagement and performance in STEM through improved teacher practice.',
  },
];

const objectives = [
  'Demonstrate understanding of CBC learning outcomes and apply competency-based assessment in STEM contexts.',
  'Design and facilitate project-based and inquiry-based STEM lessons.',
  'Integrate Scratch coding and other maker tools (micro:bit, Arduino, low-cost materials) into classroom practice.',
  'Guide students in problem-solving using the engineering design process.',
  'Collaborate with peers to develop and share contextualized STEM teaching resources.',
];

const participants = [
  {
    icon: GraduationCap,
    image: classroomTeachersImg,
    title: 'Classroom teachers',
    text: 'Primary and secondary school teachers (Grades 4–12) teaching science, mathematics, and technology subjects.',
  },
  {
    icon: Building2,
    image: supportStaffImg,
    title: 'Support & facilitation staff',
    text: 'Curriculum support officers, teacher educators, and club facilitators interested in STEM integration.',
  },
];

export default function ProgramGoals() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="pg" id="goals">
      <div className="pg__header">
        <span className="pg__eyebrow">Program Goals &amp; Objectives</span>
      </div>

      <div className="pg__goals">
        {goals.map(({ icon: Icon, title, text }) => (
          <div className="pg__goal-card" key={title}>
            <Icon className="pg__goal-icon" size={22} strokeWidth={1.75} />
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>

      <div className="pg__lower">
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="pg__objectives">
              <h3 className="pg__lower-heading">By the end of the program, teachers can:</h3>
              <ul className="pg__obj-list">
                {objectives.map((item, i) => (
                  <li
                    key={item}
                    className={`pg__obj-item ${openIndex === i ? 'is-active' : ''}`}
                    onClick={() => setOpenIndex(i)}
                  >
                    <span className="pg__obj-index">{String(i + 1).padStart(2, '0')}</span>
                    <span className="pg__obj-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="pg__participants">
              <h3 className="pg__lower-heading">Who it's for</h3>
              {participants.map(({ icon: Icon, image, title, text }) => (
                <div className="pg__participant-card" key={title}>
                  <img src={image} alt={title} className="pg__participant-img" />
                  <div className="pg__participant-overlay">
                    <Icon size={20} strokeWidth={1.75} className="pg__participant-icon" />
                    <h4>{title}</h4>
                    <p className="pg__participant-text">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
