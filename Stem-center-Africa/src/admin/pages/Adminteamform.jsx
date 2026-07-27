import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { allTeamMembers } from '../../data/teamData'
import ProfileText from '../../components/ProfileText'
import deleteIcon from '../../assets/delete.png'
import uploadIcon from '../../assets/upload.png'
import '../styles/Adminteamform.css'

function findLegacyProfile(data) {
  const rawSlug = String(data.slug || '').trim().toLowerCase()
  const rawName = String(data.name || '').trim().toLowerCase()
  const member = allTeamMembers.find(
    (item) => item.slug === rawSlug || item.name.toLowerCase() === rawName
  )
  if (!member) return ''
  return Array.isArray(member.bio) ? member.bio.join('\n\n') : member.profile || ''
}

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function normalizeProfile(profile) {
  const raw = String(profile || '').trim()
  if (!raw || /^#+$/.test(raw)) return ''
  return raw
}

export default function Adminteamform() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)
  const fileInputRef = useRef(null)
  const profileRef = useRef(null)

  const [form, setForm] = useState({
    name: '',
    role: '',
    category: '',
    slug: '',
    profile: '',
    order: 0,
    image: '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [errors, setErrors] = useState({})
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)

  useEffect(() => {
    if (isEdit) fetchTeamMember()
  }, [id])

  async function fetchTeamMember() {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      showToast('Failed to load team member', 'error')
      return
    }

    setForm({
      name: data.name || '',
      role: data.role || '',
      category: data.category || '',
      slug: data.slug || '',
      profile: normalizeProfile(data.profile) || findLegacyProfile(data) || '',
      order: data.order ?? 0,
      image: data.image || '',
    })
    setImagePreview(data.image || '')
    setImageFile(null)
    setSlugManuallyEdited(false)
  }

  function handleNameChange(value) {
    setForm(f => ({
      ...f,
      name: value,
      slug: slugManuallyEdited ? f.slug : slugify(value),
    }))
    if (errors.name) setErrors(e => ({ ...e, name: '' }))
  }

  function handleSlugChange(value) {
    setSlugManuallyEdited(true)
    setForm(f => ({ ...f, slug: slugify(value) }))
    if (errors.slug) setErrors(e => ({ ...e, slug: '' }))
  }

  function insertProfileSyntax(type) {
    const textarea = profileRef.current
    if (!textarea) return
    const { selectionStart, selectionEnd, value } = textarea
    const selectedText = value.slice(selectionStart, selectionEnd)
    const before = value.slice(0, selectionStart)
    const after = value.slice(selectionEnd)
    const needsNewlineBefore = before.length > 0 && !before.endsWith('\n')
    const prefix = needsNewlineBefore ? '\n' : ''

    const placeholder = type === 'h3' ? 'Heading' : 'List item'
    const marker = type === 'h3' ? '### ' : '- '
    const bodyText = selectedText || placeholder
    const insertText = `${prefix}${marker}${bodyText}\n`
    const newValue = before + insertText + after

    setForm(f => ({ ...f, profile: newValue }))
    if (errors.profile) setErrors(e => ({ ...e, profile: '' }))

    requestAnimationFrame(() => {
      textarea.focus()
      const cursorPos = before.length + prefix.length + marker.length + bodyText.length
      textarea.setSelectionRange(cursorPos, cursorPos)
    })
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
    if (!imageFile) return form.image
    setUploading(true)

    const buckets = [
      import.meta.env.VITE_SUPABASE_TEAM_BUCKET,
      'tem-member-images',
      'team-member-images',
      'team-images',
      'team_images',
    ].filter(Boolean)

    const extension = imageFile.name.split('.').pop() || 'jpg'
    const path = `team-images/profile/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`

    let lastError = null
    let publicUrl = null

    for (const bucket of buckets) {
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, imageFile, { upsert: true })

      if (uploadError) {
        lastError = uploadError
        continue
      }

      const { data: urlData, error: urlError } = supabase.storage
        .from(bucket)
        .getPublicUrl(path)

      if (urlError || !urlData?.publicUrl) {
        lastError = urlError || new Error('Failed to generate public URL')
        continue
      }

      publicUrl = urlData.publicUrl
      break
    }

    try {
      if (!publicUrl) {
        throw new Error(
          lastError?.message || 'Image upload failed. Check your storage bucket configuration.'
        )
      }
      return publicUrl
    } finally {
      setUploading(false)
    }
  }

  function handleRemoveImage(e) {
    e.stopPropagation()
    setImageFile(null)
    setImagePreview('')
    setForm(f => ({ ...f, image: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.role.trim()) errs.role = 'Role is required'
    if (!form.slug.trim()) errs.slug = 'Slug is required'
    if (!form.profile.trim()) errs.profile = 'Profile text is required'
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
      const imageUrl = await uploadFile()
      const payload = {
        ...form,
        slug: form.slug,
        image: imageUrl,
        order: Number(form.order || 0),
        updated_at: new Date().toISOString(),
      }

      if (!isEdit) payload.created_at = new Date().toISOString()

      const { error } = isEdit
        ? await supabase.from('team_members').update(payload).eq('id', id)
        : await supabase.from('team_members').insert([payload])

      if (error) throw error
      showToast(isEdit ? 'Member updated!' : 'Member created!', 'success')
      setTimeout(() => navigate('/admin/team'), 1200)
    } catch (e) {
      showToast(e.message || 'Save failed', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    const { error } = await supabase.from('team_members').delete().eq('id', id)
    if (error) {
      showToast('Delete failed', 'error')
      return
    }
    showToast('Member deleted', 'success')
    setTimeout(() => navigate('/admin/team'), 1000)
  }

  function showToast(message, type = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="atf-page">
      {toast && (
        <div className={`atf-toast atf-toast--${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </div>
      )}

      {deleteModal && (
        <div className="atf-modal-overlay">
          <div className="atf-modal">
            <div className="atf-modal-icon">
              <img src={deleteIcon} alt="Delete" style={{ width: 48, height: 48, objectFit: 'contain' }} />
            </div>
            <h3 className="atf-modal-title">Delete Team Member?</h3>
            <p className="atf-modal-text">This will remove the member from the team roster.</p>
            <div className="atf-modal-actions">
              <button onClick={() => setDeleteModal(false)} className="atf-modal-cancel">Cancel</button>
              <button onClick={handleDelete} className="atf-modal-delete">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Row 1: Header (full width) ─────────────────────────────────── */}
      <div className="row">
        <div className="col-12">
          <div className="atf-header">
            <div className="atf-header-left">
              <button onClick={() => navigate('/admin/team')} className="atf-back-btn">
                <BackIcon />
              </button>
              <div>
                <p className="atf-breadcrumb">Dashboard › Team › {isEdit ? 'Edit Member' : 'New Member'}</p>
                <h1 className="atf-page-title">{isEdit ? 'Edit Team Member' : 'Create Team Member'}</h1>
              </div>
            </div>
            <div className="atf-header-right">
              <button onClick={() => navigate('/admin/team')} className="atf-cancel-btn">Cancel</button>
              <button onClick={handleSave} disabled={saving || uploading} className="atf-save-btn">
                {saving ? 'Saving…' : 'Save Member'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: Left (8) / Right (4) ────────────────────────────────── */}
      <div className="row atf-body-row">

        {/* Left column: Profile Details */}
        <div className="col-md-8 atf-col-left">
          <div className="atf-card shadow-lg">
            <div className="atf-card-header">
              <span className="atf-card-label">Profile Details</span>
            </div>

            <div className="atf-field">
              <label className="atf-label">Name</label>
              <input
                className={`atf-input${errors.name ? ' atf-input--error' : ''}`}
                value={form.name}
                onChange={e => handleNameChange(e.target.value)}
                placeholder="Full name"
              />
              {errors.name && <span className="atf-error-msg">{errors.name}</span>}
            </div>

            <div className="atf-field">
              <label className="atf-label">Slug</label>
              <div className="atf-slug-row">
                <span className="atf-slug-prefix">/team/</span>
                <input
                  className={`atf-input atf-slug-input${errors.slug ? ' atf-input--error' : ''}`}
                  value={form.slug}
                  onChange={e => handleSlugChange(e.target.value)}
                  placeholder="team-member-slug"
                />
              </div>
              {errors.slug && <span className="atf-error-msg">{errors.slug}</span>}
            </div>

            <div className="atf-row-2">
              <div className="atf-field">
                <label className="atf-label">Role</label>
                <input
                  className={`atf-input${errors.role ? ' atf-input--error' : ''}`}
                  value={form.role}
                  onChange={e => { setForm(f => ({ ...f, role: e.target.value })); if (errors.role) setErrors(e => ({ ...e, role: '' })) }}
                  placeholder="Job title or team role"
                />
                {errors.role && <span className="atf-error-msg">{errors.role}</span>}
              </div>

              <div className="atf-field">
                <label className="atf-label">Category</label>
                <input
                  className="atf-input"
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  placeholder="Department or group"
                />
              </div>
            </div>

            <div className="atf-row-2">
              <div className="atf-field">
                <label className="atf-label">Order</label>
                <input
                  type="number"
                  className="atf-input"
                  value={form.order}
                  onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                  placeholder="Display order"
                />
              </div>
            </div>

            <div className="atf-field atf-field--last">
              <label className="atf-label">Profile</label>

              <div className="atf-editor-toolbar">
                <button type="button" className="atf-toolbar-btn" onClick={() => insertProfileSyntax('h3')}>
                  H3 Heading
                </button>
                <button type="button" className="atf-toolbar-btn" onClick={() => insertProfileSyntax('bullet')}>
                  • Bullet
                </button>
                <span className="atf-toolbar-hint">
                  Or type <code>###</code> for a heading and <code>-</code> for a bullet point.
                </span>
              </div>

              <textarea
                ref={profileRef}
                className={`atf-textarea${errors.profile ? ' atf-input--error' : ''}`}
                value={form.profile}
                rows={8}
                onChange={e => { setForm(f => ({ ...f, profile: e.target.value })); if (errors.profile) setErrors(e => ({ ...e, profile: '' })) }}
                placeholder="Write a short biography. Use the H3/Bullet buttons above to add structure."
              />
              {errors.profile && <span className="atf-error-msg">{errors.profile}</span>}

              {form.profile && (
                <div className="atf-profile-preview">
                  <span className="atf-preview-label">Preview</span>
                  <ProfileText text={form.profile} />
                </div>
              )}
            </div>
          </div>

          {isEdit && (
            <div className="atf-danger-zone">
              <button onClick={() => setDeleteModal(true)} className="atf-delete-link-btn" type="button">
                <TrashIcon /> DELETE THIS MEMBER
              </button>
            </div>
          )}
        </div>

        {/* Right column: Profile Image + Footer actions */}
        <div className="col-md-4 atf-col-right">
          <div className="atf-card shadow-lg">
            <div className="atf-card-header">
              <span className="atf-card-label">Profile Image</span>
            </div>

            {imagePreview ? (
              <div className="atf-dropzone-preview">
                <img src={imagePreview} alt="Preview" className="atf-image-preview" />
                <button onClick={handleRemoveImage} className="atf-remove-image-btn" type="button">×</button>
              </div>
            ) : (
              <div
                className="atf-dropzone"
                onClick={() => fileInputRef.current.click()}
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
              >
                <div className="atf-dropzone-content">
                  <img src={uploadIcon} alt="Upload icon" className="atf-dropzone-icon" />
                  <p className="atf-dropzone-title">Upload profile image</p>
                  <p className="atf-dropzone-subtitle">Drag and drop or click to select a photo</p>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="atf-file-input"
              onChange={handleImageSelect}
            />
            {uploading && <p className="atf-uploading">Uploading image…</p>}
          </div>

          <div className="atf-footer-bar">
            <button onClick={() => navigate('/admin/team')} className="atf-cancel-btn">
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving || uploading} className="atf-save-btn">
              {saving ? 'Saving…' : 'Save Member'}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  )
}
