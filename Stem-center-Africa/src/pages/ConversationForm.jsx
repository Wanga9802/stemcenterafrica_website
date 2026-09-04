import { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import '../Styles/ConversationForm.css';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const INTERNAL_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_INTERNAL;
const CONFIRMATION_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRMATION;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const CONTACT_EMAIL = 'info@stemcenter-africa.com';

export default function ConversationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  const handleChange = ({ target }) => {
    setFormData((previous) => ({ ...previous, [target.name]: target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');

    const messageBody = [
      'A new Services conversation request has been received.',
      '',
      'Contact Information:',
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      '',
      'Message:',
      formData.message,
    ].join('\n');

    const emailBody = [
      `Thank you for contacting STEM Center Africa, ${formData.name.split(' ')[0]}!`,
      '',
      "We've received your message and our team will review it shortly.",
      '',
      "We'll be in touch within a few business days.",
    ].join('\n');

    const templateParams = {
      form_title: `New Services Conversation — ${formData.name}`,
      message_body: messageBody,
      reply_to: formData.email,
      recipient_name: formData.name,
      email_subject: 'We received your message — STEM Center Africa',
      email_body: emailBody,
      to_email: CONTACT_EMAIL,
      recipient_email: CONTACT_EMAIL,
    };

    try {
      await Promise.all([
        emailjs.send(SERVICE_ID, INTERNAL_TEMPLATE_ID, templateParams, PUBLIC_KEY),
        emailjs.send(SERVICE_ID, CONFIRMATION_TEMPLATE_ID, templateParams, PUBLIC_KEY),
      ]);
      setStatus('success');
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section className="cf-wrapper">
        <div className="cf-success">
          <i className="bi bi-check-circle-fill cf-success__icon" aria-hidden="true"></i>
          <h2>Message Received!</h2>
          <p>
            Thank you, {formData.name.split(' ')[0]}! We&apos;ve sent a confirmation
            to <strong>{formData.email}</strong>. Our team will be in touch soon.
          </p>
          <Link to="/services" className="cf-btn cf-btn--solid">
            Back to Services
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cf-wrapper">
      <form className="cf-form" onSubmit={handleSubmit}>
        <h1 className="cf-title">Start a Conversation</h1>
        <p className="cf-subtitle">
          Tell us what you are working on and our team will get back to you.
        </p>

        <div className="cf-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="cf-input"
            autoComplete="name"
          />
        </div>

        <div className="cf-row">
          <div className="cf-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="cf-input"
              autoComplete="email"
            />
          </div>

          <div className="cf-field">
            <label htmlFor="phone">Phone Number (with Country Code)</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              pattern="\\+[0-9 ()-]{7,}"
              title="Enter a phone number starting with + and your country code"
              placeholder="+254 7XX XXX XXX"
              value={formData.phone}
              onChange={handleChange}
              className="cf-input"
              autoComplete="tel"
            />
          </div>
        </div>

        <div className="cf-field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows="6"
            value={formData.message}
            onChange={handleChange}
            className="cf-input"
            placeholder="Discuss the service you are interested in"
          />
        </div>

        {status === 'error' && (
          <p className="cf-error" role="alert">
            Something went wrong sending your message. Please try again or contact us directly.
          </p>
        )}

        <button type="submit" className="cf-btn cf-btn--solid cf-submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </section>
  );
}