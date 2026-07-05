import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import '../styles/AdminTopbar.css'


const PAGE_TITLES = {
  '/admin': 'Dashboard',
  '/admin/blogs': 'Blog Posts',
  '/admin/events': 'Events',
  '/admin/team': 'Team Members',
  '/admin/faqs': 'FAQs',
  '/admin/awards': 'Awards',
  '/admin/impact-highlights': 'Impact Highlights',
  '/admin/community': 'Community',
  '/admin/messages': 'Messages',
  '/admin/settings': 'Settings',
}

function getPageTitle(pathname) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  if (pathname.startsWith('/admin/blogs')) return 'Blog Posts'
  if (pathname.startsWith('/admin/events')) return 'Events'
  if (pathname.startsWith('/admin/team')) return 'Team Members'
  if (pathname.startsWith('/admin/faqs')) return 'FAQs'
  if (pathname.startsWith('/admin/awards')) return 'Awards'
  if (pathname.startsWith('/admin/impact-highlights') || pathname.startsWith('/admin/impact')) return 'Impact Highlights'
  if (pathname.startsWith('/admin/community')) return 'Community'
  return 'Admin'
}

export default function AdminTopbar({ onMenuToggle }) {
  const location = useLocation()
  const title = getPageTitle(location.pathname)

  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({ full_name: '', job_title: '', avatar_url: null })

  // Get current logged-in user from Supabase directly
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUser(data.user)
    })
  }, [])

  // Fetch profile once user is loaded
  useEffect(() => {
    if (!user) return
    fetchProfile()
  }, [user])

  // Listen for profile-updated event fired by SettingsPage after save
  useEffect(() => {
    function handleProfileUpdate() {
      if (user) fetchProfile()
    }
    window.addEventListener('profile-updated', handleProfileUpdate)
    return () => window.removeEventListener('profile-updated', handleProfileUpdate)
  }, [user])

  async function fetchProfile() {
    const { data } = await supabase
      .from('admin_profiles')
      .select('full_name, job_title, avatar_url')
      .eq('id', user.id)
      .single()

    if (data) setProfile(data)
  }

  // First two letters of each word in full name e.g. "Elias Wanga" → "EW"
  const initials = profile.full_name
    ? profile.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || 'A'

  return (
    <header className="admin-topbar">
      {/* Left: hamburger + title */}
      <div className="admin-topbar-left">
        <button
          onClick={onMenuToggle}
          className="admin-topbar-hamburger admin-hamburger"
          aria-label="Toggle sidebar"
        >
          <HamburgerIcon />
        </button>
        <h1 className="admin-topbar-title">{title}</h1>
      </div>

      {/* Right: notifications + avatar */}
      <div className="admin-topbar-right">
        <button className="admin-topbar-icon-btn admin-topbar-notif-btn" aria-label="Notifications">
          <BellIcon />
          <span className="admin-topbar-notif-badge">3</span>
        </button>

        <div className="admin-topbar-avatar">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="Admin avatar"
              className="admin-topbar-avatar-img"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <div className="admin-topbar-avatar-initials">{initials}</div>
          )}
          <div className="admin-topbar-avatar-info">
            <span className="admin-topbar-avatar-name">
              {profile.full_name || user?.email || 'Admin'}
            </span>
            {profile.job_title && (
              <span className="admin-topbar-avatar-role">{profile.job_title}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  )
}
