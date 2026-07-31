import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Footer.css'
import Logopic from '../assets/stem_africa.jpg';


function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState(null);



const socialLinks = [
  {
    label: "LinkedIn",
    abbr: "in",
    href: "https://www.linkedin.com/in/stem-center-africa",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    abbr: "fb",
    href: "https://www.facebook.com/STEMCenter20",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    abbr: "yt",
    href: "http://www.youtube.com/@stemcenterafrica6823",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
];

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Programs", event: "openProgramsDropdown" },
  { label: "Girls inSTEM", path: "/wostem" },
  { label: "STEM Educators", path: "/educators" },
  { label: "Innovation Hub", path: "/innovationhub" },
  { label: "Services", path: "/services" },
];

const programs = [
  { label: 'Computing & Software', id: 'computing-software' },
  { label: 'Robotics & Embedded Systems', id: 'robotics-embedded' },
  { label: 'Design & Fabrication', id: 'design-fabrication' },
  { label: 'Data, AI & Emerging Tech', id: 'data-ai' },
  { label: 'Science & Exploration', id: 'science-exploration' },
  { label: 'Creativity & Life Skills', id: 'creativity-life-skills' },
];


return (

<>

 <footer className="sca-footer">
        <div className="container">

          {/* ── Main grid ── */}
          <div className="footer-main">
            <div className="row g-5">

              {/* Brand column —*/}
              <div className="col-12 col-md-4 ">
                {/* Logo */}
                <div className="d-flex align-items-center gap-2 mb-3">
                  <img src={Logopic} alt="STEM Center Africa Logo" className="logo-box" />
                  <p className="brand-name">STEM Center Africa</p>
                </div>

                {/* Tagline badge */}
                <div className="tagline-badge">
                  <span className="tagline-dot" />
                  Promoting STEM Education in Africa &amp; Beyond
                </div>

                 {/* Description */}
                <p className="brand-desc mb-4">
                   Join us in shaping a brighter future for Africa and the world In partnesip with our partners & team.
                </p>
                

                {/* Socials */}
                <div className="d-flex flex-wrap gap-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="social-btn"
                      onMouseEnter={() => setHoveredSocial(s.label)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links — half on xs (stacked), auto on md */}
              <div className="col-5 col-md-2">
                <h4 className="col-heading">Quick Links</h4>
                <ul className="list-unstyled mb-0">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      {link.path ? (
                        <Link to={link.path} className="footer-link">
                          {link.label}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          className="footer-link footer-dropdown-btn"
                          onClick={() => {
                            if (typeof window !== 'undefined' && link.event) {
                              window.dispatchEvent(new CustomEvent(link.event, { detail: { mobile: false } }));
                            }
                          }}
                        >
                          {link.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Programs — half on xs, auto on md */}
              <div className="col-6 col-md-3">
                <h4 className="col-heading">Our Programs</h4>
                <ul className="list-unstyled mb-0">
                  {programs.map((prog) => (
                    <li key={prog.id}>
                      <button
                        type="button"
                        className="footer-link footer-dropdown-btn"
                        onClick={() => {
                          const isMobile = typeof window !== 'undefined' && window.innerWidth <= 991;
                          if (typeof window !== 'undefined') {
                            window.dispatchEvent(new CustomEvent('openProgramsDropdown', { detail: { mobile: isMobile, id: prog.id } }));
                          }
                        }}
                      >
                        <span className="prog-dot" />
                        {prog.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              

              {/* Contact — full on xs & md, auto on lg */}
              <div className="col-12 col-md-3">
                <h4 className="col-heading">Contact Us</h4>

                <div className="contact-row ">
                  <svg className="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  <span className="contact-text">Oyugis, Kenya &mdash; East Africa</span>
                </div>

                <div className="contact-row">
                  <svg className="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span className="contact-text">info@stemcenter-africa.com</span>
                </div>

                <div className="contact-row">
                  <svg className="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <span className="contact-text">+254790753694/+17325068913</span>
                </div>

                

              </div>
            </div>

          </div>

          <div className="footer-bottom">
            <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-2">
              <p className="copy-text">
                © 2026 STEM Center Africa. All rights reserved.
              </p>
            </div>
          </div>

        </div>
      </footer>

</>

)

}

export default Footer;


