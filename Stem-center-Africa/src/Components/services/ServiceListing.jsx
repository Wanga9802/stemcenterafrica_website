import React, { useState } from "react";
import '../../Styles/ServiceListing.css';
import webIcon from '../../assets/web.png';
import softwareIcon from '../../assets/software.png';
import bookingIcon from '../../assets/online-booking.png';
import automationIcon from '../../assets/automation.png';
import mobileIcon from '../../assets/mobile.png';
import marketingIcon from '../../assets/marketing.png';

const services = [
  {
    id: "01",
    title: "Website Development",
    icon: webIcon,
    description:
      "Professional websites, ecommerce stores, landing pages, and portals built to convert visitors into customers.",
    features: ["Responsive design", "Basic SEO", "Modern custom design"],
  },
  {
    id: "02",
    title: "Software Development",
    icon: softwareIcon,
    description:
      "Custom software solutions tailored to your business workflows — from internal tools to full-scale platforms.",
    features: ["Custom dashboards", "API integrations", "Scalable architecture"],
  },
  {
    id: "03",
    title: "Booking Systems",
    icon: bookingIcon,
    description:
      "Booking platforms with calendars, M-Pesa payments, reminders, staff schedules, and client portals.",
    features: ["Online bookings", "M-Pesa payments", "Client portals"],
  },
  {
    id: "04",
    title: "AI Automation",
    icon: automationIcon,
    description:
      "AI workflows, customer support automation, reporting, and task systems that reduce manual work.",
    features: ["AI workflows", "Smart reporting", "Customer automation"],
  },
  {
    id: "05",
    title: "Mobile Development",
    icon: mobileIcon,
    description:
      "Native and cross-platform mobile apps for Android and iOS that deliver seamless user experiences.",
    features: ["Android & iOS", "Offline support", "Push notifications"],
  },
  {
    id: "06",
    title: "Digital Marketing",
    icon: marketingIcon,
    description:
      "Data-driven campaigns across social media, search, and email to grow your brand and drive revenue.",
    features: ["Social media ads", "SEO & content", "Email campaigns"],
  },
];

export default function ServiceListing() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="service-listing">
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
        {services.map((service) => (
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
            <button className="service-card__btn">EXPLORE SERVICE</button>
          </div>
        ))}
      </div>
    </section>
  );
}
