import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { findMemberBySlug } from '../data/teamData'
import '../Styles/Team.css'

export default function TeamProfile() {
  const { slug } = useParams()
  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMember() {
      setLoading(true)
      
      // First try to fetch by slug
      const { data, error } = await supabase
        .from('team_members')
        .select('id, name, role, slug, image, profile, category')
        .eq('slug', slug)
        .single()

      if (data) {
        setMember({
          ...data,
          bio: data.profile ? data.profile.split('\n\n') : [],
        })
        setLoading(false)
        return
      }

      // If slug fetch fails, try fallback from local data
      if (error) {
        console.warn('TeamProfile fetch by slug failed:', error)
        const fallback = findMemberBySlug(slug)
        if (fallback) {
          setMember({
            ...fallback,
            bio: fallback.profile ? fallback.profile.split('\n\n') : [],
          })
        } else {
          setMember(null)
        }
      }
      
      setLoading(false)
    }

    if (slug) {
      fetchMember()
    }
  }, [slug])

  if (loading) {
    return <div className="team-profile-page">Loading profile…</div>
  }

  if (!member) {
    return <Navigate to="/about" replace />
  }

  return (
    <section className="team-profile-page">
      <div className="team-profile-hero">
        <div className="team-profile-hero-inner">
          <div className="team-profile-image-wrap">
            <img src={member.image} alt={member.name} className="team-profile-image" />
          </div>
          <div className="team-profile-info">
            <p className="team-profile-role">{member.role}</p>
            <h1 className="team-profile-name">{member.name}</h1>
          </div>
        </div>
      </div>

      <section className="team-profile-body">
        <div className="team-profile-card">
          <div className="team-profile-content">
            {member.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </section>
  )
}
