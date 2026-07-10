// src/components/innovation-hub/ActiveInnovations.jsx
import { getActiveInnovations } from "../../data/InnovationsData";
import InnovationCard from "./InnovationCard";
import "./ActiveInnovations.css";

function ActiveInnovations() {
  const active = getActiveInnovations();

  return (
    <section className="active-innovations">
      <div className="container">
        <div className="active-innovations__header">
          <span className="active-innovations__eyebrow">Active Innovations</span>
          <h2 className="active-innovations__title">Real projects, built by our team</h2>
          <p className="active-innovations__subtitle">
            Click into any project to see the problem it solves, how it works, and the impact so far.
          </p>
        </div>

        {active.length > 0 ? (
          <div className="active-innovations__grid">
            {active.map((innovation) => (
              <InnovationCard key={innovation.id} innovation={innovation} />
            ))}
          </div>
        ) : (
          <p className="active-innovations__empty">
            No active innovations right now — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}

export default ActiveInnovations;
