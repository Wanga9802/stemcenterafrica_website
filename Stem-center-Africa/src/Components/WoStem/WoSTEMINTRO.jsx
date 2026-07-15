
import { wostemIntro } from "../../data/wostemData";
import "../../Styles/WoSTEMINTRO.css";

const WoSTEMIntro = () => {
  return (
    <section className="wostem-intro">
      <h2 className="wostem-intro-title">{wostemIntro.title}</h2>

      <p className="wostem-intro-description">{wostemIntro.description}</p>

      <h3 className="wostem-intro-subheading">STEM Programs Our Girls Enjoy</h3>
      <div className="wostem-focus-grid">
        {wostemIntro.focusAreas.map((area, i) => (
          <span key={i} className="wostem-focus-pill">
            {area}
          </span>
        ))}
      </div>

      <p className="wostem-intro-note">{wostemIntro.note}</p>
    </section>
  );
};

export default WoSTEMIntro;