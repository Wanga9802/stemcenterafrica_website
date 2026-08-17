import { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import '../Styles/PartnerForm.css';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const INTERNAL_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_INTERNAL;
const CONFIRMATION_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRMATION;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ORGANIZATION_TYPES = [
  'Academic Institution (School, University, Research)',
  'Corporate / Private Sector Entity',
  'Non-Profit Organization (NGO / Foundation)',
  'Government Agency / Policy Maker',
  'Individual Mentor / STEM Professional',
];

const COLLABORATION_AREAS = [
  {
    label: 'Innovation Hub & Emerging Tech (AI, Robotics, Programming)',
    description:
      'Partner to expand our high-tech projects, including Arduino, virtual robotics, machine learning, and hardware/software prototyping labs.',
  },
  {
    label: "WoSTEM Program (Women in STEM & Girls' Mentorship)",
    description:
      'Support weekend mentoring sessions, cohort-based tech tracks, and specialized projects designed to close the gender gap for young women in technical fields.',
  },
  {
    label: 'CBC School Partnerships & Mobile Outreach',
    description:
      'Collaborate on taking STEM kits, physical computing tools, and tinkering workshops directly to under-resourced schools and rural communities.',
  },
  {
    label: 'SCA STEM Educators (Teacher Professional Development)',
    description:
      "Sponsor or co-develop training certifications that equip local teachers to deliver project-based and computational thinking lessons under Kenya's Competency-Based Curriculum.",
  },
  {
    label: 'Resource Sponsorship & Infrastructure Growth',
    description:
      'Provide vital support through physical hardware donations (3D printers, laptop fleets, maker tools) or financial funding to establish new Innovation Centers.',
  },
];

const PartnerForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    organizationName: '',
    email: '',
    phone: '',
    website: '',
    organizationTypes: [],
    collaborationAreas: [],
    collaborationDetails: '',
    consent: false,
  });

  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxGroup = (field, value) => {
    setFormData((prev) => {
      const current = prev[field];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [field]: next };
    });
  };

  const handleConsentChange = (e) => {
    setFormData((prev) => ({ ...prev, consent: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.consent) {
      setStatus('error');
      return;
    }

    setStatus('sending');

    const messageBody = [
      'A new partnership inquiry has been received.',
      '',
      'Contact Information:',
      `Name: ${formData.fullName}`,
      `Job Title: ${formData.jobTitle}`,
      `Organization: ${formData.organizationName}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Website/LinkedIn: ${formData.website || 'Not provided'}`,
      '',
      'Organization Type:',
      formData.organizationTypes.length
        ? formData.organizationTypes.join(', ')
        : 'Not specified',
      '',
      'Areas of Collaboration:',
      formData.collaborationAreas.length
        ? formData.collaborationAreas.join(', ')
        : 'Not specified',
      '',
      'Collaboration Vision:',
      formData.collaborationDetails || 'No additional details provided.',
    ].join('\n');

    const emailBody = [
      `Thank you for your interest in partnering with STEM Center Africa! We've received your proposal on behalf of ${formData.organizationName} and our partnerships team will review it shortly.`,
      '',
      "We'll be in touch within a few business days to discuss next steps.",
    ].join('\n');

    const templateParams = {
      form_title: `New Partnership Inquiry — ${formData.organizationName}`,
      message_body: messageBody,
      reply_to: formData.email,
      recipient_name: formData.fullName,
      email_subject: 'Thank you for your partnership interest — STEM Center Africa',
      email_body: emailBody,
    };

    try {
      await Promise.all([
        emailjs.send(SERVICE_ID, INTERNAL_TEMPLATE_ID, templateParams, PUBLIC_KEY),
        emailjs.send(SERVICE_ID, CONFIRMATION_TEMPLATE_ID, templateParams, PUBLIC_KEY),
      ]);
      setStatus('success');
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section className="pf-wrapper">
        <div className="pf-success">
          <i className="bi bi-check-circle-fill pf-success__icon"></i>
          <h2>Proposal Received!</h2>
          <p>
            Thank you, {formData.fullName.split(' ')[0]}! We've sent a confirmation
            to <strong>{formData.email}</strong>. Our partnerships team will be in
            touch within a few business days.
          </p>
          <Link to="/" className="pf-btn pf-btn--solid">
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pf-wrapper">
      <form className="pf-form" onSubmit={handleSubmit}>
        <h2 className="pf-title">Partner With Us</h2>
        <p className="pf-subtitle">
          Thank you for your interest in partnering with STEM Center Africa (SCA).
          Together, we can inspire the next generation of scientists, tech leaders,
          and engineers across the continent. Please complete this form to help us
          understand your alignment.
        </p>

        {/* ── Section 1: Contact Information ── */}
        <div className="pf-section">
          <h3 className="pf-section__title">1. Contact Information</h3>

          <div className="pf-field">
            <label htmlFor="fullName">Full Name / Primary Contact</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="form-control pf-input"
            />
          </div>

          <div className="pf-field">
            <label htmlFor="jobTitle">Job Title / Role</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              required
              value={formData.jobTitle}
              onChange={handleChange}
              className="form-control pf-input"
            />
          </div>

          <div className="pf-field">
            <label htmlFor="organizationName">Organization / Institution Name</label>
            <input
              type="text"
              id="organizationName"
              name="organizationName"
              required
              value={formData.organizationName}
              onChange={handleChange}
              className="form-control pf-input"
            />
          </div>

          <div className="pf-row">
            <div className="pf-field">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-control pf-input"
                placeholder="you@example.com"
              />
            </div>

            <div className="pf-field">
              <label htmlFor="phone">Phone Number (with Country Code)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="form-control pf-input"
                placeholder="+254 7XX XXX XXX"
              />
            </div>
          </div>

          <div className="pf-field">
            <label htmlFor="website">Website / LinkedIn Profile URL</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="form-control pf-input"
              placeholder="https://"
            />
          </div>
        </div>

        {/* ── Section 2: Organization Type ── */}
        <div className="pf-section">
          <h3 className="pf-section__title">2. Organization Type</h3>
          <p className="pf-section__hint">Select all that apply</p>

          <div className="pf-checkbox-grid">
            {ORGANIZATION_TYPES.map((type) => (
              <label className="pf-checkbox" key={type}>
                <input
                  type="checkbox"
                  checked={formData.organizationTypes.includes(type)}
                  onChange={() => handleCheckboxGroup('organizationTypes', type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ── Section 3: Areas of Collaboration ── */}
        <div className="pf-section">
          <h3 className="pf-section__title">3. Broad Areas of Collaboration</h3>
          <p className="pf-section__hint">Select one or more</p>

          <div className="pf-checkbox-list">
            {COLLABORATION_AREAS.map((area) => (
              <label className="pf-checkbox pf-checkbox--block" key={area.label}>
                <input
                  type="checkbox"
                  checked={formData.collaborationAreas.includes(area.label)}
                  onChange={() => handleCheckboxGroup('collaborationAreas', area.label)}
                />
                <span>
                  <span className="pf-checkbox__label">{area.label}</span>
                  <span className="pf-checkbox__desc">{area.description}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* ── Section 4: Collaboration Details ── */}
        <div className="pf-section">
          <h3 className="pf-section__title">4. Collaboration Details</h3>
          <div className="pf-field">
            <label htmlFor="collaborationDetails">
              Briefly describe your vision for this partnership or any specific
              projects you would like to initiate with us
            </label>
            <textarea
              id="collaborationDetails"
              name="collaborationDetails"
              rows="5"
              value={formData.collaborationDetails}
              onChange={handleChange}
              className="form-control pf-input"
              placeholder="Tell us about your vision..."
            />
          </div>
        </div>

        {/* ── Consent ── */}
        <label className="pf-checkbox pf-checkbox--consent">
          <input
            type="checkbox"
            checked={formData.consent}
            onChange={handleConsentChange}
            required
          />
          <span>
            <strong>I agree:</strong> By submitting this form, I agree to allow
            STEM Center Africa to store my contact details and reach out
            regarding this partnership proposal.
          </span>
        </label>

        {status === 'error' && (
          <p className="pf-error">
            {formData.consent
              ? 'Something went wrong sending your proposal. Please try again or reach us on WhatsApp.'
              : 'Please agree to the terms above before submitting.'}
          </p>
        )}

        <button
          type="submit"
          className="pf-btn pf-btn--solid pf-submit"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Submitting...' : 'Submit Partnership Proposal'}
        </button>
      </form>
    </section>
  );
};

export default PartnerForm;
