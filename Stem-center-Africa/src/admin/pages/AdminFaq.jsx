import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useAdminAuth } from '../hooks/useAdminAuth'
import createIcon from '../../assets/create.png'
import deleteIcon from '../../assets/delete.png'
import '../styles/AdminFaq.css'

const PAGE_SIZE = 8

export default function AdminFaq() {
  const navigate = useNavigate()
  const { session, loading: authLoading } = useAdminAuth()
  const [faqs, setFaqs] = useState([])
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
    fetchFaqs()
  }, [search, page, authLoading, session])

  async function fetchFaqs() {
    setLoading(true)
    setErrorMessage('')

    try {
      await supabase.auth.getSession()
      let query = supabase
        .from('faqs')
        .select('id, question, answer, order, created_at', { count: 'exact' })
        .order('order', { ascending: true })
        .order('created_at', { ascending: false })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

      if (search) {
        const term = `%${search}%`
        query = query.or(`question.ilike.${term},answer.ilike.${term}`)
      }

      const { data, count, error } = await query
      if (error) throw error
      setFaqs(data || [])
      setTotal(count || 0)
    } catch (e) {
      const message = e?.message || e?.error_description || JSON.stringify(e)
      console.error('FAQ fetch failed:', message)
      setErrorMessage(message)
      showToast('Failed to load FAQs', 'error')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('faqs').delete().eq('id', id)
    if (error) {
      showToast('Failed to delete FAQ', 'error')
    } else {
      showToast('FAQ deleted', 'success')
      setDeleteModal(null)
      setSelected(prev => prev.filter(item => item !== id))
      fetchFaqs()
    }
  }

  async function handleBulkDelete() {
    if (!selected.length) return
    const { error } = await supabase.from('faqs').delete().in('id', selected)
    if (error) {
      showToast('Bulk delete failed', 'error')
    } else {
      showToast(`${selected.length} FAQ${selected.length > 1 ? 's' : ''} deleted`, 'success')
      setSelected([])
      fetchFaqs()
    }
  }

  function toggleSelect(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function toggleAll() {
    setSelected(selected.length === faqs.length ? [] : faqs.map(item => item.id))
  }

  function showToast(message, type = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const from = faqs.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const to = Math.min(page * PAGE_SIZE, total)

  return (
    <div className="af-page">
      {toast && (
        <div className={`af-toast af-toast--${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </div>
      )}

      {deleteModal && (
        <div className="af-modal-overlay">
          <div className="af-modal">
            <div className="af-modal-icon">
              <img src={deleteIcon} alt="Delete" style={{ width: 48, height: 48, objectFit: 'contain' }} />
            </div>
            <h3 className="af-modal-title">Delete FAQ?</h3>
            <p className="af-modal-text">This question will be permanently removed from the FAQ list.</p>
            <div className="af-modal-actions">
              <button onClick={() => setDeleteModal(null)} className="af-modal-cancel">Cancel</button>
              <button onClick={() => handleDelete(deleteModal)} className="af-modal-delete">Delete FAQ</button>
            </div>
          </div>
        </div>
      )}

      <div className="af-header">
        <div>
          <h1 className="af-page-title">FAQs</h1>
          <p className="af-page-subtitle">Manage frequently asked questions and answers shown on the public FAQ page.</p>
        </div>
        <button onClick={() => navigate('/admin/faqs/new')} className="af-create-btn">
          <img src={createIcon} alt="Create" className="af-create-icon" /> Create New FAQ
        </button>
      </div>

      {errorMessage && (
        <div className="af-fetch-error">
          <strong>Fetch failed:</strong> {errorMessage}
        </div>
      )}

      {selected.length > 0 && (
        <div className="af-bulk-bar">
          <span className="af-bulk-text">{selected.length} selected</span>
          <button onClick={handleBulkDelete} className="af-bulk-delete-btn">
            <TrashIcon /> Delete Selected
          </button>
        </div>
      )}

      <div className="af-filters-card">
        <div className="af-filters-row">
          <div className="af-search-wrap">
            <SearchIcon className="af-search-icon" />
            <input
              className="af-search-input"
              placeholder="Search by question or answer..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
            />
          </div>
        </div>
      </div>

      <div className="af-table-card">
        <div className="af-overflow-wrapper">
          <table className="af-table">
            <thead>
              <tr className="af-table-head-row">
                <th className="af-th af-th-checkbox">
                  <input
                    type="checkbox"
                    checked={selected.length === faqs.length && faqs.length > 0}
                    onChange={toggleAll}
                    className="af-checkbox"
                  />
                </th>
                <th className="af-th">QUESTION</th>
                <th className="af-th">ANSWER</th>
                <th className="af-th">ORDER</th>
                <th className="af-th af-th-actions">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(6).fill(0).map((_, rowIndex) => (
                  <tr key={rowIndex} className="af-row af-row-skeleton">
                    {Array(5).fill(0).map((_, cellIndex) => (
                      <td key={cellIndex} className="af-td"><div className="af-skeleton" /></td>
                    ))}
                  </tr>
                ))
              ) : faqs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="af-td af-empty-cell">
                    No FAQs found. Create the first FAQ using the button above.
                  </td>
                </tr>
              ) : (
                faqs.map((faq, index) => (
                  <tr key={faq.id} className={index % 2 === 0 ? 'af-row af-row-even' : 'af-row af-row-odd'}>
                    <td className="af-td">
                      <input
                        type="checkbox"
                        checked={selected.includes(faq.id)}
                        onChange={() => toggleSelect(faq.id)}
                        className="af-checkbox"
                      />
                    </td>
                    <td className="af-td af-question-cell">{faq.question}</td>
                    <td className="af-td af-answer-cell">{faq.answer}</td>
                    <td className="af-td"><span className="af-order-text">{faq.order}</span></td>
                    <td className="af-td">
                      <div className="af-actions-cell">
                        <button onClick={() => navigate(`/admin/faqs/${faq.id}/edit`)} className="af-action-btn" title="Edit">
                          <EditIcon />
                        </button>
                        <button onClick={() => setDeleteModal(faq.id)} className="af-action-btn af-action-btn--danger" title="Delete">
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

        <div className="af-pagination">
          <p className="af-pagination-info">Showing {from}–{to} of {total}</p>
          <div className="af-pagination-btns">
            <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1} className="af-page-btn">← Previous</button>
            <span className="af-page-indicator">{page} / {totalPages}</span>
            <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages} className="af-page-btn">Next →</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 22L18 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
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
    </svg>
  )
}
