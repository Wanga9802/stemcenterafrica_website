import { Link } from 'react-router-dom'
import '../../Styles/SupportSection.css'
import SupportCarousel from './SupportCarousel'
import kitImage from '../../assets/wostemt.JPG'
import codingImage from '../../assets/inclusive.jpg'
import schoolImage from '../../assets/SCHOOLS.JPG'
import teacherImage from '../../assets/problem.jpg'
import connectImage from '../../assets/wostemt.JPG'

const tiers = [
  {
    id: 1,
    amount: '$50',
    tag: 'STEM Materials',
    tagColor: '#FF4D9E',
    description: 'Provides STEM learning materials for hands-on activities.',
    image: kitImage,
  },
  {
    id: 2,
    amount: '$100',
    tag: 'Coding & Robotics',
    tagColor: '#FF4D9E',
    description: 'Supports coding and robotics experiences for students.',
    image: codingImage,
  },
  {
    id: 3,
    amount: '$200',
    tag: 'School Partnerships',
    tagColor: '#FF4D9E',
    description: 'Helps establish STEM opportunities in underserved schools.',
    image: schoolImage,
  },
  {
    id: 4,
    amount: '$1,000',
    tag: 'Teacher Training',
    tagColor: '#FF4D9E',
    description: 'Supports teacher training and sustainable STEM programs.',
    image: teacherImage,
  },
]

function SupportSection() {
  return (
    <section className="supp-section">
      <div className="supp-container">
        <div className="supp-left">
          <h2 className="supp-title">Your Support Creates Opportunity</h2>
          <SupportCarousel tiers={tiers} />
        </div>

        <div className="supp-right">
          {/* SVG clip-path definition — invisible, just supplies the curve shape */}
          <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
            <defs>
              <clipPath id="suppWaveClip" clipPathUnits="objectBoundingBox">
                <path d="M0,0 H1 V0.62 C0.8,0.78 0.55,0.85 0.3,0.7 C0.15,0.6 0.05,0.55 0,0.5 Z" />
              </clipPath>
            </defs>
          </svg>

          <div className="supp-right-image">
            <img src={connectImage} alt="" />
          </div>

          <div className="supp-right-glow" aria-hidden="true" />

          <div className="supp-right-content">

            <h3 className="supp-connect-title">Stay Connected</h3>
            <p className="supp-connect-text">
              Get the latest updates, events, and opportunities.
            </p>

            <Link to="/join" className="supp-subscribe-btn">
              Subscribe
            </Link>

            <div className="supp-social-row">
              <a href="#" aria-label="Facebook" className="supp-social-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff"><path d="M22 12a10 10 0 10-11.5 9.9v-7H7.9V12h2.6V9.8c0-2.6 1.5-4 3.9-4 1.1 0 2.3.2 2.3.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6V12h2.9l-.5 2.9h-2.4v7A10 10 0 0022 12z"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className="supp-social-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff"><path d="M22 5.9c-.7.3-1.5.6-2.4.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 00-7 3.7A11.6 11.6 0 013 4.9a4.1 4.1 0 001.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.7 3.3 4a4.2 4.2 0 01-1.9.1 4.1 4.1 0 003.8 2.9A8.3 8.3 0 012 18.6a11.6 11.6 0 006.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="supp-social-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17.2" cy="6.8" r="1"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="supp-social-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff"><path d="M23 12s0-3.6-.5-5.2a3 3 0 00-2.1-2.1C18.7 4 12 4 12 4s-6.7 0-8.4.7a3 3 0 00-2.1 2.1C1 8.4 1 12 1 12s0 3.6.5 5.2a3 3 0 002.1 2.1C5.3 20 12 20 12 20s6.7 0 8.4-.7a3 3 0 002.1-2.1C23 15.6 23 12 23 12z"/><path d="M9.8 15.5V8.5l6 3.5-6 3.5z" fill="#3d0f2e"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SupportSection