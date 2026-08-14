import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import programs from '../data/programs'; // adjust path to match your project
import '../../Styles/EnrollmentForm.css';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const INTERNAL_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_INTERNAL;
const CONFIRMATION_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRMATION;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const EnrollmentForm = () => {
  const [searchParams] = useSearchParams();
  const urlProgram = searchParams.get('program');
  const urlFormat = searchParams.get('format');

  const formatOptions = urlFormat
    ? urlFormat.split(',').map((f) => f.trim())
    : [];
  const isMultiFormat = formatOptions.length > 1;

  const [formData, setFormData] = useState({
    program: urlProgram || '',
    format: !isMultiFormat ? (formatOptions[0] || '') : '',
    fullName: '',
    email: '',
    phone: '',
    age: '',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const templateParams = {
      program_name: formData.program,
      format: formData.format,
      student_name: formData.fullName,
      student_email: formData.email,
      student_phone: formData.phone,
      student_age: formData.age,
      message: formData.message || 'No additional message provided.',
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
      <section className="ef-wrapper">
        <div className="ef-success">
          <i className="bi bi-check-circle-fill ef-success__icon"></i>
          <h2>Application Received!</h2>
          <p>
            Thank you, {formData.fullName.split(' ')[0]}! We've sent a confirmation
            to <strong>{formData.email}</strong>. Our team will be in touch within
            a few business days.
          </p>
          <Link to="/programs" className="ef-btn ef-btn--solid">
            Back to Programs
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="ef-wrapper">
      <form className="ef-form" onSubmit={handleSubmit}>
        <h2 className="ef-title">Program Enrollment</h2>
        <p className="ef-subtitle">
          Fill in your details below and our team will reach out to confirm your spot.
        </p>

        {/* Program field */}
        <div className="ef-field">
          <label htmlFor="program">Program</label>
          {urlProgram ? (
            <input
              type="text"
              id="program"
              value={formData.program}
              disabled
              className="ef-input ef-input--readonly"
            />
          ) : (
            <select
              id="program"
              name="program"
              required
              value={formData.program}
              onChange={handleChange}
              className="ef-input"
            >
              <option value="" disabled>Select a program</option>
              {programs.map((p) => (
                <option key={p.id} value={p.title}>{p.title}</option>
              ))}
            </select>
          )}
        </div>

        {/* Format field */}
        <div className="ef-field">
          <label htmlFor="format">Format</label>
          {isMultiFormat ? (
            <select
              id="format"
              name="format"
              required
              value={formData.format}
              onChange={handleChange}
              className="ef-input"
            >
              <option value="" disabled>Select a format</option>
              {formatOptions.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              id="format"
              value={formData.format}
              disabled
              className="ef-input ef-input--readonly"
            />
          )}
        </div>

        <div className="ef-field">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="ef-input"
            placeholder="Jane Wanjiru"
          />
        </div>

        <div className="ef-row">
          <div className="ef-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="ef-input"
              placeholder="you@example.com"
            />
          </div>

          <div className="ef-field">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="ef-input"
              placeholder="07XX XXX XXX"
            />
          </div>
        </div>

        <div className="ef-field">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            required
            min="1"
            max="120"
            value={formData.age}
            onChange={handleChange}
            className="ef-input"
          />
        </div>

        <div className="ef-field">
          <label htmlFor="message">Message (optional)</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="ef-input"
            placeholder="Anything you'd like us to know?"
          />
        </div>

        {status === 'error' && (
          <p className="ef-error">
            Something went wrong sending your application. Please try again or reach us on WhatsApp.
          </p>
        )}

        <button
          type="submit"
          className="ef-btn ef-btn--solid ef-submit"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </section>
  );
};

export default EnrollmentForm;
