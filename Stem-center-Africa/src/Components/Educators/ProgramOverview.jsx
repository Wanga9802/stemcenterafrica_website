import '../../Styles/ProgramOverviews.css';
import alonglilo from '../../assets/problem.jpg';

const cbcSkills = ['Creativity', 'Critical thinking', 'Collaboration', 'Communication'];

export default function ProgramOverviews() {
  return (
    <section className="ov" id="overview">
      <div className="ov__intro">
        <span className="ov__eyebrow">Program Overview</span>
        <p className="ov__lead">
          <strong>SCA STEM Educator</strong> is a professional development initiative
          that equips Kenyan teachers to run STEM lessons the CBC way: competency-based,
          inquiry-driven, and built around real projects — not just theory.
        </p>

        <blockquote className="ov__quote">
          “Nurturing learners who are engaged, empowered, and ethical citizens
          capable of solving real-world problems.”
        </blockquote>

        <ul className="ov__pills" aria-label="CBC core skills addressed">
          {cbcSkills.map((skill) => (
            <li key={skill} className="ov__pill">{skill}</li>
          ))}
        </ul>
      </div>


      <figure className="ov__media">
        <img
          src={alonglilo}
          alt="Two students wiring a microcontroller circuit during a STEM workshop"
        />
      </figure>


      <div className="ov__rationale">
        <div className="ov__rationale-col ov__rationale-col--challenge">
          <span className="ov__col-label">The challenge</span>
          <p>
            Kenya's CBC calls for creativity, critical thinking, collaboration,
            and communication in every classroom. But many teachers face limited
            access to training and resources for learner-centered, design-based
            teaching — leaving that vision hard to put into daily practice.
          </p>
        </div>
        <div className="ov__rationale-col ov__rationale-col--approach">
          <span className="ov__col-label">Our approach</span>
          <p>
            A blended, in-person and virtual professional development model
            centered on <strong>project-based learning</strong>,{' '}
            <strong>coding with Scratch</strong>, <strong>engineering design</strong>,
            and integrating STEM concepts into everyday classroom practice.
          </p>
        </div>
      </div>
    </section>
  );
}
