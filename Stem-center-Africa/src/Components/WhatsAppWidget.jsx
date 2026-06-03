import React from "react";
import "../Styles/WhatsAppWidget.css";

export default function WhatsAppWidget({ phone = "+254759924543", message = "Hi, I have a question!", bottom = "24px", right = "24px", defaultCountry = "+254", iconSrc = null }) {
  const normalizePhone = (input) => {
    if (!input) return "";
    const s = String(input).trim();
    // If already international with +, strip non-digits
    if (s.startsWith("+")) return s.replace(/\D/g, "");
    // If starts with 0, remove leading 0 and prepend default country code digits
    const digitsOnly = s.replace(/\D/g, "");
    if (s.startsWith("0")) {
      const cc = String(defaultCountry).replace(/\D/g, "");
      return cc + digitsOnly.substring(1);
    }
    // If looks like local (no + and doesn't start with 0), try prepending default country
    if (/^\d+$/.test(digitsOnly)) {
      const cc = String(defaultCountry).replace(/\D/g, "");
      // If it already contains country (long), just return
      if (digitsOnly.length > 9) return digitsOnly;
      return cc + digitsOnly;
    }
    return digitsOnly;
  };

  const cleanPhone = normalizePhone(phone);
  const href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="whatsapp-widget" style={{ bottom, right }}>
      <span className="whatsapp-text">Chat with us</span>
      <a
        className="whatsapp-link"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <span className="whatsapp-circle" aria-hidden="true">
          {iconSrc ? (
            <img src={iconSrc} alt="WhatsApp" className="whatsapp-icon" />
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path fill="#25D366" d="M20.52 3.48A11.86 11.86 0 0012 0C5.37 0 .01 5.37.01 12a11.7 11.7 0 001.74 6.09L0 24l5.99-1.55A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 21.5c-1.6 0-3.15-.4-4.5-1.15l-.32-.18-3.56.92.95-3.47-.2-.34A9.44 9.44 0 012.5 12c0-5.25 4.25-9.5 9.5-9.5S21.5 6.75 21.5 12 17.25 21.5 12 21.5z"/>
              <path fill="#fff" d="M17.03 14.87c-.28-.14-1.66-.82-1.92-.91-.26-.09-.45-.14-.64.14-.18.28-.7.91-.85 1.1-.16.17-.32.19-.6.06-.28-.14-1.18-.43-2.25-1.39-.84-.75-1.41-1.68-1.58-1.96-.17-.29-.02-.45.12-.59.12-.12.28-.32.42-.48.14-.16.19-.28.3-.47.1-.19.04-.36-.02-.5-.06-.14-.64-1.54-.88-2.13-.23-.56-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.44 0 1.43 1.03 2.82 1.17 3.02.14.2 2.03 3.1 4.92 4.28 0 0 .37.15.67.07.28-.07 1.66-.68 1.9-1.34.24-.66.24-1.22.17-1.34-.07-.12-.26-.19-.54-.32z"/>
            </svg>
          )}
        </span>
      </a>
    </div>
  );
}
