import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import programs from '../data/Programs';
import kenyaCounties from '../data/kenyaCounties';
import '../Styles/BookOutreach.css';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const INTERNAL_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_INTERNAL;
const CONFIRMATION_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRMATION;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const FIXED_PRICE_COUNTY = 'Homa Bay';
const FIXED_PRICE_AMOUNT = 'KES 10,000';
const OTHER_COUNTY_ESTIMATED_AMOUNT = 'KES 20,000 - KES 30,000';

const initialFormData = {
  schoolName: '',
  contactName: '',
  role: '',
  email: '',
  phone: '',
  preferredDate: '',
  studentCount: '',
  gradeLevel: '',
  programInterest: '',
  county: '',
};

const BookOutreach = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const estimateCopy = useMemo(() => {
    if (formData.county === FIXED_PRICE_COUNTY) {
      return {
        label: 'Estimated travel fee',
        value: FIXED_PRICE_AMOUNT,
        note: 'Estimated price for Homa Bay visits.',
      };
    }

    return {
      label: 'Estimated travel fee',
      value: OTHER_COUNTY_ESTIMATED_AMOUNT,
      note:
        'Estimated travel cost for locations outside Homa Bay ranges from KES 20,000 to KES 30,000.',
    };
  }, [formData.county]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.schoolName.trim() || !formData.contactName.trim() || !formData.email.trim() || !formData.phone.trim()) {
          return 'Please complete the organization details before continuing.';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          return 'Please enter a valid email address.';
        }
        return '';
      case 2:
        if (!formData.preferredDate || !formData.studentCount || !formData.gradeLevel || !formData.programInterest) {
          return 'Please complete all visit details before continuing.';
        }
        return '';
      case 3:
        if (!formData.county) {
          return 'Please select a county before submitting your request.';
        }
        return '';
      default:
        return '';
    }
  };

  const handleNext = () => {
    const validationMessage = validateStep();

    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setError('');
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationMessage = validateStep();
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setStatus('sending');
    setError('');

    const needsManualQuote = formData.county !== FIXED_PRICE_COUNTY;
    const pricingOutcome = formData.county === FIXED_PRICE_COUNTY
      ? `Estimated travel fee: ${FIXED_PRICE_AMOUNT}`
      : `Estimated travel fee: ${OTHER_COUNTY_ESTIMATED_AMOUNT}`;

    const messageBody = [
      'A new school visit request has been received.',
      '',
      'Organization Details:',
      `School / Organization Name: ${formData.schoolName}`,
      `Contact Person Name: ${formData.contactName}`,
      `Role / Title: ${formData.role || 'Not provided'}`,
      `Email Address: ${formData.email}`,
      `Phone Number: ${formData.phone}`,
      '',
      'Visit Details:',
      `Preferred Date: ${formData.preferredDate}`,
      `Approximate Number of Students: ${formData.studentCount}`,
      `Grade Level / Age Range: ${formData.gradeLevel}`,
      `Program Interest: ${formData.programInterest}`,
      '',
      'Location & Pricing Outcome:',
      `County: ${formData.county}`,
      `Pricing Outcome: ${pricingOutcome}`,
    ].join('\n');

    const emailBody = [
      `Thank you for requesting a STEM Center Africa visit for ${formData.schoolName}.`,
      '',
      'We have received your request and our team will review it within two business days.',
      '',
      `Preferred date: ${formData.preferredDate}`,
      `Estimated cost outcome: ${pricingOutcome}`,
      '',
      'Estimated travel cost for counties outside Homa Bay is KES 20,000 - KES 30,000.',
    ].join('\n');

    const templateParams = {
      form_title: `New School Visit Request — ${formData.schoolName}`,
      message_body: messageBody,
      reply_to: formData.email,
      recipient_name: formData.contactName,
      email_subject: 'New school visit request — STEM Center Africa',
      email_body: emailBody,
    };

    try {
      await Promise.all([
        emailjs.send(SERVICE_ID, INTERNAL_TEMPLATE_ID, templateParams, PUBLIC_KEY),
        emailjs.send(SERVICE_ID, CONFIRMATION_TEMPLATE_ID, templateParams, PUBLIC_KEY),
      ]);

      setSubmittedData({
        ...formData,
        pricingOutcome,
        needsManualQuote,
      });
      setStatus('success');
      setError('');
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setError('Something went wrong while sending your request. Please try again in a moment.');
    }
  };

  if (status === 'success' && submittedData) {
    return (
      <section className="bo-wrapper">
        <div className="bo-success">
          <div className="bo-success__mark">✓</div>
          <h2>Request received!</h2>
          <p>
            We have received your visit request for <strong>{submittedData.preferredDate}</strong>.
            Our team will review it and reach out within 2 business days to confirm availability and,
            if applicable, finalize the travel fee.
          </p>
          <Link to="/" className="bo-btn bo-btn--primary">
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bo-wrapper">
      <div className="bo-card">
        <div className="bo-header">
          <p className="bo-eyebrow">
            Bring coding, robotics, electronics, design and science experiences directly to schools and communities.
          </p>
          <h1 className="bo-title">Book your visit</h1>
          <div className="bo-stepper" aria-label="Request steps">
            {[1, 2, 3].map((step) => (
              <span
                key={step}
                className={[
                  'bo-stepper__item',
                  currentStep === step ? 'bo-stepper__item--active' : '',
                  currentStep > step ? 'bo-stepper__item--done' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              />
            ))}
          </div>
        </div>

        <div className="bo-body">
          <form className="bo-form" onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="bo-section">
                <div className="bo-grid">
                  <div className="bo-field">
                    <label htmlFor="schoolName">School / organization name</label>
                    <input
                      className="bo-input"
                      id="schoolName"
                      name="schoolName"
                      type="text"
                      value={formData.schoolName}
                      onChange={handleChange}
                      placeholder="e.g. Nairobi Girls Secondary School"
                      required
                    />
                  </div>

                  <div className="bo-field">
                    <label htmlFor="contactName">Contact person name</label>
                    <input
                      className="bo-input"
                      id="contactName"
                      name="contactName"
                      type="text"
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="Jane Wanjiru"
                      required
                    />
                  </div>
                </div>

                <div className="bo-grid">
                  <div className="bo-field">
                    <label htmlFor="role">Role / title</label>
                    <input
                      className="bo-input"
                      id="role"
                      name="role"
                      type="text"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="Head of STEM Dept"
                    />
                  </div>

                  <div className="bo-field">
                    <label htmlFor="email">Email address</label>
                    <input
                      className="bo-input"
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="bo-field">
                  <label htmlFor="phone">Phone number</label>
                  <input
                    className="bo-input"
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+254 7XX XXX XXX"
                    required
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bo-section">
                <div className="bo-grid">
                  <div className="bo-field">
                    <label htmlFor="preferredDate">Preferred date</label>
                    <input
                      className="bo-input"
                      id="preferredDate"
                      name="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="bo-field">
                    <label htmlFor="studentCount">Approximate number of students</label>
                    <input
                      className="bo-input"
                      id="studentCount"
                      name="studentCount"
                      type="number"
                      min="1"
                      value={formData.studentCount}
                      onChange={handleChange}
                      placeholder="120"
                      required
                    />
                  </div>
                </div>

                <div className="bo-grid">
                  <div className="bo-field">
                    <label htmlFor="gradeLevel">Grade level / age range</label>
                    <input
                      className="bo-input"
                      id="gradeLevel"
                      name="gradeLevel"
                      type="text"
                      value={formData.gradeLevel}
                      onChange={handleChange}
                      placeholder="Grades 7-10"
                      required
                    />
                  </div>

                  <div className="bo-field">
                    <label htmlFor="programInterest">Program interest</label>
                    <select
                      className="bo-select"
                      id="programInterest"
                      name="programInterest"
                      value={formData.programInterest}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a program</option>
                      {programs.map((program) => (
                        <option key={program.id} value={program.title}>
                          {program.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bo-section">
                <div className="bo-field">
                  <label htmlFor="county">County</label>
                  <select
                    className="bo-select"
                    id="county"
                    name="county"
                    value={formData.county}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a county</option>
                    {kenyaCounties.map((county) => (
                      <option key={county} value={county}>
                        {county}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bo-estimate">
                  <strong>{estimateCopy.label}</strong>
                  <p>{estimateCopy.value}</p>
                  <p>{estimateCopy.note}</p>
                </div>

                <p className="bo-note">
                  The request is not a confirmed booking. After submitting, our team will review the
                  request and contact you within 1 business days.
                </p>
              </div>
            )}

            {error && <p className="bo-error">{error}</p>}

            <div className="bo-footer">
              {currentStep > 1 ? (
                <button
                  type="button"
                  className="bo-btn bo-btn--secondary"
                  onClick={() => {
                    setError('');
                    setCurrentStep((prev) => Math.max(prev - 1, 1));
                  }}
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <button type="button" className="bo-btn bo-btn--primary" onClick={handleNext}>
                  Continue
                </button>
              ) : (
                <button type="submit" className="bo-btn bo-btn--primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Submitting...' : 'Submit Request'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookOutreach;
