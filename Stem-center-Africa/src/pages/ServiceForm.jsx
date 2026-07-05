import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SERVICES, SERVICE_DETAIL_CONFIG } from '../data/servicesData';
import sendIcon from '../assets/send.png';
import mailIcon from '../assets/mail.png';
import communicationIcon from '../assets/communication.png';
import '../Styles/ServiceForm.css';

export default function ServiceForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const serviceId = searchParams.get('service') || 'website-development';
  const packageKey = searchParams.get('package');

  const service = useMemo(
    () => SERVICES.find((item) => item.slug === serviceId) || SERVICES[0],
    [serviceId],
  );

  const detailConfig = useMemo(
    () => SERVICE_DETAIL_CONFIG[service.slug] || SERVICE_DETAIL_CONFIG['website-development'],
    [service.slug],
  );

  const packages = detailConfig.packages || [];
  const selectedPackageDefault = useMemo(
    () => packages.find((pkg) => pkg.key === packageKey) || packages[0],
    [packages, packageKey],
  );

  const [selectedPackageKey, setSelectedPackageKey] = useState(selectedPackageDefault?.key || '');
  const selectedPackage = packages.find((pkg) => pkg.key === selectedPackageKey) || packages[0];

  useEffect(() => {
    if (selectedPackageDefault?.key) {
      setSelectedPackageKey(selectedPackageDefault.key);
    }
  }, [selectedPackageDefault]);

  const [businessName, setBusinessName]           = useState('');
  const [industry, setIndustry]                   = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [needs, setNeeds]                         = useState('');
  const [mainGoal, setMainGoal]                   = useState('');
  const [hasWebsite, setHasWebsite]               = useState('No');
  const [websiteLink, setWebsiteLink]             = useState('');
  const [websiteIssue, setWebsiteIssue]           = useState('');
  const [selectedAddons, setSelectedAddons]       = useState({});
  const [timeline, setTimeline]                   = useState('Immediately');
  const [budget, setBudget]                       = useState('');
  const [city, setCity]                           = useState('');
  const [contactChannel, setContactChannel]       = useState('WhatsApp');
  const [fullName, setFullName]                   = useState('');
  const [whatsapp, setWhatsapp]                   = useState('');
  const [email, setEmail]                         = useState('');
  const [submitted, setSubmitted]                 = useState(false);
  const formRef = useRef(null);

  const addons = useMemo(
    () => [...(detailConfig.modules || []), ...(detailConfig.features || [])],
    [detailConfig.modules, detailConfig.features],
  );

  const toggleAddon = (key) => {
    setSelectedAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getSelectedAddonsText = () => {
    const selected = addons.filter((addon) => selectedAddons[addon.key]);
    if (!selected.length) return 'None';
    return selected.map((addon) => `${addon.label} (KSH ${addon.price.toLocaleString()})`).join(', ');
  };

  const createWhatsAppBody = () => {
    const selectedPackagePrice = selectedPackage?.price ? `KSH ${selectedPackage.price.toLocaleString()}` : 'N/A';
    return [
      `Hi,`,
      '',
      `I would like to request a quote for the ${selectedPackage?.label} package (${selectedPackagePrice}) for the ${service.title} service.`,
      '',
      `01 - Business Information`,
      `Company name: ${businessName}`,
      `Industry / sector: ${industry}`,
      `Business description: ${businessDescription}`,
      '',
      `02 - Your Need`,
      `Needs: ${needs}`,
      `Main goal: ${mainGoal}`,
      `Has website: ${hasWebsite}`,
      `Website link: ${websiteLink || 'N/A'}`,
      `Website issue: ${websiteIssue || 'N/A'}`,
      '',
      `03 - Add-ons`,
      `Selected add-ons: ${getSelectedAddonsText()}`,
      '',
      `04 - Timeline & Budget`,
      `Timeline: ${timeline}`,
      `Budget: ${budget}`,
      '',
      `05 - Location & Communication`,
      `City: ${city}`,
      `Preferred channel: ${contactChannel}`,
      '',
      `06 - Contact`,
      `Full name: ${fullName}`,
      `WhatsApp number: ${whatsapp}`,
      `Email address: ${email}`,
      '',
      `Thanks,`,
    ].join('\n');
  };

  const createWhatsAppLink = () => `https://wa.me/254759924543?text=${encodeURIComponent(createWhatsAppBody())}`;

  const createEmailPayload = () => ({
    serviceTitle: service.title,
    selectedPackageLabel: selectedPackage?.label,
    selectedPackagePrice: selectedPackage?.price ? `KSH ${selectedPackage.price.toLocaleString()}` : 'N/A',
    businessName,
    industry,
    businessDescription,
    needs,
    mainGoal,
    hasWebsite,
    websiteLink,
    websiteIssue,
    selectedAddonsText: getSelectedAddonsText(),
    timeline,
    budget,
    city,
    contactChannel,
    fullName,
    whatsapp,
    email,
  });

  const validateForm = () => {
    if (!formRef.current) return false;
    return formRef.current.reportValidity();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    window.open(createWhatsAppLink(), '_blank');
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailSend = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const payload = createEmailPayload();
    const subject = `Quote request: ${payload.selectedPackageLabel} (${payload.serviceTitle})`;
    const body = [
      `Service: ${payload.serviceTitle}`,
      `Package: ${payload.selectedPackageLabel} (${payload.selectedPackagePrice})`,
      '',
      '01 - Business Information',
      `Company name: ${payload.businessName}`,
      `Industry / sector: ${payload.industry}`,
      `Business description: ${payload.businessDescription}`,
      '',
      '02 - Your Need',
      `Needs: ${payload.needs}`,
      `Main goal: ${payload.mainGoal}`,
      `Has website: ${payload.hasWebsite}`,
      `Website link: ${payload.websiteLink || 'N/A'}`,
      `Website issue: ${payload.websiteIssue || 'N/A'}`,
      '',
      '03 - Add-ons',
      `Selected add-ons: ${payload.selectedAddonsText}`,
      '',
      '04 - Timeline & Budget',
      `Timeline: ${payload.timeline}`,
      `Budget: ${payload.budget}`,
      '',
      '05 - Location & Communication',
      `City: ${payload.city}`,
      `Preferred channel: ${payload.contactChannel}`,
      '',
      '06 - Contact',
      `Full name: ${payload.fullName}`,
      `WhatsApp number: ${payload.whatsapp}`,
      `Email address: ${payload.email}`,
      '',
      'Thanks,',
    ].join('\n');

    const mailtoLink = `mailto:info@stemcenter-africa.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const waMessage = encodeURIComponent(`Hi, I would like to discuss a quote for the ${selectedPackage?.label} package.`);
  const whatsappLink = `https://wa.me/254759924543?text=${waMessage}`;

  const steps = [
    { num: '01', title: 'Business' },
    { num: '02', title: 'Your Need' },
    { num: '03', title: 'Add-ons' },
    { num: '04', title: 'Timeline' },
    { num: '05', title: 'Location' },
    { num: '06', title: 'Contact' },
  ];

  return (
    <main className="sf-page">
      {/* ── dot-grid atmosphere ── */}
      <div className="sf-dot-grid" aria-hidden="true" />

      <div className="sf-shell">

        {/* ── breadcrumb ── */}
        <nav className="sf-breadcrumb">
          <button type="button" onClick={() => navigate('/services')} className="sf-breadcrumb__link">
            Services
          </button>
          <span className="sf-breadcrumb__sep">/</span>
          <span className="sf-breadcrumb__current">{service.title}</span>
          <span className="sf-breadcrumb__sep">/</span>
          <span className="sf-breadcrumb__active">Get a Quote</span>
        </nav>

        {/* ── hero band ── */}
        <header className="sf-hero">
          <div className="sf-hero__left">
            <span className="sf-hero__eyebrow">Quote Request</span>
            <h1 className="sf-hero__title">
              {service.title}
            </h1>
            <p className="sf-hero__sub">
              Fill in the details below and we'll send a tailored proposal within 24 hours.
            </p>
          </div>

          <div className="sf-hero__pkg-card">
            <p className="sf-hero__pkg-label">Selected package</p>
            <p className="sf-hero__pkg-name">{selectedPackage?.label}</p>
            <p className="sf-hero__pkg-price">KSH {selectedPackage?.price?.toLocaleString()}</p>
            <p className="sf-hero__pkg-desc">{selectedPackage?.description}</p>
            {/* package switcher — always visible here */}
            <div className="sf-pkg-switcher">
              {packages.map((pkg) => (
                <button
                  key={pkg.key}
                  type="button"
                  className={`sf-pkg-pill${selectedPackageKey === pkg.key ? ' active' : ''}`}
                  onClick={() => setSelectedPackageKey(pkg.key)}
                >
                  {pkg.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* ── step rail ── */}
        <div className="sf-step-rail" aria-label="Form sections">
          <div className="sf-step-rail__track">
            {steps.map((s) => (
              <div key={s.num} className="sf-step-rail__item">
                <span className="sf-step-rail__num">{s.num}</span>
                <span className="sf-step-rail__lbl">{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        {submitted ? (
          <div className="sf-success">
            <div className="sf-success__icon" aria-hidden="true">✓</div>
            <h2 className="sf-success__title">Request received</h2>
            <p className="sf-success__body">
              We'll review your brief and reach out within 24 hours with a tailored proposal.
            </p>
            <button
              type="button"
              onClick={() => navigate('/services')}
              className="sf-btn sf-btn--ghost"
            >
              ← Back to Services
            </button>
          </div>
        ) : (
          <form className="sf-form" onSubmit={handleSubmit} noValidate ref={formRef}>

            {/* ── 01 Business ── */}
            <section className="sf-card">
              <div className="sf-card__head">
                <span className="sf-badge">01</span>
                <div>
                  <h2 className="sf-card__title">Business Information</h2>
                  <p className="sf-card__sub">Tell us about your company and what you offer.</p>
                </div>
              </div>
              <div className="sf-grid-2">
                <label className="sf-field">
                  <span className="sf-field__label">Company name</span>
                  <input
                    className="sf-input"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Your business name"
                    required
                  />
                </label>
                <label className="sf-field">
                  <span className="sf-field__label">Industry / sector</span>
                  <input
                    className="sf-input"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="Hotel, clinic, school, shop…"
                    required
                  />
                </label>
              </div>
              <label className="sf-field sf-field--full">
                <span className="sf-field__label">Describe your business and what you sell</span>
                <textarea
                  className="sf-input sf-input--textarea"
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  placeholder="Briefly describe your business."
                  rows={4}
                  required
                />
              </label>
            </section>

            {/* ── 02 Your Need ── */}
            <section className="sf-card">
              <div className="sf-card__head">
                <span className="sf-badge">02</span>
                <div>
                  <h2 className="sf-card__title">Your Need</h2>
                  <p className="sf-card__sub">Share your primary goal and the solution you need today.</p>
                </div>
              </div>
              <label className="sf-field sf-field--full">
                <span className="sf-field__label">What do you need right now?</span>
                <textarea
                  className="sf-input sf-input--textarea"
                  value={needs}
                  onChange={(e) => setNeeds(e.target.value)}
                  placeholder="Website, booking system, mobile app, software, automation, marketing…"
                  rows={4}
                  required
                />
              </label>
              <div className="sf-grid-2">
                <label className="sf-field">
                  <span className="sf-field__label">Main goal</span>
                  <select className="sf-input sf-input--select" value={mainGoal} onChange={(e) => setMainGoal(e.target.value)} required>
                    <option value="">Select a goal</option>
                    <option>Launch a new platform</option>
                    <option>Improve an existing system</option>
                    <option>Increase automation and efficiency</option>
                    <option>Improve customer experience</option>
                  </select>
                </label>
                <label className="sf-field">
                  <span className="sf-field__label">Do you already have a website?</span>
                  <select className="sf-input sf-input--select" value={hasWebsite} onChange={(e) => setHasWebsite(e.target.value)} required>
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </label>
              </div>
              {hasWebsite === 'Yes' && (
                <>
                  <label className="sf-field sf-field--full">
                    <span className="sf-field__label">Current website link</span>
                    <input
                      className="sf-input"
                      value={websiteLink}
                      onChange={(e) => setWebsiteLink(e.target.value)}
                      placeholder="https://example.com"
                      required={hasWebsite === 'Yes'}
                    />
                  </label>
                  <label className="sf-field sf-field--full">
                    <span className="sf-field__label">What is not working?</span>
                    <textarea
                      className="sf-input sf-input--textarea"
                      value={websiteIssue}
                      onChange={(e) => setWebsiteIssue(e.target.value)}
                      placeholder="What needs fixing or improving?"
                      rows={3}
                      required={hasWebsite === 'Yes'}
                    />
                  </label>
                </>
              )}
            </section>

            {/* ── 03 Add-ons ── */}
            <section className="sf-card">
              <div className="sf-card__head">
                <span className="sf-badge">03</span>
                <div>
                  <h2 className="sf-card__title">Add-ons you may need</h2>
                  <p className="sf-card__sub">Select extra features to include in your quote.</p>
                </div>
              </div>
              <div className="sf-addon-grid">
                {addons.map((addon) => (
                  <label
                    key={addon.key}
                    className={`sf-addon-card${selectedAddons[addon.key] ? ' selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={!!selectedAddons[addon.key]}
                      onChange={() => toggleAddon(addon.key)}
                      className="sf-addon-card__check"
                    />
                    <span className="sf-addon-card__tick" aria-hidden="true">
                      {selectedAddons[addon.key] ? '✓' : '+'}
                    </span>
                    <div className="sf-addon-card__body">
                      <strong className="sf-addon-card__name">{addon.label}</strong>
                      <p className="sf-addon-card__desc">{addon.description}</p>
                    </div>
                    <span className="sf-addon-card__price">KSH {addon.price.toLocaleString()}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* ── 04 Timeline & Budget ── */}
            <section className="sf-card">
              <div className="sf-card__head">
                <span className="sf-badge">04</span>
                <div>
                  <h2 className="sf-card__title">Timeline &amp; Budget</h2>
                  <p className="sf-card__sub">When do you need this live, and what's your budget range?</p>
                </div>
              </div>
              <div className="sf-grid-2">
                <label className="sf-field">
                  <span className="sf-field__label">Expected timeline</span>
                  <select className="sf-input sf-input--select" value={timeline} onChange={(e) => setTimeline(e.target.value)}>
                    <option>Immediately</option>
                    <option>Within 1 month</option>
                    <option>1–3 months</option>
                    <option>3–6 months</option>
                    <option>Flexible</option>
                  </select>
                </label>
                <label className="sf-field">
                  <span className="sf-field__label">Estimated budget</span>
                  <select className="sf-input sf-input--select" value={budget} onChange={(e) => setBudget(e.target.value)} required>
                    <option value="">Select</option>
                    <option value="50-150">KSH 50,000 – 150,000</option>
                    <option value="150-350">KSH 150,000 – 350,000</option>
                    <option value="350-700">KSH 350,000 – 700,000</option>
                    <option value="700+">KSH 700,000+</option>
                  </select>
                </label>
              </div>
            </section>

            {/* ── 05 Location ── */}
            <section className="sf-card">
              <div className="sf-card__head">
                <span className="sf-badge">05</span>
                <div>
                  <h2 className="sf-card__title">Location &amp; Communication</h2>
                  <p className="sf-card__sub">Where will the project operate, and how should we reach you?</p>
                </div>
              </div>
              <div className="sf-grid-2">
                <label className="sf-field">
                  <span className="sf-field__label">City of operation</span>
                  <input
                    className="sf-input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Nairobi, Mombasa, Kisumu…"
                    required
                  />
                </label>
                <label className="sf-field">
                  <span className="sf-field__label">Preferred channel</span>
                  <select className="sf-input sf-input--select" value={contactChannel} onChange={(e) => setContactChannel(e.target.value)} required>
                    <option>WhatsApp</option>
                    <option>Email</option>
                    <option>Phone call</option>
                  </select>
                </label>
              </div>
            </section>

            {/* ── 06 Contact ── */}
            <section className="sf-card">
              <div className="sf-card__head">
                <span className="sf-badge">06</span>
                <div>
                  <h2 className="sf-card__title">Your Details</h2>
                  <p className="sf-card__sub">How do we send you the final quote?</p>
                </div>
              </div>
              <div className="sf-grid-2">
                <label className="sf-field">
                  <span className="sf-field__label">Full name</span>
                  <input
                    className="sf-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className="sf-field">
                  <span className="sf-field__label">WhatsApp number</span>
                  <input
                    className="sf-input"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+254 700 000 000"
                    required
                  />
                </label>
              </div>
              <label className="sf-field sf-field--full">
                <span className="sf-field__label">Email address</span>
                <input
                  className="sf-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  type="email"
                  required
                />
              </label>
            </section>

            {/* ── submit bar ── */}
            <div className="sf-submit-bar">
              <div className="sf-submit-bar__copy">
                <p className="sf-submit-bar__title">Ready to send your brief?</p>
                <p className="sf-submit-bar__sub">
                  We'll prepare a tailored proposal for <strong>{selectedPackage?.label}</strong> within 24 hours.
                </p>
              </div>
              <div className="sf-submit-bar__actions">
                <button type="submit" className="sf-btn sf-btn--primary">
                  <img src={sendIcon} alt="Send icon" className="sf-btn__icon" />
                  Click to Send
                </button>
                <button type="button" className="sf-btn sf-btn--secondary" onClick={handleEmailSend}>
                  <img src={mailIcon} alt="Email icon" className="sf-btn__icon" />
                  Send by email instead
                </button>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="sf-btn sf-btn--tertiary">
                  <img src={communicationIcon} alt="Communication icon" className="sf-btn__icon" />
                  Talk to Us Now
                </a>
              </div>
            </div>

          </form>
        )}
      </div>
    </main>
  );
}
