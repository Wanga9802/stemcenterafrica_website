import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import deleteIcon from '../../assets/delete.png'
import '../styles/AdminFaqForm.css'

export default function AdminFaqForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [form, setForm] = useState({
    question: '',
    answer: '',
    order: 0,
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isEdit) fetchFaq()
  }, [id])

  async function fetchFaq() {
    setLoading(true)
    const { data, error } = await supabase.from('faqs').select('*').eq('id', id).single()
    if (error) {
      showToast('Failed to load FAQ', 'error')
      setLoading(false)
      return
    }
    setForm({
      question: data.question || '',
      answer: data.answer || '',
      order: data.order ?? 0,
    })
    setLoading(false)
  }

  function validate() {
    const errs = {}
    if (!form.question.trim()) errs.question = 'Question is required'
    if (!form.answer.trim()) errs.answer = 'Answer is required'
    return errs
  }

  async function handleSave() {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      showToast('Please fix the errors below', 'error')
      return
    }

    setSaving(true)
    try {
      const payload = {
        question: form.question,
        answer: form.answer,
        order: Number(form.order || 0),
        updated_at: new Date().toISOString(),
      }

      if (!isEdit) {
        payload.created_at = new Date().toISOString()
      }

      const { error } = isEdit
        ? await supabase.from('faqs').update(payload).eq('id', id)
        : await supabase.from('faqs').insert([payload])

      if (error) throw error
      showToast(isEdit ? 'FAQ updated!' : 'FAQ created!', 'success')
      setTimeout(() => navigate('/admin/faqs'), 1200)
    } catch (e) {
      showToast(e.message || 'Save failed', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    const { error } = await supabase.from('faqs').delete().eq('id', id)
    if (error) {
      showToast('Delete failed', 'error')
      return
    }
    showToast('FAQ deleted', 'success')
    setTimeout(() => navigate('/admin/faqs'), 1000)
  }

  function showToast(message, type = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="admin-faq-form-page">
      {toast && (
        <div className={`admin-faq-form-toast admin-faq-form-toast--${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </div>
      )}

      {deleteModal && (
        <div className="admin-faq-form-modal-overlay">
          <div className="admin-faq-form-modal">
            <div className="admin-faq-form-modal-icon">
              <img src={deleteIcon} alt="Delete" style={{ width: 48, height: 48, objectFit: 'contain' }} />
            </div>
            <h3 className="admin-faq-form-modal-title">Delete FAQ?</h3>
            <p className="admin-faq-form-modal-text">This action permanently removes the question and answer.</p>
            <div className="admin-faq-form-modal-actions">
              <button onClick={() => setDeleteModal(false)} className="admin-faq-form-modal-cancel">Cancel</button>
              <button onClick={handleDelete} className="admin-faq-form-modal-delete">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Row 1: Header (full width) ─────────────────────────────────── */}
      <div className="row">
        <div className="col-12">
          <div className="admin-faq-form-header">
            <div className="admin-faq-form-header-left">
              <button onClick={() => navigate('/admin/faqs')} className="admin-faq-form-back-btn">
                <BackIcon />
              </button>
              <div>
                <p className="admin-faq-form-breadcrumb">Dashboard › FAQs › {isEdit ? 'Edit FAQ' : 'Create FAQ'}</p>
                <h1 className="admin-faq-form-title">{isEdit ? 'Edit FAQ' : 'Create FAQ'}</h1>
              </div>
            </div>
            <div className="admin-faq-form-actions">
              <button onClick={() => navigate('/admin/faqs')} className="admin-faq-form-cancel-btn">Cancel</button>
              <button onClick={handleSave} className="admin-faq-form-save-btn" disabled={saving || loading}>
                {saving ? 'Saving…' : 'Save FAQ'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: Single full-width card ────────────────────────────────── */}
      <div className="row">
        <div className="col-12">
          <div className="admin-faq-form-card shadow-lg">

            <div className="admin-faq-form-field">
              <label className="admin-faq-form-label">Question</label>
              <input
                className={`admin-faq-form-input${errors.question ? ' admin-faq-form-input--error' : ''}`}
                value={form.question}
                onChange={e => { setForm(f => ({ ...f, question: e.target.value })); if (errors.question) setErrors(er => ({ ...er, question: '' })) }}
                placeholder="Enter the FAQ question"
              />
              {errors.question && <span className="admin-faq-form-error">{errors.question}</span>}
            </div>

            <div className="admin-faq-form-field">
              <label className="admin-faq-form-label">Answer</label>
              <textarea
                className={`admin-faq-form-textarea${errors.answer ? ' admin-faq-form-input--error' : ''}`}
                value={form.answer}
                rows={8}
                onChange={e => { setForm(f => ({ ...f, answer: e.target.value })); if (errors.answer) setErrors(er => ({ ...er, answer: '' })) }}
                placeholder="Enter the FAQ answer"
              />
              {errors.answer && <span className="admin-faq-form-error">{errors.answer}</span>}
            </div>

            <div className="admin-faq-form-field admin-faq-form-field--small admin-faq-form-field--last">
              <label className="admin-faq-form-label">Order</label>
              <input
                type="number"
                className="admin-faq-form-input"
                value={form.order}
                onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                placeholder="Display order"
              />
              <span className="admin-faq-form-help-text">Lower numbers appear first. Use 0, 1, 2…</span>
            </div>

          </div>

          {isEdit && (
            <div className="admin-faq-form-delete-row">
              <button onClick={() => setDeleteModal(true)} className="admin-faq-form-delete-btn">
                <TrashIcon /> DELETE THIS FAQ
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function BackIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15,18 9,12 15,6" /></svg>
}
function TrashIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3,6 5,6 21,6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" /></svg>
}