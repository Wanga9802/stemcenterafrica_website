import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import '../styles/Dashboard.css'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ blogs: 0, events: 0, team: 0, subscribers: 0 })
  const [recentSubscribers, setRecentSubscribers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
    fetchRecentSubscribers()
  }, [])

  async function fetchStats() {
    try {
      const [blogsRes, eventsRes, teamRes, subscribersRes] = await Promise.all([
        supabase.from('blogs').select('id', { count: 'exact', head: true }),
        supabase.from('events').select('id', { count: 'exact', head: true }),
        supabase.from('team_members').select('id', { count: 'exact', head: true }),
        supabase.from('community_signups').select('id', { count: 'exact', head: true }),
      ])
      setStats({
        blogs: blogsRes.count || 0,
        events: eventsRes.count || 0,
        team: teamRes.count || 0,
        subscribers: subscribersRes.count || 0,
      })
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function fetchRecentSubscribers() {
    try {
      const { data } = await supabase
        .from('community_signups')
        .select('id, first_name, last_name, email, describes_you, interests, created_at')
        .order('created_at', { ascending: false })
        .limit(5)
      setRecentSubscribers(data || [])
    } catch (e) {
      console.error(e)
    }
  }

  const statCards = [
    { label: 'TOTAL BLOG POSTS', value: stats.blogs, trend: '+8%', trendUp: true },
    { label: 'TOTAL EVENTS', value: stats.events, trend: '+5%', trendUp: true },
    { label: 'TEAM MEMBERS', value: stats.team, trend: null },
    { label: 'SUBSCRIBERS', value: stats.subscribers, trend: null },
  ]

  const chartData = [
    { month: 'Jan', value: 4 },
    { month: 'Feb', value: 7 },
    { month: 'Mar', value: 5 },
    { month: 'Apr', value: 9 },
    { month: 'May', value: 6 },
    { month: 'Jun', value: 11 },
  ]
  const maxVal = Math.max(...chartData.map(d => d.value))

  return (
    <div className="dashboard-page">
      <div className="dashboard-quick-actions">
        <button onClick={() => navigate('/admin/blogs/new')} className="dashboard-btn dashboard-btn-primary">
          <PlusIcon /> Add Blog
        </button>
        <button onClick={() => navigate('/admin/events/new')} className="dashboard-btn dashboard-btn-outline">
          <PlusIcon /> Add Event
        </button>
        <button onClick={() => navigate('/admin/team/new')} className="dashboard-btn dashboard-btn-outline">
          <PlusIcon /> Add Team Member
        </button>
      </div>

      <div className="dashboard-stats-grid">
        {statCards.map((card) => (
          <div key={card.label} className="dashboard-stat-card">
            {loading ? (
              <div className="dashboard-skeleton" />
            ) : (
              <>
                <p className="dashboard-stat-label">{card.label}</p>
                <p className="dashboard-stat-value">{card.value}</p>
                {card.trend && (
                  <span
                    className={`dashboard-trend-chip${card.isAlert ? ' alert' : card.trendUp ? ' up' : ' down'}`}
                  >
                    {!card.isAlert && (card.trendUp ? '▲ ' : '▼ ')}{card.trend}
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <div className="dashboard-card">
        <h2 className="dashboard-card-title">Monthly Engagement Overview</h2>
        <div className="dashboard-chart-wrap">
          {chartData.map((d, i) => (
            <div key={d.month} className="dashboard-bar-group">
              <div className="dashboard-bar-track">
                <div
                  className="dashboard-bar"
                  style={{
                    height: `${(d.value / maxVal) * 100}%`,
                    background: i === chartData.length - 1 ? '#E91E8C' : 'rgba(233,30,140,0.35)',
                  }}
                />
              </div>
              <span className="dashboard-bar-label">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-card">
        <div className="dashboard-table-header">
          <h2 className="dashboard-card-title">Recent Subscribers</h2>
          <button onClick={() => navigate('/admin/community')} className="dashboard-view-all-btn">
            View All →
          </button>
        </div>

        {recentSubscribers.length === 0 && !loading ? (
          <div className="dashboard-empty-state">
            <p className="dashboard-empty-text">No subscribers yet.</p>
          </div>
        ) : (
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  {['NAME', 'EMAIL', 'DESCRIBES', 'INTERESTS', 'JOINED'].map(h => (
                    <th key={h} className="dashboard-th">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array(3).fill(0).map((_, i) => (
                    <tr key={i}>
                      {Array(5).fill(0).map((_, j) => (
                        <td key={j} className="dashboard-td">
                          <div className="dashboard-skeleton dashboard-skeleton-inline" />
                        </td>
                      ))}
                    </tr>
                  ))
                  : recentSubscribers.map((sub, i) => (
                    <tr key={sub.id} className={i % 2 === 0 ? 'dashboard-row-even' : 'dashboard-row-odd'}>
                      <td className="dashboard-td">
                        <span className="dashboard-subscriber-name-text">
                          {[sub.first_name, sub.last_name].filter(Boolean).join(' ') || '—'}
                        </span>
                      </td>
                      <td className="dashboard-td">
                        <span className="dashboard-subscriber-email-text">{sub.email || '—'}</span>
                      </td>
                      <td className="dashboard-td">
                        {sub.describes_you
                          ? <span className="dashboard-describes-badge">{sub.describes_you}</span>
                          : <span className="dashboard-subscriber-email-text">—</span>
                        }
                      </td>
                      <td className="dashboard-td">
                        <div className="dashboard-interest-badge-row">
                          {Array.isArray(sub.interests) && sub.interests.length > 0
                            ? sub.interests.map((interest) => (
                              <span key={interest} className="dashboard-interest-badge">{interest}</span>
                            ))
                            : <span className="dashboard-subscriber-email-text">—</span>
                          }
                        </div>
                      </td>
                      <td className="dashboard-td">
                        <span className="dashboard-date-text">
                          {new Date(sub.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="dashboard-icon-inline">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  )
}
