import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ServiceHero } from '../Components/services/serviceshero';
import CallToAction from '../Components/services/Calltoaction';
import { SERVICES, SERVICE_HERO_CONFIG, SERVICE_DETAIL_CONFIG } from '../data/servicesData';
import './ServiceDetail.css';

function ServiceDetail() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [pricingMode, setPricingMode] = useState('oneTime');
  const [selectedPackageKey, setSelectedPackageKey] = useState(null);
  const [moduleSelections, setModuleSelections] = useState({});
  const [featureSelections, setFeatureSelections] = useState({});

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
  const detailConfig = SERVICE_DETAIL_CONFIG[serviceId];

  const packageList = useMemo(() => {
    if (pricingMode === 'monthly' && detailConfig?.enableMonthlyPricing) {
      return detailConfig.monthlyPackages || detailConfig.packages || [];
    }
    return detailConfig?.packages || [];
  }, [detailConfig, pricingMode]);

  // Initialize selected package to the recommended one if not set
  const initialPackage = useMemo(() => {
    if (selectedPackageKey) return selectedPackageKey;
    const recommended = packageList.find((p) => p.isRecommended);
    return recommended?.key || packageList[2]?.key || packageList[0]?.key;
  }, [selectedPackageKey, packageList]);

  // Set initial package if needed
  useMemo(() => {
    if (!selectedPackageKey && initialPackage) {
      setSelectedPackageKey(initialPackage);
    }
  }, [initialPackage, selectedPackageKey]);

  const selectedPackage = useMemo(
    () => packageList.find((p) => p.key === selectedPackageKey) || packageList[0],
    [selectedPackageKey, packageList],
  );

  const selectedModules = useMemo(
    () => detailConfig?.modules?.filter((m) => moduleSelections[m.key]) || [],
    [moduleSelections, detailConfig],
  );

  const selectedFeatures = useMemo(
    () => detailConfig?.features?.filter((f) => featureSelections[f.key]) || [],
    [featureSelections, detailConfig],
  );

  const selectedAddons = [...selectedModules, ...selectedFeatures];

  const addonsTotal = useMemo(
    () => selectedAddons.reduce((sum, item) => sum + item.price, 0),
    [selectedAddons],
  );

  const packagePrice = pricingMode === 'monthly' && detailConfig?.enableMonthlyPricing
    ? selectedPackage.monthlyPrice
    : selectedPackage.price;

  const estimatedTotal = packagePrice + addonsTotal;

  const toggleModuleSelection = (key) => {
    setModuleSelections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFeatureSelection = (key) => {
    setFeatureSelections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!service || !detailConfig) {
    return (
      <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h1>Service not found</h1>
        <p>The requested service page does not exist yet.</p>
        <button
          type="button"
          onClick={() => navigate('/services')}
          style={{ marginTop: '1rem', padding: '0.9rem 1.6rem' }}
        >
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

      {/* SECTION 1: View Packages */}
      <section id="service-packages" className="sd-packages-section">
        <div className="sd-packages-header">
          <h2 className="sd-packages-title">Our {service.title} Packages</h2>
          <p className="sd-packages-description">
            {detailConfig.enableMonthlyPricing
              ? 'Choose between flexible one-time payments or predictable monthly subscriptions.'
              : 'Choose the perfect package for your business needs.'}
          </p>

          {/* Pricing Toggle (only for website) */}
          {detailConfig.enableMonthlyPricing && (
            <div className="sd-pricing-toggle">
              <button
                type="button"
                onClick={() => setPricingMode('oneTime')}
                className={`sd-pricing-button ${pricingMode === 'oneTime' ? 'active' : ''}`}
              >
                One Time Payment
              </button>
              <button
                type="button"
                onClick={() => setPricingMode('monthly')}
                className={`sd-pricing-button ${pricingMode === 'monthly' ? 'active' : ''}`}
              >
                Monthly Subscription
              </button>
            </div>
          )}

          {/* Package Cards */}
          <div className="sd-packages-grid">
            {packageList.map((pkg) => (
              <div
                key={pkg.key}
                className={`sd-package-card ${pkg.isRecommended ? 'recommended' : ''}`}
              >
                {pkg.isRecommended && (
                  <div className="sd-package-recommended-badge">RECOMMENDED</div>
                )}
                <div>
                  {pkg.tier && (
                    <div className="sd-package-tier-badge">{pkg.tier}</div>
                  )}
                  <h3 className="sd-package-name">{pkg.label}</h3>
                  {pricingMode === 'oneTime' && pkg.description && (
                    <p className="sd-package-description">{pkg.description}</p>
                  )}
                  {pricingMode === 'monthly' && detailConfig.enableMonthlyPricing ? (
                    <div className="sd-package-price-section--monthly">
                      <div className="sd-package-price--monthly-large">
                        ${(pkg.monthlyPrice / 100).toFixed(0)}
                        <span className="sd-package-mo">/MO</span>
                      </div>
                      <div className="sd-package-kes-badge">KES {Math.round((pkg.monthlyPrice / 100) * 130).toLocaleString()}/mo</div>
                      <div className="sd-package-setup-fee--monthly">
                        ${Math.round(pkg.setupFee / 100)} / KES {pkg.setupFee.toLocaleString()} one-time setup fee
                      </div>
                    </div>
                  ) : (
                    <div className="sd-package-price-section">
                      <div className="sd-package-price">
                        KSH {pkg.price.toLocaleString()}
                      </div>
                      {pkg.retainerFee && (
                        <div className="sd-package-retainer-fee">
                          Retainer fee: KES {pkg.retainerFee.toLocaleString()} / mo.
                        </div>
                      )}
                    </div>
                  )}
                  {pkg.features?.length > 0 && (
                    <ul className="sd-package-features">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx}>
                          <span>✓</span> {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  type="button"
                  className={`sd-package-button ${
                    pkg.isRecommended ? 'primary' : 'secondary'
                  }`}
                  onClick={() => navigate(`/service-request?service=${service.slug}&package=${pkg.key}`)}
                >
                  {pricingMode === 'monthly'
                    ? 'CHOOSE MONTHLY PLAN'
                    : service?.slug === 'digital-marketing'
                    ? 'MANAGE MY SOCIALS'
                    : 'START APP PROJECT'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Customize Package */}
      <section className="sd-customize-section">
        <div className="sd-customize-container">
          <div className="sd-customize-header">
            <h2 className="sd-customize-title">Customize Your Package</h2>
            <p className="sd-customize-description">{detailConfig.customizeDescription}</p>
          </div>

          <div className="sd-customize-grid">
            {/* Main Content Area */}
            <div className="sd-customize-main">
              {/* Step 1: Select Main Package */}
              <div className="sd-customize-step">
                <div className="sd-step-header">
                  <span className="sd-step-number">Step 1</span>
                  <h3 className="sd-step-title">Select main package</h3>
                </div>
                <div className="sd-packages-selector-grid">
                  {packageList.map((pkg) => (
                    <button
                      key={pkg.key}
                      type="button"
                      onClick={() => setSelectedPackageKey(pkg.key)}
                      className={`sd-package-option ${
                        selectedPackageKey === pkg.key ? 'selected' : ''
                      }`}
                    >
                      <div className="sd-package-option-name">{pkg.label}</div>
                      <div className="sd-package-option-price">
                        KSH{' '}
                        {pricingMode === 'monthly' && detailConfig.enableMonthlyPricing
                          ? pkg.monthlyPrice.toLocaleString()
                          : pkg.price.toLocaleString()}
                        {pricingMode === 'monthly' && detailConfig.enableMonthlyPricing
                          ? ' /mo'
                          : ''}
                      </div>
                      {pricingMode === 'oneTime' && pkg.description && (
                        <div className="sd-package-option-details">{pkg.description}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Add Modules */}
              {detailConfig.modules && detailConfig.modules.length > 0 && (
                <div className="sd-customize-step">
                  <div className="sd-step-header">
                    <span className="sd-step-number">Step 2</span>
                    <h3 className="sd-step-title">
                      {service.slug === 'website-development'
                        ? 'Add mobile payment modules'
                        : 'Add optional modules'}
                    </h3>
                  </div>
                  <div className="sd-modules-grid">
                    {detailConfig.modules.map((module) => (
                      <label key={module.key} className="sd-module-card">
                        <div>
                          <div className="sd-module-label">{module.label}</div>
                          <div className="sd-module-description">{module.description}</div>
                        </div>
                        <div className="sd-module-footer">
                          <span className="sd-module-price">+KSH {module.price.toLocaleString()}</span>
                          <input
                            type="checkbox"
                            checked={!!moduleSelections[module.key]}
                            onChange={() => toggleModuleSelection(module.key)}
                            className="sd-checkbox"
                          />
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Pick Business Features */}
              {detailConfig.features && detailConfig.features.length > 0 && (
                <div className="sd-customize-step">
                  <div className="sd-step-header">
                    <span className="sd-step-number">
                      {detailConfig.modules && detailConfig.modules.length > 0 ? 'Step 3' : 'Step 2'}
                    </span>
                    <h3 className="sd-step-title">Pick business features</h3>
                  </div>
                  <div className="sd-features-grid">
                    {detailConfig.features.map((feature) => (
                      <label key={feature.key} className="sd-feature-card">
                        <div>
                          <div className="sd-feature-label">{feature.label}</div>
                          <div className="sd-feature-description">{feature.description}</div>
                        </div>
                        <div className="sd-feature-footer">
                          <span className="sd-feature-price">+KSH {feature.price.toLocaleString()}</span>
                          <input
                            type="checkbox"
                            checked={!!featureSelections[feature.key]}
                            onChange={() => toggleFeatureSelection(feature.key)}
                            className="sd-checkbox"
                          />
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar: Price Summary */}
            <aside className="sd-price-summary">
              <div className="sd-summary-card">
                <div className="sd-summary-header">
                  <div>
                    <div className="sd-summary-label">Estimate Preview</div>
                    <h3 className="sd-summary-price">
                      KSH {estimatedTotal.toLocaleString()}
                      {pricingMode === 'monthly' && detailConfig.enableMonthlyPricing ? ' /mo' : ''}
                    </h3>
                  </div>
                  <div className="sd-summary-right">
                    <div className="sd-summary-pricing-type">
                      {pricingMode === 'monthly' && detailConfig.enableMonthlyPricing
                        ? 'Monthly subscription'
                        : 'One-time total'}
                    </div>
                    <div className="sd-summary-addons">{selectedAddons.length} add-ons</div>
                  </div>
                </div>

                <div className="sd-summary-breakdown">
                  <div className="sd-breakdown-row">
                    <span>Main package</span>
                    <strong>
                      KSH {packagePrice.toLocaleString()}
                      {pricingMode === 'monthly' && detailConfig.enableMonthlyPricing ? ' /mo' : ''}
                    </strong>
                  </div>
                  {selectedAddons.map((addon) => (
                    <div key={addon.key} className="sd-breakdown-row">
                      <span>{addon.label}</span>
                      <strong>KSH {addon.price.toLocaleString()}</strong>
                    </div>
                  ))}
                  {selectedAddons.length === 0 && (
                    <div className="sd-breakdown-empty">No add-ons selected yet.</div>
                  )}
                </div>

                <div className="sd-summary-note">
                  <div className="sd-summary-note-title">Note</div>
                  <p className="sd-summary-note-text">
                    This estimate is indicative. The final quote depends on customization level and
                    requested integrations.
                  </p>
                </div>

                <div className="sd-summary-buttons">
                  <button type="button" className="sd-summary-button primary">
                    Send Request
                  </button>
                  <button type="button" className="sd-summary-button secondary">
                    Talk to an Expert
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* SECTION 3: Call to Action */}
      <CallToAction
        badgeText="Ready to get started?"
        titlePrefix={detailConfig.ctaPrefix}
        serviceTitle={service.title}
        titleSuffix={detailConfig.ctaSuffix}
        buttonText="Book Consultation"
        showDescription={false}
        serviceName={service.title}
        buttonLink={`/service-request?service=${service.slug}&package=${selectedPackage.key}`}
      />
    </>
  );
}

export default ServiceDetail;
