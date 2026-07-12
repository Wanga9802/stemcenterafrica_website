import { useEffect, useRef } from "react";
import '../../Styles/Mapsection.css';
const contactDetails = [
  {
    icon: "bi bi-geo-alt-fill",
    label: "Address",
    value: "PO BOX 40222,Oyugis,kenya",
    sub: null,
  },
  {
    icon: "bi bi-alarm",
    label: "Open Hours",
    value: "sun – Thur: 8am – 6pm",
    sub: null,
  },
  {
    icon: "bi bi-telephone-fill",
    label: "Contact",
    value: "+17325068913/+254790753694",
    sub: null,
  },
  {
    icon: "bi bi-envelope",
    label: "Email",
    value: "info@stemcenter-africa.com",
    sub: null,
  },
];

// Replace this src with your actual Google Maps embed URL:
// Go to maps.google.com → search your address → Share → Embed a map → copy the src
const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31917.288057281407!2d34.71610993507245!3d-0.5087976026303265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182b279b6ab5af51%3A0x8ddd1a4ab4fffa75!2sOyugis!5e0!3m2!1sen!2ske!4v1779331911066!5m2!1sen!2ske";

const DIRECTIONS_URL = "https://maps.google.com/?q=STEM+Center+Africa+Nairobi";

export default function MapSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-animate]").forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
              }, i * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
     

      <section id="map-section" className="map-section" ref={sectionRef} aria-labelledby="map-heading">
        <div className="map-inner">
          <div className="map-header">
            <div data-animate>
            </div>
            <h2 className="map-title" id="map-heading" data-animate>
              Visit STEM Center Africa
            </h2>
          
          </div>

          <div className="map-layout">
            <div className="map-frame-wrapper" data-animate>
              <iframe
                src={MAP_EMBED_SRC}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="STEM Center Africa location on Google Maps"
              />
            </div>

            <div className="info-cards">
              {contactDetails.map((item) => (
                <div className="info-card" key={item.label} data-animate>
                  <div className="info-icon" aria-hidden="true">
                    {typeof item.icon === 'string' && item.icon.startsWith('bi') ? (
                      <i className={item.icon} aria-hidden="true" />
                    ) : (
                      <span>{item.icon}</span>
                    )}
                  </div>
                  <div>
                    <p className="info-label">{item.label}</p>
                    <p className="info-value">{item.value}</p>
                    {item.sub && <p className="info-sub">{item.sub}</p>}
                  </div>
                </div>
              ))}

              <a
                className="directions-btn"
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-animate
              >
                <i className="bi bi-compass-fill"></i> Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
