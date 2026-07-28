import { Link } from 'react-router-dom'
import '../../Styles/PartnersJoinBanner.css'
import snapsImage from '../../assets/social.jpg'
import MoringaImage from '../../assets/deloitte.jpg'
import awsImage from '../../assets/aws.png'
import montImage from '../../assets/mont.png'
import stemPhoto from '../../assets/wostemf.JPG'

const partners = [
  { id: 1, image: snapsImage, alt: 'Snaps Logo', link: 'https://www.raspberrypi.org/', name: 'Snaps' },
  { id: 2, image: MoringaImage, alt: 'Moringa School', link: 'https://www.deloitte.com/ke/en.html', name: 'Moringa School' },
  { id: 4, image: awsImage, alt: 'AWS', link: 'https://aws.amazon.com', name: 'AWS' },
  { id: 5, image: montImage, alt: 'Mont', link: 'https://www.montclair.edu/', name: 'Mont' },
]

function PartnersJoinBanner() {
  return (
    <section className="pjcta-section">
      <div className="pjcta-container">
        <div className="pjcta-partners-col">
          <p className="pjcta-partners-heading">Our Partners</p>
          <div className="pjcta-partners-grid">
            {partners.map((p) => {
              return (
                <a
                  key={p.id}
                  href={p.link}
                  className="pjcta-partner-card"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={p.name}
                >
                  <img src={p.image} alt={p.alt} className="pjcta-partner-logo" />
                </a>
              )
            })}
          </div>
        </div>

        <div className="pjcta-divider" aria-hidden="true" />

        <div className="pjcta-join-col">
          <img src={stemPhoto} alt="Student working on a STEM project" className="pjcta-join-photo" />
          <div className="pjcta-join-overlay" aria-hidden="true" />
          <div className="pjcta-join-content">
            <h2 className="pjcta-join-title">Be Part of the STEM Movement</h2>
            <p className="pjcta-join-subtitle">
              Together, we can ensure every young person has access to the skills, tools and opportunities to succeed.
            </p>
            <div className="pjcta-join-actions">
              <Link to="/donate" className="pjcta-btn pjcta-btn-solid">Donate Now</Link>
              <Link to="/join" className="pjcta-btn pjcta-btn-outline">Become a Partner</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartnersJoinBanner