import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import '../../Styles/SupportCarousel.css'

function useCarousel(length, interval = 4200) {
  const [idx, setIdx] = useState(0)
  const next = useCallback(() => setIdx((i) => (i + 1) % length), [length])

  useEffect(() => {
    const t = setInterval(next, interval)
    return () => clearInterval(t)
  }, [next, interval])

  return { idx, setIdx }
}

function SupportCarousel({ tiers }) {
  const { idx, setIdx } = useCarousel(tiers.length, 4200)
  const tier = tiers[idx]

  return (
    <div className="supp-carousel">
      {/* ── Outer card: image + tag only ─────────────── */}
      <div className="supp-img-card">
        {tiers.map((t, i) => (
          <div
            key={t.id}
            className={`supp-img-slide ${i === idx ? 'supp-img-slide--active' : ''}`}
            style={{ backgroundImage: `url(${t.image})` }}
            aria-hidden={i !== idx}
          />
        ))}
        <div className="supp-img-overlay" />
        <span className="supp-img-badge">{tier.amount} · {tier.tag}</span>
      </div>

      {/* ── Inner card: amount + description + CTA ───── */}
      <div className="supp-detail-card" key={idx}>
        <span
          className="supp-detail-tag"
          style={{ background: `${tier.tagColor}22`, color: tier.tagColor, borderColor: `${tier.tagColor}55` }}
        >
          {tier.tag}
        </span>

        <h3 className="supp-detail-amount">{tier.amount}</h3>
        <p className="supp-detail-desc">{tier.description}</p>

        <Link
          to={`/donate?amount=${encodeURIComponent(tier.amount)}`}
          className="supp-detail-cta"
        >
          Donate {tier.amount}
        </Link>

        <div className="supp-detail-tabs">
          {tiers.map((t, i) => (
            <button
              key={t.id}
              className={`supp-detail-tab ${i === idx ? 'supp-detail-tab--active' : ''}`}
              style={i === idx ? { borderColor: t.tagColor, color: t.tagColor } : {}}
              onClick={() => setIdx(i)}
            >
              {t.amount}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SupportCarousel