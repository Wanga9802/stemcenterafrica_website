import { competition } from "../../data/wostemData";
import VideoEmbed from "./VideoEmbed";
import "../../Styles/CompetitionShowcase.css";

const CompetitionShowcase = () => {
  const featuredVideo = competition.videos.find((v) => v.featured);
  const secondaryVideo = competition.videos.find((v) => !v.featured);

  return (
    <section className="competition-showcase">
      <h2>{competition.title}</h2>

      <div className="competition-stats">
        {competition.stats.map((stat) => (
          <div key={stat.label} className="stat-pill">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="competition-grid">
        <ul className="competition-highlights">
          {competition.highlights.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
          <li className="project-title">{competition.projectTitle}</li>
        </ul>

        <VideoEmbed
          url={featuredVideo.url}
          title={featuredVideo.title}
          start={featuredVideo.start}
          end={featuredVideo.end}
        />
      </div>

      <details className="secondary-video">
        <summary>{secondaryVideo.title}</summary>
        <VideoEmbed
          url={secondaryVideo.url}
          title={secondaryVideo.title}
          start={secondaryVideo.start}
          end={secondaryVideo.end}
        />
      </details>
    </section>
  );
};

export default CompetitionShowcase;