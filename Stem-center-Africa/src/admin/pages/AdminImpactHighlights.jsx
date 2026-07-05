import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useAdminAuth } from '../hooks/useAdminAuth'
import createIcon from '../../assets/create.png'
import deleteIcon from '../../assets/delete.png'
import '../styles/AdminImpactHighlights.css'

const PAGE_SIZE = 6

export default function AdminImpactHighlights() {
  const navigate = useNavigate()
  const { session, loading: authLoading } = useAdminAuth()

  const [highlights, setHighlights] = useState([])
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
    fetchHighlights()
  }, [search, page, authLoading, session])

  async function fetchHighlights() {
    setLoading(true)
    setErrorMessage('')
    try {
      await supabase.auth.getSession()
      let query = supabase
        .from('impact_highlights')
        .select('id, title, summary, content, image_path, is_published, sort_order, created_at', { count: 'exact' })
        .order('sort_order', { ascending: true })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

      if (search) query = query.ilike('title', `%${search}%`)

      const { data, count, error } = await query
      if (error) throw error

      setHighlights(data || [])
      setTotal(count || 0)
    } catch (e) {
      const message = e?.message || JSON.stringify(e)
      setErrorMessage(message)
      showToast('Failed to load impact highlights', 'error')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('impact_highlights').delete().eq('id', id)
    if (error) {
      showToast('Failed to delete highlight', 'error')
    } else {
      showToast('Highlight deleted', 'success')
      setDeleteModal(null)
      fetchHighlights()
    }
  }

  async function handleBulkDelete() {
    const { error } = await supabase.from('impact_highlights').delete().in('id', selected)
    if (error) {
      showToast('Bulk delete failed', 'error')
    } else {
      showToast(`${selected.length} highlight${selected.length > 1 ? 's' : ''} deleted`, 'success')
      setSelected([])
      fetchHighlights()
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
    setSelected(selected.length === highlights.length ? [] : highlights.map(h => h.id))
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const from = (page - 1) * PAGE_SIZE + 1
  const to = Math.min(page * PAGE_SIZE, total)

  return (
    <div className="aih-page">

      {/* Toast */}
      {toast && (
        <div className={`aih-toast aih-toast--${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="aih-modal-overlay">
          <div className="aih-modal">
            <div className="aih-modal-icon">
              <img src={deleteIcon} alt="Delete" style={{ width: 48, height: 48, objectFit: 'contain' }} />
            </div>
            <h3 className="aih-modal-title">Delete Highlight?</h3>
            <p className="aih-modal-text">This action cannot be undone. The highlight will be permanently removed.</p>
            <div className="aih-modal-actions">
              <button onClick={() => setDeleteModal(null)} className="aih-modal-cancel">Cancel</button>
              <button onClick={() => handleDelete(deleteModal)} className="aih-modal-delete">Delete Highlight</button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="aih-header">
        <div>
          <h1 className="aih-page-title">Impact Highlights</h1>
          <p className="aih-page-subtitle">Manage impact stories and achievements for STEM Center Africa</p>
        </div>
        <button onClick={() => navigate('/admin/impact-highlights/new')} className="aih-create-btn">
          <img src={createIcon} alt="Create" className="aih-create-icon" /> Create New Highlight
        </button>
      </div>

      {errorMessage && (
        <div className="aih-fetch-error">
          <strong>Fetch failed:</strong> {errorMessage}
        </div>
      )}

      {/* Bulk Actions */}
      {selected.length > 0 && (
        <div className="aih-bulk-bar">
          <span className="aih-bulk-text">{selected.length} highlight{selected.length > 1 ? 's' : ''} selected</span>
          <button onClick={handleBulkDelete} className="aih-bulk-delete-btn">
            <TrashIcon /> Delete Selected
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="aih-filters-card">
        <div className="aih-filters-row">
          <div className="aih-search-wrap">
            <SearchIcon className="aih-search-icon" />
            <input
              className="aih-search-input"
              placeholder="Search by title..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="aih-table-card">
        <div className="aih-overflow-wrapper">
          <table className="aih-table">
            <thead>
              <tr className="aih-table-head-row">
                <th className="aih-th aih-th-checkbox">
                  <input
                    type="checkbox"
                    checked={selected.length === highlights.length && highlights.length > 0}
                    onChange={toggleAll}
                    className="aih-checkbox"
                  />
                </th>
                <th className="aih-th aih-th-thumb">IMAGE</th>
                <th className="aih-th">TITLE</th>
                <th className="aih-th aih-th-summary">SUMMARY</th>
                <th className="aih-th aih-th-status">PUBLISHED</th>
                <th className="aih-th aih-th-order">ORDER</th>
                <th className="aih-th aih-th-date">CREATED</th>
                <th className="aih-th aih-th-actions">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(4).fill(0).map((_, i) => (
                  <tr key={i} className="aih-row aih-row-skeleton">
                    {Array(8).fill(0).map((_, j) => (
                      <td key={j} className="aih-td">
                        <div className="aih-skeleton" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : highlights.length === 0 ? (
                <tr>
                  <td colSpan={8} className="aih-td">
                    <EmptyState onAdd={() => navigate('/admin/impact-highlights/new')} />
                  </td>
                </tr>
              ) : (
                highlights.map((highlight, i) => (
                  <tr
                    key={highlight.id}
                    className={i % 2 === 0 ? 'aih-row aih-row-even' : 'aih-row aih-row-odd'}
                  >
                    {/* Checkbox */}
                    <td className="aih-td">
                      <input
                        type="checkbox"
                        checked={selected.includes(highlight.id)}
                        onChange={() => toggleSelect(highlight.id)}
                        className="aih-checkbox"
                      />
                    </td>

                    {/* Thumbnail */}
                    <td className="aih-td">
                      <div className="aih-thumb-wrap">
                        {highlight.image_path ? (
                          <img
                            src={
  highlight.image_path.startsWith('http')
    ? highlight.image_path
    : highlight.image_path.startsWith('/assets')
      ? highlight.image_path
      : supabase.storage
          .from('impact-highlights-images')
          .getPublicUrl(highlight.image_path).data.publicUrl
}
                            alt=""
                            className="aih-thumb-img"
                          />
                        ) : (
                          <div className="aih-thumb-placeholder">⚡</div>
                        )}
                      </div>
                    </td>

                    {/* Title */}
                    <td className="aih-td">
                      <span className="aih-title-text">{highlight.title || '—'}</span>
                    </td>

                    {/* Summary */}
                    <td className="aih-td">
                      <span className="aih-summary-text">
                        {highlight.summary
                          ? highlight.summary.length > 60
                            ? highlight.summary.slice(0, 60) + '…'
                            : highlight.summary
                          : highlight.content
                            ? highlight.content.slice(0, 60) + '…'
                            : '—'}
                      </span>
                    </td>

                    {/* Published */}
                    <td className="aih-td">
                      <span className={`aih-pub-badge ${highlight.is_published ? 'aih-pub--yes' : 'aih-pub--no'}`}>
                        {highlight.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>

                    {/* Sort Order */}
                    <td className="aih-td">
                      <span className="aih-order-text">{highlight.sort_order ?? '—'}</span>
                    </td>

                    {/* Created */}
                    <td className="aih-td">
                      <span className="aih-date-text">
                        {highlight.created_at
                          ? new Date(highlight.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
                          : '—'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="aih-td">
                      <div className="aih-actions-row">
                        <button
                          onClick={() => navigate(`/admin/impact-highlights/${highlight.id}/edit`)}
                          className="aih-edit-btn"
                          title="Edit highlight"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => setDeleteModal(highlight.id)}
                          className="aih-delete-btn"
                          title="Delete highlight"
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
          <div className="aih-pagination">
            <span className="aih-pagination-info">
              Showing {from}–{to} of {total} highlight{total !== 1 ? 's' : ''}
            </span>
            <div className="aih-pagination-btns">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="aih-page-btn"
              >
                ← Previous
              </button>
              <span className="aih-page-indicator">{page} / {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="aih-page-btn"
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
    <div className="aih-empty-state">
      <div className="aih-empty-icon">⚡</div>
      <p className="aih-empty-title">No impact highlights yet</p>
      <p className="aih-empty-message">Start by creating your first impact highlight</p>
      <button onClick={onAdd} className="aih-empty-btn">+ Create First Highlight</button>
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
