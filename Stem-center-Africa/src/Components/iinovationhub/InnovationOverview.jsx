import { innovations } from "../../data/InnovationsData"; 
import "./InnovationOverview.css";


import IdeaIcon from "../../assets/light-bulb.png";
import ResearchIcon from "../../assets/magnifying-glass.png";
import PrototypeIcon from "../../assets/3dt.png";
import MvpIcon from "../../assets/mvp.png";
import PilotIcon from "../../assets/kite.png";
import ScaleIcon from "../../assets/organizational-goals.png";
import ImpactIcon from "../../assets/goal.png";

// Grand Challenges icons
import EducationIcon from "../../assets/academic.png";
import HealthcareIcon from "../../assets/healthy.png";
import ClimateIcon from "../../assets/global-warming.png";
import FoodIcon from "../../assets/food-safety.png";
import CleanEnergyIcon from "../../assets/green-energy.png";
import DigitalInclusionIcon from "../../assets/digitalization.png";
import CommunitiesIcon from "../../assets/community.png";
import EconomicIcon from "../../assets/inclusionn.png";

// --- Static content -------------------------------------------------

const PIPELINE_STAGES = [
  { label: "Idea", image: IdeaIcon, color: "#eab308" },
  { label: "Research", image: ResearchIcon, color: "#84cc16" },
  { label: "Prototype", image: PrototypeIcon, color: "#22c55e" },
  { label: "MVP", image: MvpIcon, color: "#14b8a6" },
  { label: "Pilot", image: PilotIcon, color: "#06b6d4" },
  { label: "Scale", image: ScaleIcon, color: "#8b5cf6" },
  { label: "Impact", image: ImpactIcon, color: "#ec4899" },
];

const GRAND_CHALLENGES = [
  { label: "Education Equity", image: EducationIcon },
  { label: "Healthcare Access", image: HealthcareIcon },
  { label: "Climate Change", image: ClimateIcon },
  { label: "Food Security", image: FoodIcon },
  { label: "Clean Energy", image: CleanEnergyIcon },
  { label: "Digital Inclusion", image: DigitalInclusionIcon },
  { label: "Smart Communities", image: CommunitiesIcon },
  { label: "Economic Opportunity", image: EconomicIcon },
];

const ROADMAP_PHASES = [
  {
    range: "2025–2026",
    color: "#101F3C",
    title: "Strengthen core innovations & pilot solutions",
  },
  {
    range: "2026–2027",
     color: "#101F3C",
    title: "Expand labs & scale breakthrough innovations",
  },
  {
    range: "2027–2028",
     color: "#101F3C",
    title: "Launch new frontiers & regional collaborations",
  },
  {
    range: "2028–2030",
    color: "#101F3C",
    title: "Build Africa's leading innovation ecosystem & impact millions",
  },
];

const STATUS_DOT_COLOR = {
  active: "#22c55e",
  ongoing: "#22c55e",
  pilot: "#f97316",
  deployed: "#22c55e",
  completed: "#6b7280",
};

// --- Card: Innovation Pipeline ---------------------------------------

function InnovationPipelineCard() {
  return (
    <div className="io-card shadow-lg io-pipeline-card">
      <h3 className="io-card__title">Our Innovation Pipeline</h3>
      <p className="io-card__subtitle">Turning ideas into impact.</p>

      <div className="io-pipeline">
        {PIPELINE_STAGES.map((stage, index) => (
          <div className="io-pipeline__stage" key={stage.label}>
            <div 
              className="io-pipeline__icon"
              style={{ "--stage-color": stage.color }}
            >
              <img src={stage.image} alt="" className="io-pipeline__icon-img" />
            </div>
            <span className="io-pipeline__label">{stage.label}</span>
          </div>
        ))}
      </div>

      <div className="io-pipeline__track">
        {PIPELINE_STAGES.map((stage) => (
          <span
            key={stage.label}
            className="io-pipeline__dot"
            style={{ background: stage.color }}
          />
        ))}
      </div>

      <p className="io-card__footnote">
        Every innovation we build follows a path from imagination to real-world impact.
      </p>
    </div>
  );
}

// --- Card: Featured Innovations ---------------------------------------

function FeaturedInnovationsCard() {
  const featured = innovations.slice(0, 3);

  return (
    <div className="io-card shadow-lg io-featured-card">
      <h3 className="io-card__title">Featured Innovations</h3>

      <div className="io-featured__grid">
        {featured.map((item) => (
          <div className="io-featured__item" key={item.id}>
            <div className="io-featured__media">
              <img src={item.cover_image_url} alt={item.title} loading="lazy" />
            </div>
            <h4 className="io-featured__name">{item.title}</h4>
            <p className="io-featured__desc">{item.description}</p>
            <span className="io-featured__status">
              <span
                className="io-featured__status-dot"
                style={{ background: STATUS_DOT_COLOR[item.status] || "#6b7280" }}
              />
              {(item.status || "").toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      <a href="#innovation-projects" className="io-card__cta-btn">
        Explore All Our Innovations <i className="bi bi-arrow-right" aria-hidden="true" />
      </a>
    </div>
  );
}

// --- Card: Grand Challenges ---------------------------------------

function GrandChallengesCard() {
  return (
    <div className="io-card shadow-lg io-challenges-card">
      <h3 className="io-card__title">Grand Challenges We Tackle</h3>

      <div className="io-challenges__grid">
        {GRAND_CHALLENGES.map((challenge) => (
          <div className="io-challenges__item" key={challenge.label}>
            <div className="io-challenges__icon">
              <img src={challenge.image} alt="" className="io-challenges__icon-img" />
            </div>
            <span className="io-challenges__label">{challenge.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Card: Innovation Roadmap ---------------------------------------

function InnovationRoadmapCard() {
  return (
    <div className="io-card shadow-lg io-roadmap-card">
      <h3 className="io-card__title">Innovation Roadmap</h3>

      <div className="io-roadmap__track">
        {ROADMAP_PHASES.map((phase, index) => (
          <div className="io-roadmap__phase" key={phase.range}>
            <span
              className="io-roadmap__range"
              style={{ color: phase.color }}
            >
              {phase.range}
            </span>
            <p className="io-roadmap__desc">{phase.title}</p>
            {index < ROADMAP_PHASES.length - 1 && (
              <span
                className="io-roadmap__connector"
                style={{ background: phase.color }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Parent: Overview Grid ---------------------------------------

function InnovationOverview() {
  return (
    <section className="innovation-overview">
      <div className="innovation-overview__container">
        <div className="row g-4">
          <div className="col-md-6">
            <InnovationPipelineCard />
          </div>
          <div className="col-md-6">
            <FeaturedInnovationsCard />
          </div>
        </div>

        <div className="row g-4 mt-0">
          <div className="col-md-6">
            <GrandChallengesCard />
          </div>
          <div className="col-md-6">
            <InnovationRoadmapCard />
          </div>
        </div>
      </div>
    </section>
  );
}

export default InnovationOverview;
