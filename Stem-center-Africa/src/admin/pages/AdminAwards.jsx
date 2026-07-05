import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useAdminAuth } from '../hooks/useAdminAuth'
import createIcon from '../../assets/create.png'
import deleteIcon from '../../assets/delete.png'
import '../styles/AdminAwards.css'

const PAGE_SIZE = 8

export default function AdminAwards() {
  const navigate = useNavigate()
  const { session, loading: authLoading } = useAdminAuth()
  const [awards, setAwards] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [selected, setSelected] = useState([])
  const [deleteModal, setDeleteModal] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [toast, setToast] = useState(null)

  // Local Error Boundary to render any runtime/render errors inside this page
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props)
      this.state = { hasError: false, error: null, info: null }
    }
    static getDerivedStateFromError(error) { return { hasError: true, error } }
    componentDidCatch(error, info) { this.setState({ error, info }) }
    render() {
      if (this.state.hasError) {
        const node = (
          <div style={{ position: 'fixed', top: '64px', left: 16, right: 16, zIndex: 200000, background: '#fff6f6', color: '#7a1414', padding: 16, borderRadius: 8, margin: '0 auto', border: '1px solid #f5c6cb', maxWidth: 'calc(100% - 32px)' }}>
            <strong>Page error:</strong>
            <div style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>{String(this.state.error && this.state.error.message ? this.state.error.message : this.state.error)}</div>
            {this.state.info && this.state.info.componentStack && (
              <details style={{ marginTop: 8 }}>
                <summary>stack</summary>
                <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.info.componentStack}</pre>
              </details>
            )}
          </div>
        )

        if (typeof document !== 'undefined' && document.body) {
          return ReactDOM.createPortal(node, document.body)
        }

        return node
      }
      return this.props.children
    }
  }

  useEffect(() => {
    if (authLoading || !session) return
    fetchAwards()
  }, [search, page, authLoading, session])

  // Re-fetch when navigated back from form with a refresh flag in location.state
  const location = useLocation()
  useEffect(() => {
    if (location?.state?.refresh) {
      fetchAwards()
      // clear the refresh flag so it doesn't re-run unnecessarily
      try { navigate(location.pathname, { replace: true, state: {} }) } catch (e) { /* ignore */ }
    }
  }, [location?.state?.refresh])

  async function fetchAwards() {
    setLoading(true)
    setErrorMessage('')

    try {
      await supabase.auth.getSession()
      let query = supabase
        .from('awards')
        .select('id, title, image_path, created_at', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

      if (search) {
        query = query.ilike('title', `%${search}%`)
      }

      const { data, count, error } = await query
      if (error) throw error
      setAwards(data || [])
      setTotal(count ?? (data?.length || 0))
    } catch (e) {
      const message = e?.message || e?.error_description || JSON.stringify(e)
      console.error('Awards fetch failed:', message)
      setErrorMessage(message)
      showToast('Failed to load awards', 'error')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('awards').delete().eq('id', id)
    if (error) {
      showToast('Failed to delete award', 'error')
    } else {
      showToast('Award deleted', 'success')
      setDeleteModal(null)
      setSelected(prev => prev.filter(item => item !== id))
      fetchAwards()
    }
  }

  async function handleBulkDelete() {
    if (!selected.length) return
    const { error } = await supabase.from('awards').delete().in('id', selected)
    if (error) {
      showToast('Bulk delete failed', 'error')
    } else {
      showToast(`${selected.length} award${selected.length > 1 ? 's' : ''} deleted`, 'success')
      setSelected([])
      fetchAwards()
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
    setSelected(selected.length === awards.length ? [] : awards.map(item => item.id))
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const from = awards.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const to = Math.min(page * PAGE_SIZE, total)

  return (
    <ErrorBoundary>
      <div className="aa-page">
      {toast && (
        <div className={`aa-toast aa-toast--${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </div>
      )}

      {deleteModal && (
        <div className="aa-modal-overlay">
          <div className="aa-modal">
            <div className="aa-modal-icon">
              <img src={deleteIcon} alt="Delete" style={{ width: 48, height: 48, objectFit: 'contain' }} />
            </div>
            <h3 className="aa-modal-title">Delete Award?</h3>
            <p className="aa-modal-text">This award will be removed permanently.</p>
            <div className="aa-modal-actions">
              <button onClick={() => setDeleteModal(null)} className="aa-modal-cancel">Cancel</button>
              <button onClick={() => handleDelete(deleteModal)} className="aa-modal-delete">Delete Award</button>
            </div>
          </div>
        </div>
      )}

      <div className="aa-header">
        <div>
          <h1 className="aa-page-title">Awards</h1>
          <p className="aa-page-subtitle">Manage awards shown on the public site.</p>
        </div>
        <button onClick={() => navigate('/admin/awards/new')} className="aa-create-btn">
          <img src={createIcon} alt="Create" className="aa-create-icon" /> Create New Award
        </button>
      </div>

      {errorMessage && (
        <div className="aa-fetch-error">
          <strong>Fetch failed:</strong> {errorMessage}
        </div>
      )}

      {selected.length > 0 && (
        <div className="aa-bulk-bar">
          <span className="aa-bulk-text">{selected.length} selected</span>
          <button onClick={handleBulkDelete} className="aa-bulk-delete-btn">Delete Selected</button>
        </div>
      )}

      <div className="aa-filters-card">
        <div className="aa-filters-row">
          <div className="aa-search-wrap">
            <input
              className="aa-search-input"
              placeholder="Search awards by title..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
            />
          </div>
        </div>
      </div>

      <div className="aa-table-card">
        <div className="aa-overflow-wrapper">
          <table className="aa-table">
            <thead>
              <tr className="aa-table-head-row">
                <th className="aa-th aa-th-checkbox">
                  <input
                    type="checkbox"
                    checked={selected.length === awards.length && awards.length > 0}
                    onChange={toggleAll}
                    className="aa-checkbox"
                  />
                </th>
                <th className="aa-th aa-th-thumb">IMAGE</th>
                <th className="aa-th">TITLE</th>
                <th className="aa-th">CREATED</th>
                <th className="aa-th aa-th-actions">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5).fill(0).map((_, rowIndex) => (
                  <tr key={rowIndex} className="aa-row aa-row-skeleton">
                    {Array(5).fill(0).map((_, cellIndex) => (
                      <td key={cellIndex} className="aa-td"><div className="aa-skeleton" /></td>
                    ))}
                  </tr>
                ))
              ) : awards.length === 0 ? (
                <tr>
                  <td colSpan={5} className="aa-td aa-empty-cell">
                    No awards found. Click "Create New Award" to add one.
                  </td>
                </tr>
              ) : (
                awards.map((award, index) => (
                  <tr key={award.id} className={index % 2 === 0 ? 'aa-row aa-row-even' : 'aa-row aa-row-odd'}>
                    <td className="aa-td">
                      <input
                        type="checkbox"
                        checked={selected.includes(award.id)}
                        onChange={() => toggleSelect(award.id)}
                        className="aa-checkbox"
                      />
                    </td>
                    <td className="aa-td aa-thumb-cell">
                      <div className="aa-thumb-wrap">
                        {award.image_path ? (
                          <img src={award.image_path} alt={award.title} className="aa-thumb-img" />
                        ) : award.image ? (
                          <img src={award.image} alt={award.title} className="aa-thumb-img" />
                        ) : award.image_url ? (
                          <img src={award.image_url} alt={award.title} className="aa-thumb-img" />
                        ) : (
                          <div className="aa-thumb-placeholder">No image</div>
                        )}
                      </div>
                    </td>
                    <td className="aa-td aa-title-cell">
                      <span className="aa-title-text">{award.title || award.label || 'Untitled Award'}</span>
                    </td>
                    <td className="aa-td">
                      <span className="aa-date-text">{award.created_at ? new Date(award.created_at).toLocaleDateString() : '—'}</span>
                    </td>
                    <td className="aa-td">
                      <div className="aa-actions-cell">
                        <button onClick={() => navigate(`/admin/awards/${award.id}/edit`)} className="aa-action-btn" title="Edit">
                          <EditIcon />
                        </button>
                        <button onClick={() => setDeleteModal(award.id)} className="aa-action-btn aa-action-btn--danger" title="Delete">
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

        <div className="aa-pagination">
          <p className="aa-pagination-info">Showing {from}–{to} of {total}</p>
          <div className="aa-pagination-btns">
            <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1} className="aa-page-btn">← Previous</button>
            <span className="aa-page-indicator">{page} / {totalPages}</span>
            <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages} className="aa-page-btn">Next →</button>
          </div>
        </div>
      </div>
      </div>
    </ErrorBoundary>
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
    </svg>
  )
}
