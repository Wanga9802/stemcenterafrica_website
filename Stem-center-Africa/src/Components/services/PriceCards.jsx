import React from 'react';
import '../../Styles/ServiceListing.css';

const PriceCards = () => {
  return (
    <div className="price-cards">
      <div className="price-cards__grid">
        <div className="price-card--promo">
          <div className="price-card__eyebrow">Online store</div>
          <h3 className="price-card__title-big">FULL E-COMMERCE PRO</h3>
          <p className="price-card__desc">Recommended for ecommerce businesses that need a complete online shop or store.</p>
          <div className="price-card__price">FROM KSH 199,999</div>
          <ul className="price-card__list">
            <li>30–40 pages</li>
            <li>Hosting included</li>
            <li>Professionally customized</li>
            <li>Free domain + emails</li>
            <li>Full advanced booking system features</li>
            <li>Social media integration</li>
            <li>Free SSL certificate</li>
            <li>Premium support</li>
            <li>Fully SEO optimized</li>
            <li>M-Pesa integration & Visa</li>
            <li>Store training</li>
            <li>Live chat system integration</li>
            <li>Google Maps integration</li>
            <li>Mobile responsive website</li>
          </ul>
          <div className="price-card__cta">
            <button className="price-card__btn">BUILD MY STORE</button>
          </div>
        </div>

        <div className="price-card--promo">
          <div className="price-card__eyebrow">Corporate presence</div>
          <h3 className="price-card__title-big">CORPORATE PRO WEBSITE</h3>
          <p className="price-card__desc">Recommended for enterprises and corporate organizations.</p>
          <div className="price-card__price">FROM KSH 250,000</div>
          <ul className="price-card__list">
            <li>40–50 pages website</li>
            <li>Priority enterprise support</li>
            <li>Professionally customized</li>
            <li>Free domain + emails</li>
            <li>Fully SEO customized to your business</li>
            <li>Free hosting business plan</li>
            <li>Mobile responsive website</li>
            <li>Priority support</li>
            <li>Custom dashboards</li>
            <li>Full booking + payment system</li>
            <li>Client portal & admin dashboard</li>
            <li>Multiple staff logins</li>
          </ul>
          <div className="price-card__cta">
            <button className="price-card__btn">REQUEST A QUOTE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCards;
