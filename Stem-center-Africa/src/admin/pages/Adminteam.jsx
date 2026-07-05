import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useAdminAuth } from '../hooks/useAdminAuth'
import createIcon from '../../assets/create.png'
import deleteIcon from '../../assets/delete.png'
import '../styles/Adminteam.css'

const PAGE_SIZE = 6

export default function Adminteam() {
  const navigate = useNavigate()
  const { session, loading: authLoading } = useAdminAuth()

  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [selected, setSelected] = useState([])
  const [deleteModal, setDeleteModal] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (authLoading || !session) return
    fetchTeamMembers()
  }, [search, page, authLoading, session])

  async function fetchTeamMembers() {
    setLoading(true)
    setErrorMessage('')

    try {
      await supabase.auth.getSession()
      let query = supabase
        .from('team_members')
        .select('id, name, role, category, image, slug, order, created_at', { count: 'exact' })
        .order('order', { ascending: true })
        .order('created_at', { ascending: false })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

      if (search) {
        const term = `%${search}%`
        query = query.or(`name.ilike.${term},role.ilike.${term},category.ilike.${term}`)
      }

      const { data, count, error } = await query
      if (error) throw error
      setMembers(data || [])
      setTotal(count || 0)
    } catch (e) {
      const message = e?.message || e?.error_description || JSON.stringify(e)
      console.error('Team fetch failed:', message)
      setErrorMessage(message)
      showToast('Failed to load team members', 'error')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('team_members').delete().eq('id', id)
    if (error) {
      showToast('Failed to delete member', 'error')
    } else {
      showToast('Team member deleted', 'success')
      setDeleteModal(null)
      setSelected(prev => prev.filter(item => item !== id))
      fetchTeamMembers()
    }
  }

  async function handleBulkDelete() {
    if (!selected.length) return
    const { error } = await supabase.from('team_members').delete().in('id', selected)
    if (error) {
      showToast('Bulk delete failed', 'error')
    } else {
      showToast(`${selected.length} member${selected.length > 1 ? 's' : ''} deleted`, 'success')
      setSelected([])
      fetchTeamMembers()
    }
  }

  function showToast(message, type = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  function toggleSelect(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function toggleAll() {
    setSelected(selected.length === members.length ? [] : members.map(item => item.id))
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const from = members.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const to = Math.min(page * PAGE_SIZE, total)

  return (
    <div className="admin-team-page">
      {toast && (
        <div className={`admin-team-toast admin-team-toast--${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </div>
      )}

      {deleteModal && (
        <div className="admin-team-modal-overlay">
          <div className="admin-team-modal">
            <div className="admin-team-modal-icon">
              <img src={deleteIcon} alt="Delete" style={{ width: 48, height: 48, objectFit: 'contain' }} />
            </div>
            <h3 className="admin-team-modal-title">Delete Team Member?</h3>
            <p className="admin-team-modal-text">This action cannot be undone. The member will be permanently removed.</p>
            <div className="admin-team-modal-actions">
              <button onClick={() => setDeleteModal(null)} className="admin-team-modal-cancel">Cancel</button>
              <button onClick={() => handleDelete(deleteModal)} className="admin-team-modal-delete">Delete Member</button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-team-header">
        <div>
          <h1 className="admin-team-page-title">Team Members</h1>
          <p className="admin-team-page-subtitle">Create, edit, and organize your core team profiles.</p>
        </div>
        <button onClick={() => navigate('/admin/team/new')} className="admin-team-create-btn">
          <img src={createIcon} alt="Create" className="admin-team-create-icon" /> Create New Member
        </button>
      </div>

      {errorMessage && (
        <div className="admin-team-fetch-error">
          <strong>Fetch failed:</strong> {errorMessage}
        </div>
      )}

      {selected.length > 0 && (
        <div className="admin-team-bulk-bar">
          <span className="admin-team-bulk-text">{selected.length} selected</span>
          <button onClick={handleBulkDelete} className="admin-team-bulk-delete-btn">
            <TrashIcon /> Delete Selected
          </button>
        </div>
      )}

      <div className="admin-team-filters-card">
        <div className="admin-team-filters-row">
          <div className="admin-team-search-wrap">
            <SearchIcon className="admin-team-search-icon" />
            <input
              className="admin-team-search-input"
              placeholder="Search by name, role, or category..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
            />
          </div>
        </div>
      </div>

      <div className="admin-team-table-card">
        <div className="admin-team-overflow-wrapper">
          <table className="admin-team-table">
            <thead>
              <tr className="admin-team-table-head-row">
                <th className="admin-team-th admin-team-th-checkbox">
                  <input
                    type="checkbox"
                    checked={selected.length === members.length && members.length > 0}
                    onChange={toggleAll}
                    className="admin-team-checkbox"
                  />
                </th>
                <th className="admin-team-th admin-team-th-thumb">PHOTO</th>
                <th className="admin-team-th">NAME</th>
                <th className="admin-team-th">ROLE</th>
                <th className="admin-team-th">CATEGORY</th>
                <th className="admin-team-th">SLUG</th>
                <th className="admin-team-th">ORDER</th>
                <th className="admin-team-th admin-team-th-actions">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5).fill(0).map((_, rowIndex) => (
                  <tr key={rowIndex} className="admin-team-row admin-team-row-skeleton">
                    {Array(8).fill(0).map((_, cellIndex) => (
                      <td key={cellIndex} className="admin-team-td">
                        <div className="admin-team-skeleton" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan={8} className="admin-team-td">
                    <EmptyState onAdd={() => navigate('/admin/team/new')} />
                  </td>
                </tr>
              ) : (
                members.map((member, index) => (
                  <tr
                    key={member.id}
                    className={index % 2 === 0 ? 'admin-team-row admin-team-row-even' : 'admin-team-row admin-team-row-odd'}
                  >
                    <td className="admin-team-td">
                      <input
                        type="checkbox"
                        checked={selected.includes(member.id)}
                        onChange={() => toggleSelect(member.id)}
                        className="admin-team-checkbox"
                      />
                    </td>
                    <td className="admin-team-td">
                      <div className="admin-team-thumb-wrap">
                        {member.image ? (
                          <img src={member.image} alt={member.name} className="admin-team-thumb-img" />
                        ) : (
                          <div className="admin-team-thumb-placeholder">👤</div>
                        )}
                      </div>
                    </td>
                    <td className="admin-team-td">
                      <span className="admin-team-name-text">{member.name || '—'}</span>
                    </td>
                    <td className="admin-team-td">
                      <span className="admin-team-role-text">{member.role || '—'}</span>
                    </td>
                    <td className="admin-team-td">
                      <span className="admin-team-category-text">{member.category || '—'}</span>
                    </td>
                    <td className="admin-team-td">
                      <span className="admin-team-slug-text">{member.slug || '—'}</span>
                    </td>
                    <td className="admin-team-td">
                      <span className="admin-team-order-text">{member.order ?? '—'}</span>
                    </td>
                    <td className="admin-team-td">
                      <div className="admin-team-actions-row">
                        <button
                          onClick={() => navigate(`/admin/team/${member.id}/edit`)}
                          className="admin-team-edit-btn"
                          title="Edit member"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => setDeleteModal(member.id)}
                          className="admin-team-delete-btn"
                          title="Delete member"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {total > 0 && (
          <div className="admin-team-pagination">
            <span className="admin-team-pagination-info">
              Showing {from}–{to} of {total} member{total !== 1 ? 's' : ''}
            </span>
            <div className="admin-team-pagination-btns">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="admin-team-page-btn"
              >
                ← Previous
              </button>
              <span className="admin-team-page-indicator">{page} / {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="admin-team-page-btn"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyState({ onAdd }) {
  return (
    <div className="admin-team-empty-state">
      <div className="admin-team-empty-icon">👥</div>
      <p className="admin-team-empty-title">No team members yet</p>
      <p className="admin-team-empty-message">Add your first profile to start building your team pages.</p>
      <button onClick={onAdd} className="admin-team-empty-btn">+ Add Team Member</button>
    </div>
  )
}

function SearchIcon({ className }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className={className} fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="3,6 5,6 21,6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  )
}
