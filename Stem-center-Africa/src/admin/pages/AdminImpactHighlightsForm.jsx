import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import deleteIcon from '../../assets/delete.png'
import uploadIcon from '../../assets/upload.png'
import '../styles/AdminImpactHighlightForm.css'

const MAX_IMAGES = 3

function resolveDisplayUrl(path) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  if (path.startsWith('/assets')) return path
  const { data } = supabase.storage.from('impact-highlights-images').getPublicUrl(path)
  return data?.publicUrl || ''
}

export default function AdminImpactHighlightForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)
  const fileInputRefs = [useRef(null), useRef(null), useRef(null)]

  const [form, setForm] = useState({
    title: '',
    content: '',
    summary: '',
    is_published: false,
    sort_order: 0,
  })

  // Each slot: null (empty) or { file: File|null, preview: string, path: string }
  // `path` holds the already-saved storage path/URL; `file` is set when a new
  // image is picked but not yet uploaded.
  const [gallery, setGallery] = useState([null, null, null])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isEdit) fetchHighlight()
  }, [id])

  async function fetchHighlight() {
    const { data, error } = await supabase
      .from('impact_highlights')
      .select('*')
      .eq('id', id)
      .single()
    if (error) { showToast('Failed to load highlight', 'error'); return }

    setForm({
      title: data.title || '',
      content: data.content || '',
      summary: data.summary || '',
      is_published: data.is_published || false,
      sort_order: data.sort_order ?? 0,
    })

    const existingPaths = Array.isArray(data.gallery_paths) && data.gallery_paths.length > 0
      ? data.gallery_paths
      : (data.image_path ? [data.image_path] : [])

    const slots = [null, null, null]
    existingPaths.slice(0, MAX_IMAGES).forEach((path, i) => {
      slots[i] = { file: null, path, preview: resolveDisplayUrl(path) }
    })
    setGallery(slots)
  }

  function validateFile(file) {
    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file', 'error')
      return false
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image must be under 5MB', 'error')
      return false
    }
    return true
  }

  function setSlotFile(index, file) {
    if (!validateFile(file)) return
    setGallery(g => {
      const next = [...g]
      next[index] = { file, path: next[index]?.path || '', preview: URL.createObjectURL(file) }
      return next
    })
  }

  function handleSlotSelect(index, e) {
    const file = e.target.files?.[0]
    if (file) setSlotFile(index, file)
    e.target.value = ''
  }

  function handleSlotDrop(index, e) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) setSlotFile(index, file)
  }

  function removeSlot(index, e) {
    e.stopPropagation()
    setGallery(g => {
      const next = [...g]
      next[index] = null
      return next
    })
  }

  async function uploadGallery() {
    setUploading(true)
    try {
      const results = []
      for (const slot of gallery) {
        if (!slot) continue
        if (slot.file) {
          const ext = slot.file.name.split('.').pop() || 'jpg'
          const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
          const { error: uploadError } = await supabase.storage
            .from('impact-highlights-images')
            .upload(path, slot.file, { upsert: true })
          if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`)

          const { data: urlData, error: urlError } = supabase.storage
            .from('impact-highlights-images')
            .getPublicUrl(path)
          if (urlError || !urlData?.publicUrl) throw new Error('Failed to generate image URL')

          results.push(urlData.publicUrl)
        } else {
          results.push(slot.path)
        }
      }
      return results
    } finally {
      setUploading(false)
    }
  }

  function validate() {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    if (!form.content.trim()) errs.content = 'Content is required'
    if (gallery.every(s => !s)) errs.gallery = 'Add at least one photo'
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
      const galleryPaths = await uploadGallery()
      const payload = {
        ...form,
        gallery_paths: galleryPaths,
        image_path: galleryPaths[0] || '',
        updated_at: new Date().toISOString(),
      }
      if (!isEdit) payload.created_at = new Date().toISOString()

      const { error } = isEdit
        ? await supabase.from('impact_highlights').update(payload).eq('id', id)
        : await supabase.from('impact_highlights').insert([payload])

      if (error) throw error
      showToast(isEdit ? 'Highlight updated!' : 'Highlight created!', 'success')
      setTimeout(() => navigate('/admin/impact-highlights'), 1200)
    } catch (e) {
      showToast(e.message || 'Save failed', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    const { error } = await supabase.from('impact_highlights').delete().eq('id', id)
    if (error) { showToast('Delete failed', 'error'); return }
    showToast('Highlight deleted', 'success')
    setTimeout(() => navigate('/admin/impact-highlights'), 1000)
  }

  function showToast(message, type = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="aihf-page">

      {/* Toast */}
      {toast && (
        <div className={`aihf-toast aihf-toast--${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="aihf-modal-overlay">
          <div className="aihf-modal">
            <div className="aihf-modal-icon">
              <img src={deleteIcon} alt="Delete" style={{ width: 48, height: 48, objectFit: 'contain' }} />
            </div>
            <h3 className="aihf-modal-title">Delete This Highlight?</h3>
            <p className="aihf-modal-text">This action cannot be undone.</p>
            <div className="aihf-modal-actions">
              <button onClick={() => setDeleteModal(false)} className="aihf-modal-cancel">Cancel</button>
              <button onClick={handleDelete} className="aihf-modal-delete">Delete Highlight</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Row 1: Header (full width) ─────────────────────────────────── */}
      <div className="row">
        <div className="col-12">
          <div className="aihf-header">
            <div className="aihf-header-left">
              <button onClick={() => navigate('/admin/impact-highlights')} className="aihf-back-btn">
                <BackIcon />
              </button>
              <div>
                <p className="aihf-breadcrumb">Dashboard › Impact Highlights › {isEdit ? 'Edit Highlight' : 'Create Highlight'}</p>
                <h1 className="aihf-page-title">{isEdit ? 'Edit Highlight' : 'Create Highlight'}</h1>
              </div>
            </div>
            <div className="aihf-header-right">
              <button onClick={() => navigate('/admin/impact-highlights')} className="aihf-cancel-btn">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="aihf-save-btn">
                {saving ? 'Saving…' : 'Save Highlight'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: Left (8) / Right (4) ────────────────────────────────── */}
      <div className="row aihf-body-row">

        {/* Left column: Basic Info + Settings */}
        <div className="col-md-8 aihf-col-left">

          <div className="aihf-card shadow-lg">
            <div className="aihf-card-header">
              <InfoIcon />
              <span className="aihf-card-label">Basic Info</span>
            </div>

            <div className="aihf-field">
              <label className="aihf-label">Title <span className="aihf-required">*</span></label>
              <input
                className={`aihf-input${errors.title ? ' aihf-input--error' : ''}`}
                placeholder="e.g. 500+ Students Trained in Robotics"
                value={form.title}
                onChange={e => {
                  setForm(f => ({ ...f, title: e.target.value }))
                  if (errors.title) setErrors(er => ({ ...er, title: '' }))
                }}
              />
              {errors.title && <span className="aihf-error-msg">{errors.title}</span>}
            </div>

            <div className="aihf-field aihf-field--last">
              <label className="aihf-label">Content <span className="aihf-required">*</span></label>
              <textarea
                className={`aihf-textarea${errors.content ? ' aihf-input--error' : ''}`}
                rows={8}
                placeholder="Write the full impact story or description..."
                value={form.content}
                onChange={e => {
                  setForm(f => ({ ...f, content: e.target.value }))
                  if (errors.content) setErrors(er => ({ ...er, content: '' }))
                }}
              />
              {errors.content && <span className="aihf-error-msg">{errors.content}</span>}
            </div>
          </div>

          <div className="aihf-card shadow-lg">
            <div className="aihf-card-header">
              <SettingsIcon />
              <span className="aihf-card-label">Settings</span>
            </div>

            <div className="aihf-toggle-row">
              <div>
                <p className="aihf-toggle-label">Published</p>
                <p className="aihf-toggle-desc">Make this highlight visible on the public website</p>
              </div>
              <button
                className={`aihf-toggle${form.is_published ? ' aihf-toggle--on' : ''}`}
                onClick={() => setForm(f => ({ ...f, is_published: !f.is_published }))}
                aria-pressed={form.is_published}
              >
                <span className="aihf-toggle-thumb" />
              </button>
            </div>

            <div className="aihf-field aihf-field--last" style={{ marginTop: '16px' }}>
              <label className="aihf-label">Sort Order</label>
              <input
                type="number"
                className="aihf-input aihf-input--short"
                placeholder="0"
                value={form.sort_order}
                onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))}
              />
              <span className="aihf-help-text">Lower numbers appear first. Use 0, 1, 2…</span>
            </div>
          </div>

          {isEdit && (
            <div className="aihf-danger-zone">
              <button onClick={() => setDeleteModal(true)} className="aihf-delete-link-btn">
                <TrashIcon /> DELETE THIS HIGHLIGHT
              </button>
            </div>
          )}

        </div>

        {/* Right column: Gallery Upload + Footer actions */}
        <div className="col-md-4 aihf-col-right">

          <div className="aihf-card shadow-lg">
            <div className="aihf-card-header">
              <ImageIcon />
              <span className="aihf-card-label">Photos</span>
            </div>

            <div className="aihf-field aihf-field--last">
              <label className="aihf-label">Evidence Photos (up to {MAX_IMAGES})</label>

              <div className="aihf-gallery-grid">
                {[0, 1, 2].map(index => {
                  const slot = gallery[index]
                  return (
                    <div
                      key={index}
                      className="aihf-gallery-slot"
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => handleSlotDrop(index, e)}
                      onClick={() => fileInputRefs[index].current?.click()}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRefs[index]}
                        className="aihf-file-input"
                        onChange={e => handleSlotSelect(index, e)}
                      />
                      {slot?.preview ? (
                        <div className="aihf-gallery-slot-preview">
                          <img src={slot.preview} alt={`Evidence ${index + 1}`} className="aihf-gallery-slot-img" />
                          <button
                            type="button"
                            className="aihf-remove-image-btn"
                            onClick={e => removeSlot(index, e)}
                            aria-label="Remove image"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="aihf-gallery-slot-empty">
                          <img src={uploadIcon} alt="Upload icon" className="aihf-gallery-slot-icon" />
                          <p className="aihf-gallery-slot-label">Photo {index + 1}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {errors.gallery && <span className="aihf-error-msg">{errors.gallery}</span>}
              {uploading && <span className="aihf-uploading">Uploading photos…</span>}
              <span className="aihf-help-text">PNG, JPG, WEBP up to 5MB each. Uploaded to the impact-highlights-images storage bucket.</span>
            </div>
          </div>

          <div className="aihf-footer-bar">
            <button onClick={() => navigate('/admin/impact-highlights')} className="aihf-cancel-btn">
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving} className="aihf-save-btn">
              {saving ? 'Saving…' : 'Save Highlight'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function BackIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15,18 9,12 15,6" /></svg>
}
function InfoIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
}
function ImageIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21,15 16,10 5,21" /></svg>
}
function SettingsIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
}
function TrashIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3,6 5,6 21,6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" /></svg>
}
