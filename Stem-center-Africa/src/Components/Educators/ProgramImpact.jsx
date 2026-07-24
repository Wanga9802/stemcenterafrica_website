import {
  CheckCircle2, Award, Sparkles, Cpu, Network, ArrowRight,} from 'lucide-react';
import '../../Styles/ProgramImpact.css';

const assessments = [
  'Teacher self-assessment and reflection journals',
  'Peer observation and feedback sessions',
  'Pre/post-program surveys on confidence and pedagogical skills',
  'Evaluation of classroom implementation projects',
  'Certification upon successful completion',
];

const outcomes = [
  { stat: '01', text: 'Teachers capable of facilitating engaging, CBC-aligned STEM learning experiences' },
  { stat: '02', text: 'Increased integration of coding and digital tools in classrooms' },
  { stat: '03', text: 'A sustainable network of SCA-trained STEM educators across counties' },
  { stat: '04', text: 'Improved student outcomes in creativity, problem-solving, and collaboration' },
];

const resources = ['Scratch', 'micro:bit', 'Tinkercad', 'Arduino', 'Low-cost maker kits', 'MakerQuest platform'];

export default function ProgramImpact() {
  return (
    <section className="pi" id="impact">
      <div className="pi__top">
        <div className="pi__assessment">
          <span className="pi__eyebrow">Assessment &amp; Certification</span>
          <h2 className="pi__title">How progress is measured</h2>
          <ul className="pi__checklist">
            {assessments.map((item) => (
              <li key={item}>
                <CheckCircle2 size={16} strokeWidth={2} className="pi__check-icon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="pi__cert-badge">
            <Award size={20} strokeWidth={1.75} />
            <span>Certificate awarded on successful completion</span>
          </div>
        </div>

        <div className="pi__outcomes">
          <span className="pi__eyebrow">Expected Outcomes</span>
          <h2 className="pi__title">What changes, program-wide</h2>
          <div className="pi__outcome-grid">
            {outcomes.map(({ stat, text }) => (
              <div className="pi__outcome-card" key={stat}>
                <span className="pi__outcome-stat">{stat}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pi__resources">
        <span className="pi__resources-label">
          <Cpu size={16} strokeWidth={1.75} /> Built with
        </span>
        <ul className="pi__resource-list">
          {resources.map((r) => <li key={r}>{r}</li>)}
        </ul>
      </div>


      <div className="pi__cta">
        <Sparkles size={22} strokeWidth={1.75} className="pi__cta-icon" />
        <div className="pi__cta-copy">
          <h3>Ready to bring this into your classroom?</h3>
          <p>Applications for the next cohort are open to teachers, curriculum officers, and club facilitators.</p>
        </div>
        <button className="pi__cta-btn">
          Apply for the next cohort <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
