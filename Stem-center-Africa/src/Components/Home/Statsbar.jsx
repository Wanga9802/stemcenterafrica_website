
import '../../Styles/Statsbar.css';

const stats = [
  {
    id: 1,
    icon: "bi bi-calendar-event-fill",
    value: "2017",
    label: "Year STEM Center Africa was founded",
  },
  {
    id: 2,
    icon: "bi bi-people-fill",
    value: "18712+",
    label: "Students Trained & Empowered",
  },
  {
    id: 3,
    icon: "bi bi-briefcase-fill",
    value: "15+",
    label: "Programs Offered",
  },
  {
    id: 4,
    icon: "bi bi-patch-check-fill",
    value: "10+",
    label: "Partners & Collaborators",
  },
];

export default function StatsBar() {
  return (
    <>
      <div className="hl-section">
        <p className="hl-text">
          Be part of a growing community of <strong>18,712+</strong> students
          trained &amp; empowered across Africa through programmes in{' '}
          <strong>STEM, coding, robotics</strong> and <strong>digital skills</strong>.
        </p>
      </div>

      <section className="sb-section">
        <div className="sb-container">
          {stats.map((stat, index) => (
            <div className="sb-item" key={stat.id}>
              <div className="sb-icon-wrap">
                <i className={stat.icon}></i>
              </div>
              <div className="sb-text">
                <span className="sb-value">{stat.value}</span>
                <span className="sb-label">{stat.label}</span>
              </div>
              {index < stats.length - 1 && <div className="sb-divider" />}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
