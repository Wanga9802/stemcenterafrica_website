import { useState } from "react";
import '../../Styles/Bloghero.css'

// ── Categories ─────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "robotics-ai",  label: "Robotics & AI" },
  { id: "scratch",      label: "Scratch" },
  { id: "basic-comp",   label: "Basic Computer" },
  { id: "web-dev",      label: "Web Development" },
  { id: "tinkering",    label: "Tinkering" },
  { id: "arduino-iot",  label: "Arduino & IoT Development" },
  { id: "community",    label: "Community Stories" },
  { id: "career",       label: "Career Readiness" },
];

// ── Props ──────────────────────────────────────────────────────────────────
// onCategoryChange(id | null)  — called when user picks / deselects a category
// defaultCategory              — pre-selected category id (optional)

export default function BlogHero({ onCategoryChange, defaultCategory = null }) {
  const [active, setActive] = useState(defaultCategory);

  const handleSelect = (id) => {
    const next = active === id ? null : id;   // toggle off if already selected
    setActive(next);
    if (onCategoryChange) onCategoryChange(next);
  };

  return (
    <section className="bh-hero" aria-label="Blog hero and category selector">
        <div className="container px-5 bh-hero-container">

      {/* Background glow layers */}
      <div className="bh-hero__glow"       aria-hidden="true" />
      <div className="bh-hero__glow-right" aria-hidden="true" />

      <div className="bh-hero__inner">

    

        <div className="bh-cat-grid" role="group" aria-label="Blog categories">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className={`bh-cat-btn${active === cat.id ? " bh-cat-btn--active" : ""}`}
              onClick={() => handleSelect(cat.id)}
              aria-current={active === cat.id ? 'true' : undefined}
            >
              <span>{cat.label}</span>
              <span className="bh-cat-btn__arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </div>

      </div>
    </div>
    </section>
  );
}
