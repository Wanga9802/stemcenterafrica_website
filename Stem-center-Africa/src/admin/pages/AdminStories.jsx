import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useAdminAuth } from '../hooks/useAdminAuth'
import createIcon from '../../assets/create.png'
import deleteIcon from '../../assets/delete.png'
import '../styles/AdminStories.css'

const PAGE_SIZE = 6

export default function AdminStories() {
  const navigate = useNavigate()
  const { session, loading: authLoading } = useAdminAuth()

  const [stories, setStories] = useState([])
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
    fetchStories()
  }, [search, page, authLoading, session])

  async function fetchStories() {
    setLoading(true)
    setErrorMessage('')
    try {
      await supabase.auth.getSession()
      let query = supabase
        .from('stories')
        .select('id, title, content, story_date, image_url, created_at', { count: 'exact' })
        .order('story_date', { ascending: false })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

      if (search) query = query.ilike('title', `%${search}%`)

      const { data, count, error } = await query
      if (error) throw error

      setStories(data || [])
      setTotal(count || 0)
    } catch (e) {
      const message = e?.message || JSON.stringify(e)
      setErrorMessage(message)
      showToast('Failed to load stories', 'error')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('stories').delete().eq('id', id)
    if (error) {
      showToast('Failed to delete story', 'error')
    } else {
      showToast('Story deleted', 'success')
      setDeleteModal(null)
      fetchStories()
    }
  }

  async function handleBulkDelete() {
    const { error } = await supabase.from('stories').delete().in('id', selected)
    if (error) {
      showToast('Bulk delete failed', 'error')
    } else {
      showToast(`${selected.length} story${selected.length > 1 ? 'ies' : ''} deleted`, 'success')
      setSelected([])
      fetchStories()
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
    setSelected(selected.length === stories.length ? [] : stories.map(s => s.id))
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const from = (page - 1) * PAGE_SIZE + 1
  const to = Math.min(page * PAGE_SIZE, total)

  return (
    <div className="as-page">

      {/* Toast */}
      {toast && (
        <div className={`as-toast as-toast--${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="as-modal-overlay">
          <div className="as-modal">
            <div className="as-modal-icon">
              <img src={deleteIcon} alt="Delete" />
            </div>
            <h3 className="as-modal-title">Delete Story?</h3>
            <p className="as-modal-text">This action cannot be undone. The story will be permanently removed.</p>
            <div className="as-modal-actions">
              <button onClick={() => setDeleteModal(null)} className="as-modal-cancel">Cancel</button>
              <button onClick={() => handleDelete(deleteModal)} className="as-modal-delete">Delete Story</button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="as-header">
        <div>
          <h1 className="as-page-title">Stories</h1>
          <p className="as-page-subtitle">Manage and publish success stories from STEM Center Africa</p>
        </div>
        <button onClick={() => navigate('/admin/stories/new')} className="as-create-btn">
          <img src={createIcon} alt="Create" className="as-create-icon" /> Create New Story
        </button>
      </div>

      {errorMessage && (
        <div className="as-fetch-error">
          <strong>Fetch failed:</strong> {errorMessage}
        </div>
      )}

      {/* Bulk Actions */}
      {selected.length > 0 && (
        <div className="as-bulk-bar">
          <span className="as-bulk-text">{selected.length} story{selected.length > 1 ? 'ies' : ''} selected</span>
          <button onClick={handleBulkDelete} className="as-bulk-delete-btn">
            <TrashIcon /> Delete Selected
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="as-filters-card">
        <div className="as-filters-row">
          <div className="as-search-wrap">
            <SearchIcon className="as-search-icon" />
            <input
              className="as-search-input"
              placeholder="Search by title..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="as-table-card">
        <div className="as-overflow-wrapper">
          <table className="as-table">
            <thead>
              <tr className="as-table-head-row">
                <th className="as-th as-th-checkbox">
                  <input
                    type="checkbox"
                    checked={selected.length === stories.length && stories.length > 0}
                    onChange={toggleAll}
                    className="as-checkbox"
                  />
                </th>
                <th className="as-th as-th-thumb">IMAGE</th>
                <th className="as-th">TITLE</th>
                <th className="as-th as-th-date">DATE</th>
                <th className="as-th as-th-actions">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(4).fill(0).map((_, i) => (
                  <tr key={i} className="as-row as-row-skeleton">
                    {Array(5).fill(0).map((_, j) => (
                      <td key={j} className="as-td">
                        <div className="as-skeleton" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : stories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="as-td">
                    <EmptyState onAdd={() => navigate('/admin/stories/new')} />
                  </td>
                </tr>
              ) : (
                stories.map((story, i) => (
                  <tr key={story.id} className={i % 2 === 0 ? 'as-row as-row-even' : 'as-row as-row-odd'}>
                    {/* Checkbox */}
                    <td className="as-td">
                      <input
                        type="checkbox"
                        checked={selected.includes(story.id)}
                        onChange={() => toggleSelect(story.id)}
                        className="as-checkbox"
                      />
                    </td>

                    {/* Thumbnail */}
                    <td className="as-td">
                      <div className="as-thumb-wrap">
                        {story.image_url ? (
                          <img src={story.image_url} alt="" className="as-thumb-img" />
                        ) : (
                          <div className="as-thumb-placeholder">📖</div>
                        )}
                      </div>
                    </td>

                    {/* Title */}
                    <td className="as-td">
                      <span className="as-title-text">{story.title || '—'}</span>
                    </td>

                    {/* Date */}
                    <td className="as-td">
                      <span className="as-date-text">
                        {story.story_date
                          ? new Date(story.story_date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
                          : '—'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="as-td">
                      <div className="as-actions-row">
                        <button
                          onClick={() => navigate(`/admin/stories/${story.id}/edit`)}
                          className="as-edit-btn"
                          title="Edit story"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => setDeleteModal(story.id)}
                          className="as-delete-btn"
                          title="Delete story"
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

        {/* Pagination */}
        {total > 0 && (
          <div className="as-pagination">
            <span className="as-pagination-info">
              Showing {from}–{to} of {total} story{total !== 1 ? 'ies' : ''}
            </span>
            <div className="as-pagination-btns">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="as-page-btn"
              >
                ← Previous
              </button>
              <span className="as-page-indicator">{page} / {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="as-page-btn"
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
    <div className="as-empty-state">
      <div className="as-empty-icon">📖</div>
      <p className="as-empty-title">No stories yet</p>
      <p className="as-empty-message">Start by creating your first story</p>
      <button onClick={onAdd} className="as-empty-btn">+ Create First Story</button>
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
