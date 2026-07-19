
import { useState } from "react";
import "./InnovationCard.css";


const ACCENT_BY_AREA = {
  "Robotics & Embedded Systems": "accent-teal",
  "AI & Machine Learning": "accent-pink",
  "Software Development & Automation": "accent-blue",
  "Research & Prototyping": "accent-blue",
  "3D Printing & Fabrication": "accent-purple",
  "School & Community Partnerships": "accent-teal",
};

const STATUS_LABEL = {
  active: "Active",
  ongoing: "Ongoing",
  completed: "Completed",
};

function InnovationCard({ innovation }) {
  const [expanded, setExpanded] = useState(false);
  const accentClass = ACCENT_BY_AREA[innovation.capability_area] || "accent-pink";

  const hasDetails =
    innovation.key_components?.length > 0 ||
    innovation.capabilities_demonstrated?.length > 0;

  return (
    <div className={`innovation-card ${accentClass}`}>
      <div className="innovation-card__media">
        <img src={innovation.cover_image_url} alt={innovation.title} loading="lazy" />
        <span className={`innovation-card__status innovation-card__status--${innovation.status}`}>
          {STATUS_LABEL[innovation.status] || innovation.status}
        </span>
      </div>

      <div className="innovation-card__body">
        <h3 className="innovation-card__title">{innovation.title}</h3>
        {innovation.subtitle && (
          <p className="innovation-card__subtitle">{innovation.subtitle}</p>
        )}
        <p className="innovation-card__description">{innovation.description}</p>

        {innovation.tags?.length > 0 && (
          <div className="innovation-card__tags">
            {innovation.tags.map((tag) => (
              <span key={tag} className="innovation-card__pill">
                {tag}
              </span>
            ))}
          </div>
        )}

        {hasDetails && (
          <div className="innovation-card__details">
            <button
              type="button"
              className="innovation-card__details-toggle"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
            >
              {expanded ? "Hide technical details" : "View technical details"}
              <span className={`innovation-card__chevron ${expanded ? "is-open" : ""}`} aria-hidden="true">
                ▾
              </span>
            </button>

            {expanded && (
              <div className="innovation-card__details-panel">
                {innovation.key_components?.length > 0 && (
                  <div className="innovation-card__details-group">
                    <h4>Key Components</h4>
                    <ul>
                      {innovation.key_components.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {innovation.capabilities_demonstrated?.length > 0 && (
                  <div className="innovation-card__details-group">
                    <h4>Capabilities Demonstrated</h4>
                    <ul>
                      {innovation.capabilities_demonstrated.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {innovation.timeline && (
          <div className="innovation-card__footer">
            <span className="innovation-card__timeline">{innovation.timeline}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default InnovationCard;
