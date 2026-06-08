import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ServiceHero } from '../Components/services/serviceshero';
import { SERVICES, SERVICE_HERO_CONFIG } from '../data/servicesData';

function ServiceDetail() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [pricingMode, setPricingMode] = useState('oneTime');

  const scrollToPackages = () => {
    const target = document.getElementById('service-packages');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const service = useMemo(
    () => SERVICES.find((item) => item.slug === serviceId),
    [serviceId],
  );
  const heroConfig = SERVICE_HERO_CONFIG[serviceId] || {};

  if (!service) {
    return (
      <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h1>Service not found</h1>
        <p>The requested service page does not exist yet.</p>
        <button type="button" onClick={() => navigate('/services')} style={{ marginTop: '1rem', padding: '0.9rem 1.6rem' }}>
          Back to Services
        </button>
      </section>
    );
  }

  return (
    <>
      <ServiceHero
        badge={heroConfig.badge || service.title}
        title={heroConfig.title || service.title}
        accent={heroConfig.accent || 'Services'}
        description={
          heroConfig.description ||
          service.description ||
          'Detailed services and solutions tailored for your business needs.'
        }
        perks={heroConfig.perks || service.features}
        primaryCta="View Packages"
        secondaryCta="Back to Services"
        onPrimaryClick={scrollToPackages}
        onSecondaryClick={() => navigate('/services')}
        images={heroConfig.images}
        solutions={heroConfig.solutions}
        onSolutionsCta={scrollToPackages}
      />

      <section id="service-packages" style={{ padding: '5rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '41px', fontWeight: 800, marginBottom: '1rem', color: '#101F3C', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif' }}>
            Our {service.title} Packages
          </h2>
          <p style={{ fontSize: '18px', color: '#4A5068', marginBottom: '2rem', fontFamily: 'DM Sans, sans-serif' }}>
            Choose between flexible one-time payments or predictable monthly subscriptions.
          </p>

          {/* Toggle Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <button
              type="button"
              onClick={() => setPricingMode('oneTime')}
              style={{
                padding: '0.85rem 2rem',
                border: '2px solid',
                borderColor: pricingMode === 'oneTime' ? '#2563eb' : '#e5e7eb',
                background: pricingMode === 'oneTime' ? '#2563eb' : '#fff',
                color: pricingMode === 'oneTime' ? '#fff' : '#374151',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              One Time Payment
            </button>
            <button
              type="button"
              onClick={() => setPricingMode('monthly')}
              style={{
                padding: '0.85rem 2rem',
                border: '2px solid',
                borderColor: pricingMode === 'monthly' ? '#2563eb' : '#e5e7eb',
                background: pricingMode === 'monthly' ? '#2563eb' : '#fff',
                color: pricingMode === 'monthly' ? '#fff' : '#374151',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Monthly Subscription
            </button>
          </div>

          {/* Pricing Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              marginTop: '2rem',
            }}
          >
            {/* Basic/Starter Plan */}
            <div
              style={{
                background: '#fff',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'left',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
              }}
            >
              <span style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, color: '#FF4D9E', backgroundColor: 'rgba(255, 77, 158, 0.1)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', padding: '0.4rem 0.8rem', borderRadius: '8px', fontFamily: 'DM Sans, sans-serif' }}>
                Starter
              </span>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0D1340', margin: '0.5rem 0 1rem', fontFamily: 'DM Sans, sans-serif' }}>BASIC</h3>
              <p style={{ fontSize: '18px', color: '#4A5068', margin: '0 0 1.5rem', minHeight: '3rem', fontFamily: 'DM Sans, sans-serif' }}>
                A clean starter package for small businesses that need a credible online presence.
              </p>
              <div style={{ margin: '1.5rem 0', paddingBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FF4D9E' }}>
                  {pricingMode === 'oneTime' ? 'KSH 20,000' : 'KSH 2,000'}
                  {pricingMode === 'monthly' && <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>/mo</span>}
                </div>
              </div>
              <ul style={{ margin: '1.5rem 0', padding: 0, listStyle: 'none', color: '#2D3452', lineHeight: 1.8 }}>
                <li style={{ marginBottom: '0.75rem', fontSize: '16px', color: '#2D3452', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}><span style={{ color: '#FF4D9E', fontWeight: 700 }}>✓</span> Up to 5 pages</li>
                <li style={{ marginBottom: '0.75rem', fontSize: '16px', color: '#2D3452', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}><span style={{ color: '#FF4D9E', fontWeight: 700 }}>✓</span> Professional responsive design</li>
                <li style={{ marginBottom: '0.75rem', fontSize: '16px', color: '#2D3452', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}><span style={{ color: '#FF4D9E', fontWeight: 700 }}>✓</span> Basic SEO setup</li>
                <li style={{ marginBottom: '0.75rem', fontSize: '16px', color: '#2D3452', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}><span style={{ color: '#FF4D9E', fontWeight: 700 }}>✓</span> WhatsApp and direct contact</li>
                <li style={{ marginBottom: '0.75rem', fontSize: '16px', color: '#2D3452', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}><span style={{ color: '#FF4D9E', fontWeight: 700 }}>✓</span> SSL certificate setup</li>
                <li style={{ fontSize: '16px', color: '#2D3452', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}><span style={{ color: '#FF4D9E', fontWeight: 700 }}>✓</span> Launch support</li>
              </ul>
              <button
                type="button"
                style={{
                  width: '100%',
                  padding: '0.9rem 1.5rem',
                  background: '#fff',
                  color: '#FF4D9E',
                  border: '2px solid #FF4D9E',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginTop: '1rem',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                START NOW
              </button>
            </div>

            {/* Business Plan (Recommended) */}
            <div
              style={{
                background: '#fff',
                border: '2px solid #fbbf24',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'left',
                boxShadow: '0 8px 24px rgba(251, 191, 36, 0.15)',
                position: 'relative',
                transform: 'scale(1.02)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02) translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(251, 191, 36, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(251, 191, 36, 0.15)';
              }}
            >
              <span style={{ position: 'absolute', top: '-12px', right: '1.5rem', background: '#FF4D9E', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '0.4rem 0.8rem', borderRadius: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'DM Sans, sans-serif' }}>
                RECOMMENDED
              </span>
              <span style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, color: '#FF4D9E', backgroundColor: 'rgba(255, 77, 158, 0.1)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', padding: '0.4rem 0.8rem', borderRadius: '8px', fontFamily: 'DM Sans, sans-serif' }}>
                Digital Growth
              </span>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0D1340', margin: '0.5rem 0 1rem', fontFamily: 'DM Sans, sans-serif' }}>BUSINESS</h3>
              <p style={{ fontSize: '18px', color: '#4A5068', margin: '0 0 1.5rem', minHeight: '3rem', fontFamily: 'DM Sans, sans-serif' }}>
                A stronger business website for companies ready to attract and convert customers.
              </p>
              <div style={{ margin: '1.5rem 0', paddingBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FF4D9E' }}>
                  {pricingMode === 'oneTime' ? 'KSH 30,000' : 'KSH 3,000'}
                  {pricingMode === 'monthly' && <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>/mo</span>}
                </div>
              </div>
              <ul style={{ margin: '1.5rem 0', padding: 0, listStyle: 'none', color: '#2D3452', lineHeight: 1.8 }}>
                <li style={{ marginBottom: '0.75rem', fontSize: '16px', color: '#2D3452', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}><span style={{ color: '#FF4D9E', fontWeight: 700 }}>✓</span> Up to 10 pages</li>
                <li style={{ marginBottom: '0.75rem', fontSize: '16px', color: '#2D3452', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}><span style={{ color: '#FF4D9E', fontWeight: 700 }}>✓</span> Professional responsive design</li>
                <li style={{ marginBottom: '0.75rem', fontSize: '16px', color: '#2D3452', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}><span style={{ color: '#FF4D9E', fontWeight: 700 }}>✓</span> Domain and hosting included</li>
                <li style={{ marginBottom: '0.75rem', fontSize: '16px', color: '#2D3452', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}><span style={{ color: '#FF4D9E', fontWeight: 700 }}>✓</span> Business email setup</li>
                <li style={{ marginBottom: '0.75rem', fontSize: '16px', color: '#2D3452', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}><span style={{ color: '#FF4D9E', fontWeight: 700 }}>✓</span> Google Maps and social links</li>
                <li style={{ fontSize: '16px', color: '#2D3452', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}><span style={{ color: '#FF4D9E', fontWeight: 700 }}>✓</span> SEO basics and analytics setup</li>
              </ul>
              <button
                type="button"
                style={{
                  width: '100%',
                  padding: '0.9rem 1.5rem',
                  background: '#FF4D9E',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginTop: '1rem',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                CHOOSE THIS PLAN
              </button>
            </div>

            {/* Advanced/Professional Plan */}
            <div
              style={{
                background: '#fff',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'left',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
              }}
            >
              <span style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, color: '#FF4D9E', backgroundColor: 'rgba(255, 77, 158, 0.1)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', padding: '0.4rem 0.8rem', borderRadius: '8px', fontFamily: 'DM Sans, sans-serif' }}>
                Performance & Conversion
              </span>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0D1340', margin: '0.5rem 0 1rem', fontFamily: 'DM Sans, sans-serif' }}>ADVANCED</h3>
              <p style={{ fontSize: '18px', color: '#4A5068', margin: '0 0 1.5rem', minHeight: '3rem', fontFamily: 'DM Sans, sans-serif' }}>
                For professional businesses that need advanced structure, SEO, and integrations.
              </p>
              <div style={{ margin: '1.5rem 0', paddingBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FF4D9E' }}>
                  {pricingMode === 'oneTime' ? 'KSH 70,000' : 'KSH 7,000'}
                  {pricingMode === 'monthly' && <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>/mo</span>}
                </div>
              </div>
              <ul style={{ margin: '1.5rem 0', padding: 0, listStyle: 'none', color: '#2D3452', lineHeight: 1.8 }}>
                <li style={{ marginBottom: '0.75rem', fontSize: '16px', color: '#2D3452', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}><span style={{ color: '#FF4D9E', fontWeight: 700 }}>✓</span> Up to 20 pages</li>
                <li style={{ marginBottom: '0.75rem', fontSize: '16px', color: '#2D3452', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}><span style={{ color: '#FF4D9E', fontWeight: 700 }}>✓</span> Advanced SEO and speed optimization</li>
                <li style={{ marginBottom: '0.75rem', fontSize: '16px', color: '#2D3452', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}><span style={{ color: '#FF4D9E', fontWeight: 700 }}>✓</span> Conversion-focused page structure</li>
                <li style={{ marginBottom: '0.75rem', fontSize: '16px', color: '#2D3452', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}><span style={{ color: '#FF4D9E', fontWeight: 700 }}>✓</span> Integrations based on your needs</li>
                <li style={{ marginBottom: '0.75rem', fontSize: '16px', color: '#2D3452', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}><span style={{ color: '#FF4D9E', fontWeight: 700 }}>✓</span> Analytics and tracking setup</li>
                <li style={{ fontSize: '16px', color: '#2D3452', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}><span style={{ color: '#FF4D9E', fontWeight: 700 }}>✓</span> Priority launch support</li>
              </ul>
              <button
                type="button"
                style={{
                  width: '100%',
                  padding: '0.9rem 1.5rem',
                  background: '#fff',
                  color: '#FF4D9E',
                  border: '2px solid #FF4D9E',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginTop: '1rem',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                TALK TO AN EXPERT
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceDetail;
