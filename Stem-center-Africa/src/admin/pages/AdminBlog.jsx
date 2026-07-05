import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useAdminAuth } from '../hooks/useAdminAuth'
import createIcon from '../../assets/create.png'
import deleteIcon from '../../assets/delete.png'
import '../styles/AdminBlog.css'



const CATEGORIES = [
  'All Categories', 'Tinkering', 'Robotics & AI', 'Basic Computer',
  'Web Development', 'Community Stories', 'Career Readiness',
  'Arduino & IoT', 'Scratch',
]

const STATUSES = ['All Statuses', 'draft', 'published', 'archived']
const PAGE_SIZE = 4

export default function AdminBlogs() {
  const navigate = useNavigate()
  const { session, loading: authLoading } = useAdminAuth()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [status, setStatus] = useState('All Statuses')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [selected, setSelected] = useState([])
  const [deleteModal, setDeleteModal] = useState(null) // blog id to delete
  const [errorMessage, setErrorMessage] = useState('')
  const [toast, setToast] = useState(null)

  useEffect(() => {
    console.debug('AdminBlog auth state:', { authLoading, session })
    if (authLoading || !session) return
    fetchBlogs()
  }, [search, category, status, page, authLoading, session])

  async function fetchBlogs() {
    setLoading(true)
    setErrorMessage('')
    try {
      await supabase.auth.getSession()
      let query = supabase
        .from('blogs')
        .select('id, slug, title, subtitle, category, author, author_image, date, image, status, created_at', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

      if (search) query = query.ilike('title', `%${search}%`)
      if (category !== 'All Categories') query = query.eq('category', category)
      if (status !== 'All Statuses') query = query.eq('status', status)

      const { data, count, error } = await query
      if (error) throw error
      setBlogs(data || [])
      setTotal(count || 0)
    } catch (e) {
      const message = e?.message || e?.error_description || JSON.stringify(e)
      console.error('Blog fetch failed:', message)
      setErrorMessage(message)
      showToast('Failed to load blogs', 'error')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('blogs').delete().eq('id', id)
    if (error) {
      showToast('Failed to delete post', 'error')
    } else {
      showToast('Blog post deleted', 'success')
      setDeleteModal(null)
      fetchBlogs()
    }
  }

  async function handleBulkDelete() {
    const { error } = await supabase.from('blogs').delete().in('id', selected)
    if (error) {
      showToast('Bulk delete failed', 'error')
    } else {
      showToast(`${selected.length} posts deleted`, 'success')
      setSelected([])
      fetchBlogs()
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
    setSelected(selected.length === blogs.length ? [] : blogs.map(b => b.id))
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const from = (page - 1) * PAGE_SIZE + 1
  const to = Math.min(page * PAGE_SIZE, total)

  return (
    <div className="admin-blog-page">

      {/* Toast */}
      {toast && (
        <div className={`admin-blog-toast admin-blog-toast--${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="admin-blog-modal-overlay">
          <div className="admin-blog-modal">
            <div className="admin-blog-modal-icon">
              <img src={deleteIcon} alt="Delete" style={{ width: 48, height: 48, objectFit: 'contain' }} />
            </div>
            <h3 className="admin-blog-modal-title">Delete Blog Post?</h3>
            <p className="admin-blog-modal-text">This action cannot be undone. The post will be permanently removed.</p>
            <div className="admin-blog-modal-actions">
              <button onClick={() => setDeleteModal(null)} className="admin-blog-modal-cancel">Cancel</button>
              <button onClick={() => handleDelete(deleteModal)} className="admin-blog-modal-delete">Delete Post</button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="admin-blog-header">
        <div>
          <h1 className="admin-blog-page-title">Blog Posts</h1>
          <p className="admin-blog-page-subtitle">Manage and publish educational content across Africa</p>
        </div>
        <button onClick={() => navigate('/admin/blogs/new')} className="admin-blog-create-btn">
          <img src={createIcon} alt="Create" className="admin-blog-create-icon" /> Create New Blog
        </button>
      </div>
      {errorMessage && (
        <div className="admin-blog-fetch-error">
          <strong>Blog fetch failed:</strong> {errorMessage}
        </div>
      )}

      {/* Bulk Actions Bar */}
      {selected.length > 0 && (
        <div className="admin-blog-bulk-bar">
          <span className="admin-blog-bulk-text">{selected.length} post{selected.length > 1 ? 's' : ''} selected</span>
          <button onClick={handleBulkDelete} className="admin-blog-bulk-delete-btn">
            <TrashIcon /> Delete Selected
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="admin-blog-filters-card shadow-lg">
        <div className="admin-blog-filters-row">
          <div className="admin-blog-search-wrap">
            <SearchIcon className="admin-blog-search-icon" />
            <input
              className="admin-blog-search-input"
              placeholder="Search by title, author, category..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
            />
          </div>
          <select
            className="admin-blog-select"
            value={category}
            onChange={e => { setCategory(e.target.value); setPage(1) }}
          >
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select
            className="admin-blog-select"
            value={status}
            onChange={e => { setStatus(e.target.value); setPage(1) }}
          >
            {STATUSES.map(s => (
              <option key={s} value={s}>
                {s === 'All Statuses' ? s : s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="admin-blog-table-card">
        <div className="admin-blog-overflow-wrapper">
          <table className="admin-blog-table">
            <thead>
              <tr className="admin-blog-table-head-row">
                <th className="admin-blog-th admin-blog-th-checkbox">
                  <input
                    type="checkbox"
                    checked={selected.length === blogs.length && blogs.length > 0}
                    onChange={toggleAll}
                    className="admin-blog-checkbox"
                  />
                </th>
                <th className="admin-blog-th admin-blog-th-thumb">IMAGE</th>
                <th className="admin-blog-th">TITLE</th>
                <th className="admin-blog-th admin-blog-th-category">CATEGORY</th>
                <th className="admin-blog-th admin-blog-th-status">STATUS</th>
                <th className="admin-blog-th admin-blog-th-author">AUTHOR</th>
                <th className="admin-blog-th admin-blog-th-date">DATE</th>
                <th className="admin-blog-th admin-blog-th-actions">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="admin-blog-row admin-blog-row-skeleton">
                    {Array(8).fill(0).map((_, j) => (
                      <td key={j} className="admin-blog-td">
                        <div className="admin-blog-skeleton" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="admin-blog-td">
                    <EmptyState onAdd={() => navigate('/admin/blogs/new')} />
                  </td>
                </tr>
              ) : (
                blogs.map((blog, i) => (
                  <tr
                    key={blog.id}
                    className={i % 2 === 0 ? 'admin-blog-row admin-blog-row-even' : 'admin-blog-row admin-blog-row-odd'}
                  >
                    {/* Checkbox */}
                    <td className="admin-blog-td">
                      <input
                        type="checkbox"
                        checked={selected.includes(blog.id)}
                        onChange={() => toggleSelect(blog.id)}
                        className="admin-blog-checkbox"
                      />
                    </td>

                    {/* Thumbnail */}
                    <td className="admin-blog-td">
                      <div className="admin-blog-thumb-wrap">
                        {blog.image ? (
                          <img src={blog.image} alt="" className="admin-blog-thumb-img" />
                        ) : (
                          <div className="admin-blog-thumb-placeholder">📝</div>
                        )}
                      </div>
                    </td>

                    {/* Title */}
                    <td className="admin-blog-td">
                      <span className="admin-blog-title-text">{blog.title || '—'}</span>
                    </td>

                    {/* Category */}
                    <td className="admin-blog-td">
                      <span className="admin-blog-category-badge">{blog.category || '—'}</span>
                    </td>

                    {/* Status */}
                    <td className="admin-blog-td">
                      <span className={`admin-blog-status-badge ${blog.status || 'draft'}`}> 
                        {blog.status ? blog.status.charAt(0).toUpperCase() + blog.status.slice(1) : 'Draft'}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="admin-blog-td">
                      <div className="admin-blog-author-row">
                        {blog.author_image && (
                          <img src={blog.author_image} alt="" className="admin-blog-author-thumb" />
                        )}
                        <span className="admin-blog-author-name">{blog.author || '—'}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="admin-blog-td">
                      <span className="admin-blog-date-text">
                        {blog.date
                          ? new Date(blog.date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
                          : '—'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="admin-blog-td">
                      <div className="admin-blog-actions-row">
                        <button
                          onClick={() => navigate(`/admin/blogs/${blog.id}/edit`)}
                          className="admin-blog-edit-btn"
                          title="Edit post"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => setDeleteModal(blog.id)}
                          className="admin-blog-delete-btn"
                          title="Delete post"
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
          <div className="admin-blog-pagination">
            <span className="admin-blog-pagination-info">
              Showing {from}–{to} of {total} post{total !== 1 ? 's' : ''}
            </span>
            <div className="admin-blog-pagination-btns">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="admin-blog-page-btn"
              >
                ← Previous
              </button>
              <span className="admin-blog-page-indicator">{page} / {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="admin-blog-page-btn"
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
    <div className="admin-blog-empty-state">
      <div className="admin-blog-empty-icon">📝</div>
      <p className="admin-blog-empty-title">No blog posts yet</p>
      <p className="admin-blog-empty-message">Start creating content for your audience</p>
      <button onClick={onAdd} className="admin-blog-empty-btn">+ Create First Blog</button>
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

