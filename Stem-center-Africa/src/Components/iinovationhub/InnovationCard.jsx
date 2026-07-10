// src/components/innovation-hub/InnovationCard.jsx
import { useNavigate } from "react-router-dom";
import "./InnovationCard.css";


// same idea as the left-border color coding on the Home teaser grid.
const ACCENT_BY_AREA = {
  "Robotics & Embedded Systems": "accent-teal",
  "AI & Machine Learning Training": "accent-pink",
  "Software & App Development": "accent-blue",
  "Research & Prototyping": "accent-blue",
  "3D Printing & Fabrication": "accent-purple",
  "School & Community Partnerships": "accent-teal",
};

function InnovationCard({ innovation }) {
  const navigate = useNavigate();
  const accentClass = ACCENT_BY_AREA[innovation.capability_area] || "accent-pink";

  const goToDetail = () => navigate(`/innovation-hub/${innovation.slug}`);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToDetail();
    }
  };

  return (
    <div
      className={`innovation-card ${accentClass}`}
      role="button"
      tabIndex={0}
      onClick={goToDetail}
      onKeyDown={handleKeyDown}
      aria-label={`View details for ${innovation.title}`}
    >
      <div className="innovation-card__media">
        <img src={innovation.cover_image_url} alt={innovation.title} loading="lazy" />
        <span className={`innovation-card__status innovation-card__status--${innovation.status}`}>
          {innovation.status === "active" ? "Active" : "Completed"}
        </span>
      </div>

      <div className="innovation-card__body">
        <span className="innovation-card__tag">{innovation.capability_area}</span>

        <h3 className="innovation-card__title">{innovation.title}</h3>
        <p className="innovation-card__description">{innovation.short_description}</p>

        {innovation.impact_metrics?.length > 0 && (
          <div className="innovation-card__metrics">
            {innovation.impact_metrics.slice(0, 2).map((metric) => (
              <div key={metric.label} className="innovation-card__metric">
                <span className="innovation-card__metric-value">{metric.value}</span>
                <span className="innovation-card__metric-label">{metric.label}</span>
              </div>
            ))}
          </div>
        )}

        {innovation.tags?.length > 0 && (
          <div className="innovation-card__tags">
            {innovation.tags.map((tag) => (
              <span key={tag} className="innovation-card__pill">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="innovation-card__footer">
          {innovation.timeline && (
            <span className="innovation-card__timeline">{innovation.timeline}</span>
          )}
          <span className="innovation-card__cta">
            View Project <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default InnovationCard;
