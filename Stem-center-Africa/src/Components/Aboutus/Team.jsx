import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import '../../Styles/Team.css'

export default function Team() {
  const [activeTab, setActiveTab] = useState('board')
  const [members, setMembers] = useState({ board: [], executive: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeamMembers() {
      setLoading(true)
      const { data, error } = await supabase
        .from('team_members')
        .select('name, role, category, slug, image, profile, order')
        .order('order', { ascending: true })
        .order('name', { ascending: true })

      if (error) {
        console.error('Failed to load team members:', error)
        setMembers({ board: [], executive: [] })
      } else {
        const grouped = { board: [], executive: [] }
        data.forEach((member) => {
          const category = member.category === 'executive' ? 'executive' : 'board'
          grouped[category].push(member)
        })
        setMembers(grouped)
      }
      setLoading(false)
    }

    fetchTeamMembers()
  }, [])

  const activeMembers = members[activeTab] || []

  return (
    <section className="team-section">
      <div className="team-bg-lines" aria-hidden="true">
        <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <path d="M-100,300 Q200,100 500,300 T1100,300" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
          <path d="M-100,350 Q200,150 500,350 T1100,350" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
          <path d="M-100,250 Q200,50 500,250 T1100,250" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
          <path d="M-100,400 Q200,200 500,400 T1100,400" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
          <path d="M-100,200 Q200,0 500,200 T1100,200" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
          <path d="M50,600 Q150,300 300,200 Q450,100 500,0" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="60" strokeLinecap="round" opacity="0.3" />
        </svg>
      </div>

      <div className="container team-container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="team-heading">Meet the Team</h2>
            <p className="team-subtext">
              Our success is fueled by a passionate team of industry experts and dedicated professionals
              committed to transforming tech education in Africa. With diverse backgrounds in technology,
              education, and business, our team brings a wealth of experience to ensure our students
              receive world-class training and career support. Get to know our leadership, mentors,
              and innovators shaping the future of tech talent in Africa.
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-auto">
            <div className="team-tabs">
              <button
                className={`team-tab-btn${activeTab === 'board' ? ' active' : ''}`}
                onClick={() => setActiveTab('board')}
              >
                Board Members
              </button>
              <button
                className={`team-tab-btn${activeTab === 'executive' ? ' active' : ''}`}
                onClick={() => setActiveTab('executive')}
              >
                Executive Team
              </button>
            </div>
          </div>
        </div>

        <div className="row justify-content-center team-cards-row">
          {loading ? (
            <div className="col-12 text-center">Loading team members...</div>
          ) : (
            activeMembers.map((member, index) => (
              <div key={index} className="col-12 col-md-4 col-lg-3 team-card-col">
                <div className="team-card">
                  <div className="team-card-img-wrap">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="team-card-img"
                    />
                  </div>
                  <div className="team-card-body">
                    <p className="team-card-name">{member.name}</p>
                    <p className="team-card-role">{member.role}</p>
                    {member.profile && (
                      <p className="team-card-profile">{member.profile}</p>
                    )}
                    <Link to={`/team/${member.slug}`} className="team-card-link" aria-label={`View ${member.name}'s full profile`}>
                      View full profile
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
