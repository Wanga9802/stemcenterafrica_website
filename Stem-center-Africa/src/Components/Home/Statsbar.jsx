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
    value: "18712+",
    label: "leaners reached",
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
    {
    id: 4,
    icon: "bi bi-patch-check-fill",
    value: "100,000",
    label: "Target by 2030",
  },
];

export default function StatsBar() {
  return (
    <div className="sb-wrap">
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
    </div>
  );
}