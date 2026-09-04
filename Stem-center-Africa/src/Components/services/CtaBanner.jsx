import "../../Styles/CtaBanner.css";
import { Link } from "react-router-dom";

export default function CtaBanner() {
  return (
    <section className="cta">
      <div className="cta__inner">
        <span className="cta__eyebrow">Let's build together</span>

        <h2 className="cta__heading">
          Have a STEM challenge?
          <br />
          Let's turn it into an opportunity.
        </h2>

        <p className="cta__body">
          Partner with STEM Center Africa to design a program that develops
          skills, sparks innovation and creates measurable impact.
        </p>

        <Link className="cta__button" to="/conversation">
          Start a Conversation <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}

