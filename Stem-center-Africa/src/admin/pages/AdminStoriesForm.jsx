import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import uploadIcon from '../../assets/upload.png'
import '../styles/AdminStoriesForm.css'

export default function AdminStoriesForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)
  const fileInputRef = useRef(null)

  const [form, setForm] = useState({
    title: '',
    content: '',
    story_date: '',
    image_url: '',
  })

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isEdit) fetchStory()
  }, [id])

  async function fetchStory() {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('id', id)
      .single()
    if (error) { showToast('Failed to load story', 'error'); return }

    setForm({
      title: data.title || '',
      content: data.content || '',
      story_date: data.story_date || '',
      image_url: data.image_url || '',
    })
    setImageFile(null)
    setImagePreview(data.image_url || '')
  }

  function handleImageSelect(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file', 'error')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image must be under 5MB', 'error')
      return
    }

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  function handleDrop(e) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      showToast('Please drop an image file', 'error')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image must be under 5MB', 'error')
      return
    }

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  async function uploadFile() {
    if (!imageFile) return form.image_url

    setUploading(true)
    try {
      const ext = imageFile.name.split('.').pop() || 'jpg'
      const path = `story-images/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('story-images')
        .upload(path, imageFile, { upsert: true })

      if (uploadError) {
        throw new Error(`Image upload failed: ${uploadError.message || uploadError}`)
      }

      const { data: urlData, error: urlError } = supabase.storage
        .from('story-images')
        .getPublicUrl(path)

      if (urlError || !urlData?.publicUrl) {
        throw new Error(`Failed to generate image URL${urlError ? `: ${urlError.message}` : ''}`)
      }

      return urlData.publicUrl
    } finally {
      setUploading(false)
    }
  }

  function removeImage(e) {
    e.stopPropagation()
    setImageFile(null)
    setImagePreview('')
    setForm(f => ({ ...f, image_url: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    if (!form.content.trim()) errs.content = 'Content is required'
    if (!form.story_date) errs.story_date = 'Story date is required'
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
      const uploadedImageUrl = await uploadFile()
      const payload = {
        ...form,
        image_url: uploadedImageUrl || form.image_url,
        updated_at: new Date().toISOString(),
      }
      if (!isEdit) payload.created_at = new Date().toISOString()

      const { error } = isEdit
        ? await supabase.from('stories').update(payload).eq('id', id)
        : await supabase.from('stories').insert([payload])

      if (error) throw error
      showToast(isEdit ? 'Story updated!' : 'Story created!', 'success')
      setTimeout(() => navigate('/admin/stories'), 1200)
    } catch (e) {
      showToast(e.message || 'Save failed', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    const { error } = await supabase.from('stories').delete().eq('id', id)
    if (error) { showToast('Delete failed', 'error'); return }
    showToast('Story deleted', 'success')
    setTimeout(() => navigate('/admin/stories'), 1000)
  }

  function showToast(message, type = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="asf-page">

      {/* Toast */}
      {toast && (
        <div className={`asf-toast asf-toast--${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="asf-modal-overlay">
          <div className="asf-modal">
            <div className="asf-modal-icon">🗑</div>
            <h3 className="asf-modal-title">Delete This Story?</h3>
            <p className="asf-modal-text">This action cannot be undone.</p>
            <div className="asf-modal-actions">
              <button onClick={() => setDeleteModal(false)} className="asf-modal-cancel">Cancel</button>
              <button onClick={handleDelete} className="asf-modal-delete">Delete Story</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Row 1: Header (full width) ─────────────────────────────────── */}
      <div className="row">
        <div className="col-12">
          <div className="asf-header">
            <div className="asf-header-left">
              <button onClick={() => navigate('/admin/stories')} className="asf-back-btn">
                <BackIcon />
              </button>
              <div>
                <p className="asf-breadcrumb">Dashboard &rsaquo; Stories &rsaquo; {isEdit ? 'Edit Story' : 'Create Story'}</p>
                <h1 className="asf-page-title">{isEdit ? 'Edit Story' : 'Create Story'}</h1>
              </div>
            </div>
            <div className="asf-header-right">
              <button onClick={() => navigate('/admin/stories')} className="asf-cancel-btn">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="asf-save-btn"
              >
                {saving ? 'Saving…' : 'Save Story'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: Left (8) / Right (4) ────────────────────────────────── */}
      <div className="row asf-body-row">

        {/* Left column: Basic Info + Story Content */}
        <div className="col-md-8 asf-col-left">

          <div className="asf-card shadow-lg">
            <div className="asf-card-header">
              <InfoIcon />
              <span className="asf-card-label">Basic Info</span>
            </div>

            <div className="asf-field">
              <label className="asf-label">Story Title</label>
              <input
                className={`asf-input${errors.title ? ' asf-input--error' : ''}`}
                placeholder="Title of the success story"
                value={form.title}
                onChange={e => {
                  setForm(f => ({ ...f, title: e.target.value }))
                  if (errors.title) setErrors(er => ({ ...er, title: '' }))
                }}
              />
              {errors.title && <span className="asf-error-msg">{errors.title}</span>}
            </div>

            <div className="asf-field asf-field--last">
              <label className="asf-label">Story Date</label>
              <input
                type="date"
                className={`asf-input${errors.story_date ? ' asf-input--error' : ''}`}
                value={form.story_date}
                onChange={e => {
                  setForm(f => ({ ...f, story_date: e.target.value }))
                  if (errors.story_date) setErrors(er => ({ ...er, story_date: '' }))
                }}
              />
              {errors.story_date && <span className="asf-error-msg">{errors.story_date}</span>}
            </div>
          </div>

          <div className="asf-card shadow-lg">
            <div className="asf-card-header">
              <BlockIcon />
              <span className="asf-card-label">Story Content</span>
            </div>

            <div className="asf-field asf-field--last">
              <label className="asf-label">Story Content</label>
              <textarea
                className={`asf-textarea${errors.content ? ' asf-textarea--error' : ''}`}
                rows={10}
                placeholder="Write the complete story here. Markdown formatting is supported."
                value={form.content}
                onChange={e => {
                  setForm(f => ({ ...f, content: e.target.value }))
                  if (errors.content) setErrors(er => ({ ...er, content: '' }))
                }}
              />
              {errors.content && <span className="asf-error-msg">{errors.content}</span>}
              <span className="asf-help-text">Be descriptive and engaging. This is the main content of your story.</span>
            </div>
          </div>

          {isEdit && (
            <div className="asf-danger-zone">
              <button onClick={() => setDeleteModal(true)} className="asf-delete-link-btn">
                <TrashIcon /> DELETE THIS STORY
              </button>
            </div>
          )}

        </div>

        {/* Right column: Featured Image + Footer actions */}
        <div className="col-md-4 asf-col-right">

          <div className="asf-card shadow-lg">
            <div className="asf-card-header">
              <LinkIcon />
              <span className="asf-card-label">Featured Image</span>
            </div>

            <div className="asf-field asf-field--last">
              <label className="asf-label">Story Image</label>
              <div
                className="asf-dropzone"
                onDragOver={e => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="asf-file-input"
                  onChange={handleImageSelect}
                />

                {imagePreview ? (
                  <div className="asf-dropzone-preview">
                    <img src={imagePreview} alt="Story preview" className="asf-image-preview" />
                    <button
                      type="button"
                      className="asf-remove-image-btn"
                      onClick={removeImage}
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="asf-dropzone-content">
                    <img src={uploadIcon} alt="Upload icon" className="asf-dropzone-icon" />
                    <p className="asf-dropzone-title">Drop an image here or click to browse</p>
                    <p className="asf-dropzone-subtitle">PNG, JPG, WEBP up to 5MB</p>
                  </div>
                )}
              </div>
              {uploading && <span className="asf-uploading">Uploading image…</span>}
              <span className="asf-help-text">The image will be uploaded to the story-images storage bucket.</span>
            </div>
          </div>

          <div className="asf-footer-bar">
            <button onClick={() => navigate('/admin/stories')} className="asf-cancel-btn">
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving} className="asf-save-btn">
              {saving ? 'Saving…' : 'Save Story'}
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
function LinkIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
}
function BlockIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
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