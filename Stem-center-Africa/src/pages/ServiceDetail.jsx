import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ServiceHero } from '../Components/services/serviceshero';
import { SERVICES, SERVICE_HERO_CONFIG } from '../data/servicesData';

function ServiceDetail() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
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
        primaryCta="Request a Demo"
        secondaryCta="Back to Services"
        onPrimaryClick={() => navigate('/services')}
        onSecondaryClick={() => navigate('/services')}
        images={heroConfig.images}
        solutions={heroConfig.solutions}
      />

      <section style={{ padding: '4rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{service.title}</h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(0,0,0,0.75)' }}>
            Our website development service includes modern web design, responsive development,
            ecommerce setup, CMS integration, and performance optimization built for growth.
          </p>
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: '18px', padding: '1.75rem', boxShadow: '0 12px 40px rgba(16,24,40,0.08)' }}>
            <h3 style={{ marginBottom: '0.75rem' }}>What we deliver</h3>
            <ul style={{ margin: 0, padding: '0 0 0 1.25rem', color: 'rgba(0,0,0,0.72)', lineHeight: 1.8 }}>
              <li>Beautiful, responsive website layouts for desktop and mobile.</li>
              <li>Content management systems and page builder support.</li>
              <li>Ecommerce capabilities, checkout flows, and payment integration.</li>
              <li>SEO-friendly architecture, analytics setup, and launch support.</li>
            </ul>
          </div>

          <div style={{ background: '#fff', borderRadius: '18px', padding: '1.75rem', boxShadow: '0 12px 40px rgba(16,24,40,0.08)' }}>
            <h3 style={{ marginBottom: '0.75rem' }}>Next sections coming soon</h3>
            <p style={{ margin: 0, color: 'rgba(0,0,0,0.72)', lineHeight: 1.8 }}>
              We can add project examples, pricing, tech stack details, FAQs, testimonials, and contact pathways for website development.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceDetail;
