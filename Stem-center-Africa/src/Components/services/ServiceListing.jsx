import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../Styles/ServiceListing.css';
import { SERVICES } from '../../data/servicesData';


export default function ServiceListing() {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  return (
    <section id="our-services" className="service-listing">
      <div className="service-listing__header">
        <span className="service-listing__eyebrow">OUR SERVICES</span>
        <h2 className="service-listing__title">
          Digital solutions built for<br />
          modern business growth.
        </h2>
        <p className="service-listing__subtitle">
          Choose the services you need to launch, automate, and scale your
          operations with confidence.
        </p>
      </div>

      <div className="service-listing__grid">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className={`service-card ${hovered === service.id ? "service-card--hovered" : ""}`}
            onMouseEnter={() => setHovered(service.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="service-card__icon">
              <img src={service.icon} alt={`${service.title} icon`} />
            </div>
            <h3 className="service-card__title">{service.title}</h3>
            <p className="service-card__description">{service.description}</p>
            <ul className="service-card__features">
              {service.features.map((f, i) => (
                <li key={i} className="service-card__feature-item">
                  <span className="service-card__check">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              className="service-card__btn"
              type="button"
              onClick={() => navigate(`/services/${service.slug}`)}
            >
              EXPLORE SERVICE
            </button>
          </div>
        ))}
      </div>

      {/* Removed website pricing cards from listing per request */}
    </section>
  );
}
