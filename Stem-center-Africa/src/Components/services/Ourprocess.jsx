import React, { useEffect, useRef, useState } from "react";
import '../../Styles/Ourprocess.css';
import researchIcon from '../../assets/research.png';
import planIcon from '../../assets/business-plan.png';
import buildIcon from '../../assets/blocks.png';
import launchIcon from '../../assets/launch.png';
import supportIcon from '../../assets/support.png';

const steps = [
  {
    id: "01",
    phase: "Discover",
    icon: researchIcon,
    heading: "We Listen First",
    description:
      "We start by understanding your business, goals, and challenges through deep discovery sessions — no assumptions, just clarity.",
   
  },
  {
    id: "02",
    phase: "Plan",
    icon: planIcon,
    heading: "Blueprint & Roadmap",
    description:
      "We map out the full solution — architecture, timeline, and milestones — so you know exactly what to expect before a single line of code is written.",
    
  },
  {
    id: "03",
    phase: "Build",
    icon: buildIcon,
    heading: "Craft & Develop",
    description:
      "Our team builds your solution with clean code, modern frameworks, and regular check-ins to keep you in the loop at every stage.",
   
  },
  {
    id: "04",
    phase: "Deploy",
    icon: launchIcon,
    heading: "Go Live",
    description:
      "We handle deployment, testing in production, and final checks — ensuring a smooth, zero-drama launch for your product.",
   
  },
  {
    id: "05",
    phase: "Support",
    icon: supportIcon,
    heading: "Always There",
    description:
      "Post-launch, we stay on call. Updates, bug fixes, scaling, and new features — we grow with you as your business evolves.",
   
  },
];

export default function OurProcess() {
  const [activeStep, setActiveStep] = useState(null);
  const [visible, setVisible] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, i) => {
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => [...new Set([...prev, i])]);
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(ref);
      return obs;
    });
    return () => observers.forEach((obs) => obs && obs.disconnect());
  }, []);

  return (
    <section className="process-section">
      {/* Background decoration */}
      <div className="process-section__bg-orb process-section__bg-orb--1" />
      <div className="process-section__bg-orb process-section__bg-orb--2" />

      <div className="process-section__inner">
        {/* Header */}
        <div className="process-section__header">
          <span className="process-section__eyebrow">HOW WE WORK</span>
          <h2 className="process-section__title">
            Our Process, <span className="process-section__title--pink">Step by Step</span>
          </h2>
          <p className="process-section__subtitle">
            From the first conversation to long-term support — a proven process
            that keeps your project on track and your team informed.
          </p>
        </div>

        {/* Steps */}
        <div className="process-steps">
          {steps.map((step, i) => (
            <div
              key={step.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`process-step ${visible.includes(i) ? "process-step--visible" : ""} ${activeStep === i ? "process-step--active" : ""}`}
              style={{ "--delay": `${i * 0.1}s` }}
              onMouseEnter={() => setActiveStep(i)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="process-step__meta">
                <span className="process-step__num">{step.id}</span>
                <span className="process-step__meta-separator">/</span>
                <div className="process-step__icon-wrap">
                  <img src={step.icon} alt={`${step.phase} icon`} className="process-step__icon" />
                </div>
              </div>

              {/* Content */}
              <div className="process-step__body">
                <span className="process-step__phase">{step.phase}</span>
                <h3 className="process-step__heading">{step.heading}</h3>
                <p className="process-step__description">{step.description}</p>
               
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
}
