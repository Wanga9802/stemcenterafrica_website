import React from "react";
import "../../Styles/CohortBanner.css";
import weru from "../../assets/handshake.png";

export default function CohortBanner({
  heading = "Let's grow the next generation of innovators",
  subheading = "Ready to bring this into your classroom? Applications for the next cohort are open to teachers, curriculum officers, and club facilitators.",
  buttonText = "Apply for the next cohort",
  onButtonClick,
}) {
  return (
    <div className="cohort-banner" id="cohort-section">
      <div className="cohort-banner__left">
        <div className="cohort-banner__icon">
          <img src={weru} alt="Handshake icon" />
        </div>
        <div className="cohort-banner__text">
          <p className="cohort-banner__heading">{heading}</p>
          <p className="cohort-banner__subheading">{subheading}</p>
        </div>
      </div>

      <a
        href="/educator-application"
        className="cohort-banner__button"
      >
        <span>{buttonText}</span>
        <svg
          className="cohort-banner__arrow"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5 12H19M19 12L13 6M19 12L13 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
