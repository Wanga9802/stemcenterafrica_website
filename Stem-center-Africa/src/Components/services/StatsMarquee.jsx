import React from "react";
import '../../Styles/StatsMarquee.css';
import graphIcon from "../../assets/graph.png";
import customerSatisfactionIcon from "../../assets/customer-satisfaction.png";
import awardIcon from "../../assets/award.png";

export default function StatsMarquee({ items }) {
  const data = items || [
    { icon: graphIcon, val: '200+', lbl: 'Projects Delivered' },
    { icon: customerSatisfactionIcon, val: '98%', lbl: 'Client Satisfaction' },
    { icon: awardIcon, val: '7+', lbl: 'Years of Excellence' },
  ];

  // duplicate the list to create a seamless loop
  const loop = data.concat(data);

  return (
    <div className="sh-marquee-wrap" aria-label="Statistics marquee">
      <div className="sh-marquee">
        <div className="sh-marquee__track">
          {loop.map((it, i) => (
            <div className="sh-marquee__item" key={i}>
              <img className="sh-statsbar__icon" src={it.icon} alt="" aria-hidden="true" />
              <div className="sh-statsbar__val">{it.val}</div>
              <div className="sh-statsbar__lbl">{it.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
