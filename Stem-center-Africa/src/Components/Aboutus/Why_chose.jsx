import React from 'react';
import '../../Styles/why_chose.css';
import  acredit from '../../assets/accreditation.png';
import graduate from '../../assets/graduation.png';
import relationship from '../../assets/Relation.png';
import excellence from '../../assets/excellence.png';


const defaultReasons = [
  {
    image: relationship,
    title: 'Global competency',
   
  },
  {
    image: excellence,
    title: 'Proven Excellence in delivering Hands on skills',
   
  },
  {
    image: acredit,
    title: 'Empowering girls in STEM',
   
  },
  {
    image: graduate,
    title: 'National STEM Honor society Accreditation',
   
  },
];


export default function WhyChooseUs({ reasons, heading, subheading }) {
  const items      = reasons    || defaultReasons;
  const titleText  = heading    || 'Why Choose Us?';
  const subText    = subheading || 'Here\'s what sets STEM Center Africa apart from the rest.';

  return (
    <section className="wcu-section " aria-label="Why choose us">

      <div className="container pt-0 pb-5">

        {/* Section heading */}
        <h2 className="wcu-heading mb-5 pt-0 pb-0">
          Why Choose Us? 
        </h2>
        <p className="wcu-subheading">{subText}</p>

        {/* Cards grid */}
        <div className="wcu-grid">
          {items.map((item, index) => (
            <div className="wcu-card " key={index}>

              {/* Icon */}
<div className="wcu-icon-wrap">
  <img src={item.image} alt="" aria-hidden="true" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
</div>

              {/* Text */}
              <h3 className="wcu-card-title">{item.title}</h3>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
