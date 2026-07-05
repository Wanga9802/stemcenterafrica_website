import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useAdminAuth } from '../hooks/useAdminAuth'
import createIcon from '../../assets/create.png'
import deleteIcon from '../../assets/delete.png'
import '../styles/AdminEvent.css'

const PAGE_SIZE = 6

function getEventStatus(startDate, endDate) {
  const now = new Date()
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : start
  if (now < start) return 'upcoming'
  if (now > end) return 'past'
  return 'ongoing'
}

export default function AdminEvents() {
  const navigate = useNavigate()
  const { session, loading: authLoading } = useAdminAuth()

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [selected, setSelected] = useState([])
  const [deleteModal, setDeleteModal] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (authLoading || !session) return
    fetchEvents()
  }, [search, statusFilter, page, authLoading, session])

  async function fetchEvents() {
    setLoading(true)
    setErrorMessage('')
    try {
      await supabase.auth.getSession()
      let query = supabase
        .from('events')
        .select(
          'id, event_id, title, location, start_date, end_date, time, image_url, requires_registration, created_at',
          { count: 'exact' }
        )
        .order('start_date', { ascending: false })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

      if (search) query = query.ilike('title', `%${search}%`)

      const { data, count, error } = await query
      if (error) throw error

      let filtered = data || []

      // Client-side status filter (derived from dates)
      if (statusFilter !== 'All') {
        filtered = filtered.filter(e => getEventStatus(e.start_date, e.end_date) === statusFilter.toLowerCase())
      }

      setEvents(filtered)
      setTotal(count || 0)
    } catch (e) {
      const message = e?.message || JSON.stringify(e)
      setErrorMessage(message)
      showToast('Failed to load events', 'error')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) {
      showToast('Failed to delete event', 'error')
    } else {
      showToast('Event deleted', 'success')
      setDeleteModal(null)
      fetchEvents()
    }
  }

  async function handleBulkDelete() {
    const { error } = await supabase.from('events').delete().in('id', selected)
    if (error) {
      showToast('Bulk delete failed', 'error')
    } else {
      showToast(`${selected.length} event${selected.length > 1 ? 's' : ''} deleted`, 'success')
      setSelected([])
      fetchEvents()
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
    setSelected(selected.length === events.length ? [] : events.map(e => e.id))
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const from = (page - 1) * PAGE_SIZE + 1
  const to = Math.min(page * PAGE_SIZE, total)

  return (
    <div className="ae-page">

      {/* Toast */}
      {toast && (
        <div className={`ae-toast ae-toast--${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="ae-modal-overlay">
          <div className="ae-modal">
            <div className="ae-modal-icon">
              <img src={deleteIcon} alt="Delete" style={{ width: 48, height: 48, objectFit: 'contain' }} />
            </div>
            <h3 className="ae-modal-title">Delete Event?</h3>
            <p className="ae-modal-text">This action cannot be undone. The event will be permanently removed.</p>
            <div className="ae-modal-actions">
              <button onClick={() => setDeleteModal(null)} className="ae-modal-cancel">Cancel</button>
              <button onClick={() => handleDelete(deleteModal)} className="ae-modal-delete">Delete Event</button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="ae-header">
        <div>
          <h1 className="ae-page-title">Events</h1>
          <p className="ae-page-subtitle">Manage and publish events for STEM Center Africa</p>
        </div>
        <button onClick={() => navigate('/admin/events/new')} className="ae-create-btn">
          <img src={createIcon} alt="Create" className="ae-create-icon" /> Create New Event
        </button>
      </div>

      {errorMessage && (
        <div className="ae-fetch-error">
          <strong>Fetch failed:</strong> {errorMessage}
        </div>
      )}

      {/* Bulk Actions */}
      {selected.length > 0 && (
        <div className="ae-bulk-bar">
          <span className="ae-bulk-text">{selected.length} event{selected.length > 1 ? 's' : ''} selected</span>
          <button onClick={handleBulkDelete} className="ae-bulk-delete-btn">
            <TrashIcon /> Delete Selected
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="ae-filters-card">
        <div className="ae-filters-row">
          <div className="ae-search-wrap">
            <SearchIcon className="ae-search-icon" />
            <input
              className="ae-search-input"
              placeholder="Search by title or location..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
            />
          </div>
          <select
            className="ae-select"
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setPage(1) }}
          >
            {['All', 'Upcoming', 'Ongoing', 'Past'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="ae-table-card">
        <div className="ae-overflow-wrapper">
          <table className="ae-table">
            <thead>
              <tr className="ae-table-head-row">
                <th className="ae-th ae-th-checkbox">
                  <input
                    type="checkbox"
                    checked={selected.length === events.length && events.length > 0}
                    onChange={toggleAll}
                    className="ae-checkbox"
                  />
                </th>
                <th className="ae-th ae-th-thumb">IMAGE</th>
                <th className="ae-th ae-th-id">EVENT ID</th>
                <th className="ae-th">TITLE</th>
                <th className="ae-th ae-th-location">LOCATION</th>
                <th className="ae-th ae-th-date">START DATE</th>
                <th className="ae-th ae-th-date">END DATE</th>
                <th className="ae-th ae-th-status">STATUS</th>
                <th className="ae-th ae-th-reg">REGISTRATION</th>
                <th className="ae-th ae-th-actions">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(4).fill(0).map((_, i) => (
                  <tr key={i} className="ae-row ae-row-skeleton">
                    {Array(10).fill(0).map((_, j) => (
                      <td key={j} className="ae-td">
                        <div className="ae-skeleton" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={10} className="ae-td">
                    <EmptyState onAdd={() => navigate('/admin/events/new')} />
                  </td>
                </tr>
              ) : (
                events.map((event, i) => {
                  const status = getEventStatus(event.start_date, event.end_date)
                  return (
                    <tr
                      key={event.id}
                      className={i % 2 === 0 ? 'ae-row ae-row-even' : 'ae-row ae-row-odd'}
                    >
                      {/* Checkbox */}
                      <td className="ae-td">
                        <input
                          type="checkbox"
                          checked={selected.includes(event.id)}
                          onChange={() => toggleSelect(event.id)}
                          className="ae-checkbox"
                        />
                      </td>

                      {/* Thumbnail */}
                      <td className="ae-td">
                        <div className="ae-thumb-wrap">
                          {event.image_url ? (
                            <img src={event.image_url} alt="" className="ae-thumb-img" />
                          ) : (
                            <div className="ae-thumb-placeholder">📅</div>
                          )}
                        </div>
                      </td>

                      {/* Event ID */}
                      <td className="ae-td">
                        <span className="ae-slug-text">{event.event_id || '—'}</span>
                      </td>

                      {/* Title */}
                      <td className="ae-td">
                        <span className="ae-title-text">{event.title || '—'}</span>
                      </td>

                      {/* Location */}
                      <td className="ae-td">
                        <span className="ae-location-text">{event.location || '—'}</span>
                      </td>

                      {/* Start Date */}
                      <td className="ae-td">
                        <span className="ae-date-text">
                          {event.start_date
                            ? new Date(event.start_date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
                            : '—'}
                        </span>
                      </td>

                      {/* End Date */}
                      <td className="ae-td">
                        <span className="ae-date-text">
                          {event.end_date
                            ? new Date(event.end_date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
                            : '—'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="ae-td">
                        <span className={`ae-status-badge ae-status--${status}`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </td>

                      {/* Registration */}
                      <td className="ae-td">
                        <span className={`ae-reg-badge ${event.requires_registration ? 'ae-reg--yes' : 'ae-reg--no'}`}>
                          {event.requires_registration ? 'Required' : 'Open'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="ae-td">
                        <div className="ae-actions-row">
                          <button
                            onClick={() => navigate(`/admin/events/${event.id}/edit`)}
                            className="ae-edit-btn"
                            title="Edit event"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => setDeleteModal(event.id)}
                            className="ae-delete-btn"
                            title="Delete event"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {total > 0 && (
          <div className="ae-pagination">
            <span className="ae-pagination-info">
              Showing {from}–{to} of {total} event{total !== 1 ? 's' : ''}
            </span>
            <div className="ae-pagination-btns">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="ae-page-btn"
              >
                ← Previous
              </button>
              <span className="ae-page-indicator">{page} / {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="ae-page-btn"
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

// ── Sub-components ──────────────────────────────────────────────────────────

function EmptyState({ onAdd }) {
  return (
    <div className="ae-empty-state">
      <div className="ae-empty-icon">📅</div>
      <p className="ae-empty-title">No events yet</p>
      <p className="ae-empty-message">Start by creating your first event</p>
      <button onClick={onAdd} className="ae-empty-btn">+ Create First Event</button>
    </div>
  )
}

// ── Icons ───────────────────────────────────────────────────────────────────
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
