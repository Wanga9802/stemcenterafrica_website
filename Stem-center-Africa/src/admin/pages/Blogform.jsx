import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import deleteIcon from '../../assets/delete.png'
import uploadIcon from '../../assets/upload.png'
import '../styles/AdminBlogForm.css'

const CATEGORIES = [
  'Tinkering', 'Robotics & AI', 'Basic Computer', 'Web Development',
  'Community Stories', 'Career Readiness', 'Arduino & IoT', 'Scratch',
]

const AUTHORS = [
  'Grace Mwangi', 'Dr. Nyambura Kamau', 'Amina Diallo',
  'Joy Osei', 'Nina Achieng', 'Dr. Fatima Bah', 'James Kariuki',
]

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default function AdminBlogForm() {
  const navigate = useNavigate()
  const { id } = useParams() // present on edit, absent on create
  const isEdit = Boolean(id)
  const fileInputRef = useRef()
  const authorFileInputRef = useRef()

  const [form, setForm] = useState({
    title: '',
    slug: '',
    subtitle: '',
    content: [''],
    category: 'Tinkering',
    author: 'Grace Mwangi',
    author_image: '',
    date: new Date().toISOString().split('T')[0],
    image: '',
    status: 'draft',
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [authorImageFile, setAuthorImageFile] = useState(null)
  const [authorImagePreview, setAuthorImagePreview] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
  const [errors, setErrors] = useState({})

  // Load existing blog for edit mode
  useEffect(() => {
    if (isEdit) fetchBlog()
  }, [id])

  async function fetchBlog() {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single()
    if (error) { showToast('Failed to load post', 'error'); return }
    setForm({
      title: data.title || '',
      slug: data.slug || '',
      subtitle: data.subtitle || '',
      content: Array.isArray(data.content) ? data.content : [''],
      category: data.category || 'Tinkering',
      author: data.author || 'Grace Mwangi',
      author_image: data.author_image || '',
      date: data.date || new Date().toISOString().split('T')[0],
      image: data.image || '',
      status: data.status || 'draft',
    })
    if (data.image) setImagePreview(data.image)
    if (data.author_image) setAuthorImagePreview(data.author_image)
    setSlugManuallyEdited(true)
  }

  // Auto-generate slug from title
  function handleTitleChange(value) {
    setForm(f => ({
      ...f,
      title: value,
      slug: slugManuallyEdited ? f.slug : slugify(value),
    }))
    if (errors.title) setErrors(er => ({ ...er, title: '' }))
  }

  function handleSlugChange(value) {
    setSlugManuallyEdited(true)
    setForm(f => ({ ...f, slug: slugify(value) }))
    if (errors.slug) setErrors(er => ({ ...er, slug: '' }))
  }

  function handleImageSelect(e) {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image must be under 5MB', 'error'); return
    }
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  function handleAuthorImageSelect(e) {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      showToast('Author image must be under 5MB', 'error'); return
    }
    setAuthorImageFile(file)
    setAuthorImagePreview(URL.createObjectURL(file))
  }

  function handleDrop(e) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      showToast('Please drop an image file', 'error'); return
    }
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  function handleAuthorDrop(e) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      showToast('Please drop an image file', 'error'); return
    }
    setAuthorImageFile(file)
    setAuthorImagePreview(URL.createObjectURL(file))
  }

  async function uploadFile(file, type) {
    if (!file) return null
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `blog-images/${type}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(path, file, { upsert: true })

    if (uploadError) {
      setUploading(false)
      throw new Error(`Image upload failed: ${uploadError.message || uploadError}`)
    }

    const { data: urlData, error: urlError } = supabase.storage
      .from('blog-images')
      .getPublicUrl(path)

    setUploading(false)

    if (urlError || !urlData?.publicUrl) {
      throw new Error(`Failed to generate image URL${urlError ? `: ${urlError.message}` : ''}`)
    }

    return urlData.publicUrl
  }

  async function uploadImage() {
    return await uploadFile(imageFile, 'cover') || form.image
  }

  async function uploadAuthorImage() {
    return await uploadFile(authorImageFile, 'author') || form.author_image
  }

  function validate() {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    if (!form.slug.trim()) errs.slug = 'Slug is required'
    if (!form.subtitle.trim()) errs.subtitle = 'Subtitle is required'
    return errs
  }

  async function handleSave(statusOverride) {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      showToast('Please fix the errors below', 'error')
      return
    }
    setSaving(true)
    try {
      const imageUrl = await uploadImage()
      const authorImageUrl = await uploadAuthorImage()
      const payload = {
        ...form,
        image: imageUrl,
        author_image: authorImageUrl,
        status: statusOverride || form.status,
        content: form.content.filter(p => p.trim() !== ''),
        updated_at: new Date().toISOString(),
      }
      if (!isEdit) payload.created_at = new Date().toISOString()

      const { error } = isEdit
        ? await supabase.from('blogs').update(payload).eq('id', id)
        : await supabase.from('blogs').insert([payload])

      if (error) throw error
      showToast(isEdit ? 'Post updated!' : 'Post created!', 'success')
      setTimeout(() => navigate('/admin/blogs'), 1200)
    } catch (e) {
      showToast(e.message || 'Save failed', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    const { error } = await supabase.from('blogs').delete().eq('id', id)
    if (error) { showToast('Delete failed', 'error'); return }
    showToast('Post deleted', 'success')
    setTimeout(() => navigate('/admin/blogs'), 1000)
  }

  // Rich text: manage content as array of paragraph strings
  function updateParagraph(index, value) {
    setForm(f => {
      const content = [...f.content]
      content[index] = value
      return { ...f, content }
    })
  }

  function addParagraph() {
    setForm(f => ({ ...f, content: [...f.content, ''] }))
  }

  function removeParagraph(index) {
    setForm(f => ({
      ...f,
      content: f.content.filter((_, i) => i !== index)
    }))
  }

  function showToast(message, type = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="abf-page">

      {/* Toast */}
      {toast && (
        <div className={`abf-toast abf-toast--${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="abf-modal-overlay">
          <div className="abf-modal">
            <div className="abf-modal-icon">
              <img src={deleteIcon} alt="Delete" style={{ width: 48, height: 48, objectFit: 'contain' }} />
            </div>
            <h3 className="abf-modal-title">Delete This Post?</h3>
            <p className="abf-modal-text">This action cannot be undone.</p>
            <div className="abf-modal-actions">
              <button onClick={() => setDeleteModal(false)} className="abf-modal-cancel">Cancel</button>
              <button onClick={handleDelete} className="abf-modal-delete">Delete Post</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Row 1: Header (full width) ─────────────────────────────────── */}
      <div className="row">
        <div className="col-12">
          <div className="abf-header">
            <div className="abf-header-left">
              <button onClick={() => navigate('/admin/blogs')} className="abf-back-btn">
                <BackIcon />
              </button>
              <div>
                <p className="abf-breadcrumb">Dashboard &rsaquo; Blogs &rsaquo; {isEdit ? 'Edit Post' : 'Create Post'}</p>
                <h1 className="abf-page-title">{isEdit ? 'Edit Blog Post' : 'Create New Blog'}</h1>
              </div>
            </div>
            <div className="abf-header-right">
              <button
                onClick={() => handleSave('draft')}
                disabled={saving}
                className="abf-draft-btn"
              >
                Save Draft
              </button>
              <button
                onClick={() => handleSave('published')}
                disabled={saving || uploading}
                className="abf-publish-btn"
              >
                {saving ? 'Saving…' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: Left (8) / Right (4) ────────────────────────────────── */}
      <div className="row abf-body-row">

        {/* Left column: Post Content */}
        <div className="col-md-8 abf-col-left">

          <div className="abf-card">
            <div className="abf-card-header">
              <DocIcon />
              <span className="abf-card-label">Post Content</span>
            </div>

            {/* Title */}
            <div className="abf-field">
              <label className="abf-label">Post Title</label>
              <input
                className={`abf-input${errors.title ? ' abf-input--error' : ''}`}
                placeholder="Enter an engaging blog title..."
                value={form.title}
                onChange={e => handleTitleChange(e.target.value)}
              />
              {errors.title && <span className="abf-error-msg">{errors.title}</span>}
            </div>

            {/* Slug */}
            <div className="abf-field">
              <label className="abf-label">Slug</label>
              <div className="abf-slug-row">
                <span className="abf-slug-prefix">/blog/</span>
                <input
                  className={`abf-input abf-slug-input${errors.slug ? ' abf-input--error' : ''}`}
                  value={form.slug}
                  onChange={e => handleSlugChange(e.target.value)}
                  placeholder="auto-generated-slug"
                />
              </div>
              <span className="abf-help-text">Auto-generated from title. You can edit this.</span>
              {errors.slug && <span className="abf-error-msg">{errors.slug}</span>}
            </div>

            {/* Subtitle */}
            <div className="abf-field">
              <label className="abf-label">Subtitle / Excerpt</label>
              <textarea
                className={`abf-textarea${errors.subtitle ? ' abf-input--error' : ''}`}
                rows={3}
                placeholder="A short compelling summary shown on blog cards and search results..."
                value={form.subtitle}
                onChange={e => {
                  setForm(f => ({ ...f, subtitle: e.target.value }))
                  if (errors.subtitle) setErrors(er => ({ ...er, subtitle: '' }))
                }}
              />
              {errors.subtitle && <span className="abf-error-msg">{errors.subtitle}</span>}
            </div>

            {/* Content */}
            <div className="abf-field abf-field--last">
              <label className="abf-label">Content</label>
              <div className="abf-editor-wrap">
                {/* Toolbar */}
                <div className="abf-toolbar">
                  <div className="abf-toolbar-group">
                    {['B', 'I', 'U'].map(t => (
                      <button key={t} className="abf-toolbar-btn" title={t}>
                        <span style={{ fontWeight: t === 'B' ? '700' : '400', fontStyle: t === 'I' ? 'italic' : 'normal', textDecoration: t === 'U' ? 'underline' : 'none' }}>{t}</span>
                      </button>
                    ))}
                  </div>
                  <div className="abf-toolbar-divider" />
                  <div className="abf-toolbar-group">
                    {['H2', 'H3'].map(t => (
                      <button key={t} className="abf-toolbar-btn">{t}</button>
                    ))}
                  </div>
                  <div className="abf-toolbar-divider" />
                  <div className="abf-toolbar-group">
                    <button className="abf-toolbar-btn" title="Bullet list">≡</button>
                    <button className="abf-toolbar-btn" title="Numbered list">1.</button>
                  </div>
                  <div className="abf-toolbar-divider" />
                  <div className="abf-toolbar-group">
                    <button className="abf-toolbar-btn" title="Link">🔗</button>
                    <button className="abf-toolbar-btn" title="Image">🖼</button>
                    <button className="abf-toolbar-btn" title="Code">&lt;/&gt;</button>
                  </div>
                </div>

                {/* Paragraphs */}
                <div className="abf-editor-area">
                  {form.content.map((para, i) => (
                    <div key={i} className="abf-para-row">
                      <textarea
                        className="abf-para-input"
                        rows={3}
                        placeholder={i === 0 ? 'Start writing your blog content here...' : 'Continue writing...'}
                        value={para}
                        onChange={e => updateParagraph(i, e.target.value)}
                      />
                      {form.content.length > 1 && (
                        <button
                          onClick={() => removeParagraph(i)}
                          className="abf-remove-para-btn"
                          title="Remove paragraph"
                        >×</button>
                      )}
                    </div>
                  ))}
                  <button onClick={addParagraph} className="abf-add-para-btn">
                    + Add Paragraph
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right column: Featured Image, Author Image, Post Settings, Actions */}
        <div className="col-md-4 abf-col-right">

          {/* Featured Image */}
          <div className="abf-card shadow-lg">
            <div className="abf-card-header">
              <ImgIcon />
              <span className="abf-card-label">Featured Image</span>
            </div>

            <div className="abf-field abf-field--last">
              {imagePreview ? (
                <div className="abf-dropzone-preview">
                  <img src={imagePreview} alt="Preview" className="abf-image-preview" />
                  <button
                    onClick={() => { setImagePreview(''); setImageFile(null); setForm(f => ({ ...f, image: '' })) }}
                    className="abf-remove-image-btn"
                  >×</button>
                </div>
              ) : (
                <div
                  className="abf-dropzone"
                  onClick={() => fileInputRef.current.click()}
                  onDrop={handleDrop}
                  onDragOver={e => e.preventDefault()}
                >
                  <div className="abf-dropzone-content">
                    <img src={uploadIcon} alt="Upload icon" className="abf-dropzone-icon" />
                    <p className="abf-dropzone-title">Drag &amp; drop image here</p>
                    <p className="abf-dropzone-subtitle">or click to browse files</p>
                    <p className="abf-dropzone-hint">Recommended: 1200 × 630px · JPG or PNG · Max 5MB</p>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="abf-file-input"
                onChange={handleImageSelect}
              />
              {uploading && <span className="abf-uploading">Uploading image…</span>}
            </div>
          </div>

          {/* Author Image */}
          <div className="abf-card shadow-lg">
            <div className="abf-card-header">
              <ImgIcon />
              <span className="abf-card-label">Author Image</span>
            </div>

            <div className="abf-field abf-field--last">
              {authorImagePreview ? (
                <div className="abf-dropzone-preview">
                  <img src={authorImagePreview} alt="Author preview" className="abf-image-preview" />
                  <button
                    onClick={() => {
                      setAuthorImagePreview('');
                      setAuthorImageFile(null);
                      setForm(f => ({ ...f, author_image: '' }))
                    }}
                    className="abf-remove-image-btn"
                  >×</button>
                </div>
              ) : (
                <div
                  className="abf-dropzone"
                  onClick={() => authorFileInputRef.current.click()}
                  onDrop={handleAuthorDrop}
                  onDragOver={e => e.preventDefault()}
                >
                  <div className="abf-dropzone-content">
                    <img src={uploadIcon} alt="Upload icon" className="abf-dropzone-icon" />
                    <p className="abf-dropzone-title">Upload author avatar</p>
                    <p className="abf-dropzone-subtitle">or click to browse files</p>
                    <p className="abf-dropzone-hint">Recommended: 120 × 120px · JPG or PNG · Max 5MB</p>
                  </div>
                </div>
              )}
              <input
                ref={authorFileInputRef}
                type="file"
                accept="image/*"
                className="abf-file-input"
                onChange={handleAuthorImageSelect}
              />
            </div>
          </div>

          {/* Post Settings */}
          <div className="abf-card">
            <div className="abf-card-header">
              <SettingsIcon />
              <span className="abf-card-label">Post Settings</span>
            </div>

            <div className="abf-field">
              <label className="abf-label">Category</label>
              <select
                className="abf-select"
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              >
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div className="abf-field">
              <label className="abf-label">Author</label>
              <input
                type="text"
                className="abf-input"
                placeholder="Enter author name"
                value={form.author}
                onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
              />
            </div>

            <div className="abf-field">
              <label className="abf-label">Publish Date</label>
              <input
                type="date"
                className="abf-input"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />
            </div>

            <div className="abf-field abf-field--last">
              <label className="abf-label">Status</label>
              <select
                className="abf-select"
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
              >
                <option value="draft">🟡  Draft</option>
                <option value="published">🟢  Published</option>
                <option value="archived">⚫  Archived</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="abf-card">
            <button
              onClick={() => handleSave('published')}
              disabled={saving || uploading}
              className="abf-actions-publish"
            >
              {saving ? 'Saving…' : uploading ? 'Uploading…' : 'Publish Post'}
            </button>
            <button
              onClick={() => handleSave('draft')}
              disabled={saving}
              className="abf-actions-draft"
            >
              Save as Draft
            </button>

            {isEdit && (
              <>
                <div className="abf-actions-divider" />
                <div className="abf-danger-zone">
                  <button
                    onClick={() => setDeleteModal(true)}
                    className="abf-delete-link-btn"
                  >
                    <TrashIcon /> DELETE THIS POST
                  </button>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Icons ────────────────────────────────────────────────────────────────────
function BackIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15,18 9,12 15,6"/></svg>
}
function DocIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
}
function ImgIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>
}
function SettingsIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
}
function CloudIcon() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="1.8" strokeLinecap="round"><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
}
function TrashIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ marginRight: 5 }}><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
}
