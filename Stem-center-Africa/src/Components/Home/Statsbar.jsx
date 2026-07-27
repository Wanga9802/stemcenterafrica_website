import '../../Styles/Statsbar.css';

const stats = [
  {
    id: 1,
    icon: "bi bi-calendar-event-fill",
    value: "15+",
    label: "projects built",
  },
  {
    id: 2,
    icon: "bi bi-people-fill",
    value: "19183+",
    label: "learners reached",
  },
  {
    id: 3,
    icon: "bi bi-briefcase-fill",
    value: "69%",
    label: "female participation in STEM programs",
  },
  {
    id: 4,
    icon: "bi bi-patch-check-fill",
    value: "2",
    label: "STEM centers established",
  },
  {
    id: 5,
    icon: "bi bi-patch-check-fill",
    value: "100,000",
    label: "Target by 2030",
  },
];


const marqueeStats = [...stats, ...stats];

export default function StatsBar() {
  return (
    <div className="sb-wrap">
      <section className="sb-section">
        <h3 className="sb-header">Our impact</h3>
        <div className="sb-viewport">
          <div className="sb-track">
            {marqueeStats.map((stat, index) => (
              <div className="sb-item" key={`${stat.id}-${index}`}>
                <div className="sb-icon-wrap">
                  <i className={stat.icon}></i>
                </div>
                <div className="sb-text">
                  <span className="sb-value">{stat.value}</span>
                  <span className="sb-label">{stat.label}</span>
                </div>
                <div className="sb-divider" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
