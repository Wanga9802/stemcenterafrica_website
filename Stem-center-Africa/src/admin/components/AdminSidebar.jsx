import { NavLink } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import '../styles/AdminSidebar.css'
import dashboardIcon from '../../assets/dashboard.png'
import bloggingIcon from '../../assets/blogging.png'
import calendarIcon from '../../assets/calendar.png'
import userIcon from '../../assets/user.png'
import faqIcon from '../../assets/que.png'
import awardsIcon from '../../assets/medal-icon.png'
import impactIcon from '../../assets/servicesw.png'
import storyIcon from '../../assets/book.png'
import donationIcon from '../../assets/donation.png'
import settingsIcon from '../../assets/settings.png'
import exitIcon from '../../assets/exit.png'
import logoImage from '../../assets/stem_africa.jpg'

const NAV_ITEMS = [
  { iconSrc: dashboardIcon, label: 'Dashboard', to: '/admin', end: true },
  { iconSrc: bloggingIcon, label: 'Blog Posts', to: '/admin/blogs' },
  { iconSrc: calendarIcon, label: 'Events', to: '/admin/events' },
  { iconSrc: userIcon, label: 'Team Members', to: '/admin/team' },
  { iconSrc: faqIcon, label: 'Faqs', to: '/admin/faqs' },
  { iconSrc: awardsIcon, label: 'Awards', to: '/admin/awards' },
  { iconSrc: impactIcon, label: 'Impact Highlights', to: '/admin/impact-highlights' },
  { iconSrc: storyIcon, label: 'Stories', to: '/admin/stories' },
  { iconSrc: donationIcon, label: 'Community', to: '/admin/community' },
  { iconSrc: settingsIcon, label: 'Settings', to: '/admin/settings' },
]

export default function AdminSidebar({ isOpen, onClose }) {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="admin-sidebar-overlay" onClick={onClose} />
      )}

      <aside className={`admin-sidebar${isOpen ? ' admin-sidebar-open' : ''}`}>
        {/* Logo */}
        <div className="admin-sidebar-logo-area">
          <div className="admin-sidebar-logo-box">
            <img src={logoImage} alt="STEM Africa logo" className="admin-sidebar-logo-img" />
          </div>
          <div>
            <p className="admin-sidebar-logo-text">STEM AFRICA</p>
            <p className="admin-sidebar-logo-sub">Admin Portal</p>
          </div>
        </div>

        <div className="admin-sidebar-divider" />

        {/* Nav */}
        <nav className="admin-sidebar-nav">
          {NAV_ITEMS.map(({ label, to, end, iconSrc }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `admin-sidebar-nav-item${isActive ? ' active' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="admin-sidebar-nav-icon">
                    <img src={iconSrc} alt={`${label} icon`} />
                  </span>
                  <span className="admin-sidebar-nav-label">{label}</span>
                  {isActive && <div className="admin-sidebar-active-border" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom — user + logout */}
        <div className="admin-sidebar-bottom">
          <div className="admin-sidebar-divider" />
         
          <button onClick={handleLogout} className="admin-sidebar-logout-btn">
            <img src={exitIcon} alt="logout icon" className="admin-sidebar-logout-icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

