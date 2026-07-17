import { Link } from 'react-router-dom'
import '../../Styles/JoinBanner.css'

function JoinBanner() {
  return (
    <section className="joinb-section">
      <div className="joinb-container">
        <div className="joinb-card">
          <div className="joinb-text">
            <span className="joinb-eyebrow">Community</span>
            <h2 className="joinb-title">Join the STEM Community of Innovators and Tech Leaders</h2>
            <p className="joinb-subtitle">
              Get learning resources, event invites, and updates — whether you're just starting out or already deep in tech.
            </p>
          </div>
          <Link to="/join" className="joinb-btn">Join Now</Link>
        </div>
      </div>
    </section>
  )
}

export default JoinBanner
