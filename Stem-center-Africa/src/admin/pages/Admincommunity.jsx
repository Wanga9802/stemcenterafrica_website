import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAdminAuth } from '../hooks/useAdminAuth'
import '../styles/AdminCommunity.css'

const PAGE_SIZE = 8

const DESCRIBES_YOU_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'student', label: 'Student' },
  { value: 'professional', label: 'Working Professional' },
  { value: 'educator', label: 'Educator' },
  { value: 'parent', label: 'Parent' },
  { value: 'other', label: 'Other' },
]

const INTEREST_OPTIONS = [
  'Web Development',
  'Robotics & Embedded Systems',
  'Arduino & IoT',
  'Python Programming',
  'Basic Computer Skills',
  'Scratch for Kids',
]

export default function AdminCommunity() {
  const { session, loading: authLoading } = useAdminAuth()

  const [view, setView] = useState('subscribers') // 'subscribers' | 'compose' | 'history'

  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [describesYouFilter, setDescribesYouFilter] = useState('')
  const [interestFilter, setInterestFilter] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [selected, setSelected] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [toast, setToast] = useState(null)

  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)

  const [history, setHistory] = useState([])
  const [historyLoading, setHistoryLoading] = useState(true)
  const [historyPage, setHistoryPage] = useState(1)
  const [historyTotal, setHistoryTotal] = useState(0)

  useEffect(() => {
    if (authLoading || !session) return
    fetchSubscribers()
  }, [search, describesYouFilter, interestFilter, page, authLoading, session])

  useEffect(() => {
    if (authLoading || !session) return
    if (view === 'history') fetchHistory()
  }, [view, historyPage, authLoading, session])

  async function fetchHistory() {
    setHistoryLoading(true)
    try {
      const { data, count, error } = await supabase
        .from('campaign_sends')
        .select('id, subject, recipient_count, sent_by_email, status, created_at', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((historyPage - 1) * PAGE_SIZE, historyPage * PAGE_SIZE - 1)

      if (error) throw error

      setHistory(data || [])
      setHistoryTotal(count || 0)
    } catch (e) {
      showToast('Failed to load send history', 'error')
    } finally {
      setHistoryLoading(false)
    }
  }

  async function fetchSubscribers() {
    setLoading(true)
    setErrorMessage('')
    try {
      let query = supabase
        .from('community_signups')
        .select('id, first_name, last_name, email, describes_you, interests, created_at', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

      if (search) {
        query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`)
      }
      if (describesYouFilter) {
        query = query.eq('describes_you', describesYouFilter)
      }
      if (interestFilter) {
        query = query.contains('interests', [interestFilter])
      }

      const { data, count, error } = await query
      if (error) throw error

      setSubscribers(data || [])
      setTotal(count || 0)
    } catch (e) {
      const message = e?.message || JSON.stringify(e)
      setErrorMessage(message)
      showToast('Failed to load subscribers', 'error')
    } finally {
      setLoading(false)
    }
  }

  function showToast(message, type = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  function toggleSelect(id) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function toggleAll() {
    setSelected(selected.length === subscribers.length ? [] : subscribers.map((s) => s.id))
  }

  async function handleSend() {
    if (!subject.trim() || !body.trim()) {
      showToast('Please fill in both subject and message', 'error')
      return
    }
    if (selected.length === 0) {
      showToast('Select at least one subscriber first', 'error')
      return
    }

    setSending(true)
    try {
      const { data, error } = await supabase.functions.invoke('send-campaign', {
        body: { subject, body, recipientIds: selected },
      })

      if (error) throw error

      showToast(`Sent to ${data?.recipientCount ?? selected.length} subscriber${selected.length > 1 ? 's' : ''}`, 'success')
      setSubject('')
      setBody('')
      setSelected([])
      setView('subscribers')
      setHistoryPage(1)
    } catch (e) {
      showToast('Send failed: ' + (e?.message || 'unknown error'), 'error')
    } finally {
      setSending(false)
    }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const from = (page - 1) * PAGE_SIZE + 1
  const to = Math.min(page * PAGE_SIZE, total)

  return (
    <div className="ac-page">

      {toast && (
        <div className={`ac-toast ac-toast--${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </div>
      )}

      {/* Page Header */}
      <div className="ac-header">
        <div>
          <h1 className="ac-page-title">Community</h1>
          <p className="ac-page-subtitle">View subscribers and send updates</p>
        </div>
      </div>

      {/* Toggle */}
      <div className="ac-toggle">
        <button
          className={`ac-toggle-btn ${view === 'subscribers' ? 'ac-toggle-btn--active' : ''}`}
          onClick={() => setView('subscribers')}
        >
          Subscribers
        </button>
        <button
          className={`ac-toggle-btn ${view === 'compose' ? 'ac-toggle-btn--active' : ''}`}
          onClick={() => setView('compose')}
        >
          Compose
          {selected.length > 0 && <span className="ac-toggle-badge">{selected.length}</span>}
        </button>
        <button
          className={`ac-toggle-btn ${view === 'history' ? 'ac-toggle-btn--active' : ''}`}
          onClick={() => setView('history')}
        >
          History
        </button>
      </div>

      {errorMessage && (
        <div className="ac-fetch-error">
          <strong>Fetch failed:</strong> {errorMessage}
        </div>
      )}

      {view === 'subscribers' && (
        <>
          {/* Filters */}
          <div className="ac-filters-card shadow-lg">
            <div className="ac-filters-row">
              <div className="ac-search-wrap">
                <SearchIcon className="ac-search-icon" />
                <input
                  className="ac-search-input"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                />
              </div>
              <select
                className="ac-select"
                value={describesYouFilter}
                onChange={(e) => { setDescribesYouFilter(e.target.value); setPage(1) }}
              >
                {DESCRIBES_YOU_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <select
                className="ac-select"
                value={interestFilter}
                onChange={(e) => { setInterestFilter(e.target.value); setPage(1) }}
              >
                <option value="">All interests</option>
                {INTEREST_OPTIONS.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="ac-table-card shadow-lg">
            <div className="ac-overflow-wrapper">
              <table className="ac-table">
                <thead>
                  <tr className="ac-table-head-row">
                    <th className="ac-th ac-th-checkbox">
                      <input
                        type="checkbox"
                        checked={selected.length === subscribers.length && subscribers.length > 0}
                        onChange={toggleAll}
                        className="ac-checkbox"
                      />
                    </th>
                    <th className="ac-th">NAME</th>
                    <th className="ac-th">EMAIL</th>
                    <th className="ac-th ac-th-describes">DESCRIBES</th>
                    <th className="ac-th ac-th-interests">INTERESTS</th>
                    <th className="ac-th ac-th-date">JOINED</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array(4).fill(0).map((_, i) => (
                      <tr key={i} className="ac-row ac-row-skeleton">
                        {Array(6).fill(0).map((_, j) => (
                          <td key={j} className="ac-td"><div className="ac-skeleton" /></td>
                        ))}
                      </tr>
                    ))
                  ) : subscribers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="ac-td">
                        <EmptyState />
                      </td>
                    </tr>
                  ) : (
                    subscribers.map((sub, i) => (
                      <tr key={sub.id} className={i % 2 === 0 ? 'ac-row ac-row-even' : 'ac-row ac-row-odd'}>
                        <td className="ac-td">
                          <input
                            type="checkbox"
                            checked={selected.includes(sub.id)}
                            onChange={() => toggleSelect(sub.id)}
                            className="ac-checkbox"
                          />
                        </td>
                        <td className="ac-td">
                          <span className="ac-name-text">{sub.first_name} {sub.last_name}</span>
                        </td>
                        <td className="ac-td">
                          <span className="ac-email-text">{sub.email}</span>
                        </td>
                        <td className="ac-td">
                          <span className="ac-describes-badge">
                            {DESCRIBES_YOU_OPTIONS.find((o) => o.value === sub.describes_you)?.label || sub.describes_you || '—'}
                          </span>
                        </td>
                        <td className="ac-td">
                          <div className="ac-interest-tags">
                            {(sub.interests || []).slice(0, 2).map((interest) => (
                              <span key={interest} className="ac-interest-tag">{interest}</span>
                            ))}
                            {(sub.interests || []).length > 2 && (
                              <span className="ac-interest-tag ac-interest-tag--more">
                                +{sub.interests.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="ac-td">
                          <span className="ac-date-text">
                            {sub.created_at
                              ? new Date(sub.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
                              : '—'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {total > 0 && (
              <div className="ac-pagination">
                <span className="ac-pagination-info">
                  Showing {from}–{to} of {total} subscriber{total !== 1 ? 's' : ''}
                </span>
                <div className="ac-pagination-btns">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="ac-page-btn"
                  >
                    ← Previous
                  </button>
                  <span className="ac-page-indicator">{page} / {totalPages}</span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="ac-page-btn"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {view === 'compose' && (
        /* Compose view */
        <div className="ac-compose-card shadow-lg rounded-0">
          <div className="ac-compose-recipient-line">
            {selected.length === 0 ? (
              <span className="ac-compose-warning">
                No subscribers selected — go to the Subscribers tab and pick recipients first.
              </span>
            ) : (
              <span className="ac-compose-count">
                Sending to <strong>{selected.length}</strong> subscriber{selected.length > 1 ? 's' : ''}
              </span>
            )}
          </div>

          <div className="ac-compose-field">
            <label className="ac-compose-label">Subject</label>
            <input
              className="ac-compose-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. New STEM Center Africa event this month"
            />
          </div>

          <div className="ac-compose-field">
            <label className="ac-compose-label">Message</label>
            <textarea
              className="ac-compose-textarea"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={10}
              placeholder="Write your update here..."
            />
          </div>

          <button
            className="ac-compose-send-btn"
            onClick={handleSend}
            disabled={sending || selected.length === 0}
          >
            {sending ? 'Sending…' : 'Send Update'}
          </button>
        </div>
      )}

      {view === 'history' && (
        <div className="ac-table-card">
          <div className="ac-overflow-wrapper">
            <table className="ac-table">
              <thead>
                <tr className="ac-table-head-row">
                  <th className="ac-th">SUBJECT</th>
                  <th className="ac-th ac-th-date">RECIPIENTS</th>
                  <th className="ac-th">SENT BY</th>
                  <th className="ac-th ac-th-describes">STATUS</th>
                  <th className="ac-th ac-th-date">DATE</th>
                </tr>
              </thead>
              <tbody>
                {historyLoading ? (
                  Array(4).fill(0).map((_, i) => (
                    <tr key={i} className="ac-row ac-row-skeleton">
                      {Array(5).fill(0).map((_, j) => (
                        <td key={j} className="ac-td"><div className="ac-skeleton" /></td>
                      ))}
                    </tr>
                  ))
                ) : history.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="ac-td">
                      <div className="ac-empty-state">
                        <div className="ac-empty-icon">📨</div>
                        <p className="ac-empty-title">No sends yet</p>
                        <p className="ac-empty-message">Updates you send will show up here</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  history.map((h, i) => (
                    <tr key={h.id} className={i % 2 === 0 ? 'ac-row ac-row-even' : 'ac-row ac-row-odd'}>
                      <td className="ac-td">
                        <span className="ac-name-text">{h.subject}</span>
                      </td>
                      <td className="ac-td">
                        <span className="ac-date-text">{h.recipient_count}</span>
                      </td>
                      <td className="ac-td">
                        <span className="ac-email-text">{h.sent_by_email || '—'}</span>
                      </td>
                      <td className="ac-td">
                        <span className={`ac-status-badge ac-status--${h.status}`}>
                          {h.status.charAt(0).toUpperCase() + h.status.slice(1)}
                        </span>
                      </td>
                      <td className="ac-td">
                        <span className="ac-date-text">
                          {h.created_at
                            ? new Date(h.created_at).toLocaleString('en-KE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                            : '—'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {historyTotal > 0 && (
            <div className="ac-pagination">
              <span className="ac-pagination-info">
                Showing {(historyPage - 1) * PAGE_SIZE + 1}–{Math.min(historyPage * PAGE_SIZE, historyTotal)} of {historyTotal} send{historyTotal !== 1 ? 's' : ''}
              </span>
              <div className="ac-pagination-btns">
                <button
                  onClick={() => setHistoryPage((p) => Math.max(1, p - 1))}
                  disabled={historyPage === 1}
                  className="ac-page-btn"
                >
                  ← Previous
                </button>
                <span className="ac-page-indicator">{historyPage} / {Math.ceil(historyTotal / PAGE_SIZE)}</span>
                <button
                  onClick={() => setHistoryPage((p) => Math.min(Math.ceil(historyTotal / PAGE_SIZE), p + 1))}
                  disabled={historyPage === Math.ceil(historyTotal / PAGE_SIZE)}
                  className="ac-page-btn"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="ac-empty-state">
      <div className="ac-empty-icon">👥</div>
      <p className="ac-empty-title">No subscribers yet</p>
      <p className="ac-empty-message">Signups from the public engagement form will appear here</p>
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
