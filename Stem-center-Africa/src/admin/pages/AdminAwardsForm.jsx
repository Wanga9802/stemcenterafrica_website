import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import deleteIcon from '../../assets/delete.png'
import '../styles/AdminAwardsForm.css'

const IMAGE_BUCKETS = [
  import.meta.env.VITE_SUPABASE_AWARD_BUCKET,
  import.meta.env.VITE_SUPABASE_TEAM_BUCKET,
  'awards-images',
  'award-images',
  'awards',
].filter(Boolean)

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function getAwardImage(award) {
  return award?.image_path || award?.image || award?.image_url || ''
}

export default function AdminAwardsForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [form, setForm] = useState({
    title: '',
    image_path: '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [originalImagePath, setOriginalImagePath] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isEdit) fetchAward()
  }, [id])

  async function fetchAward() {
    const { data, error } = await supabase.from('awards').select('*').eq('id', id).single()
    if (error) {
      showToast('Failed to load award', 'error')
      return
    }
    const imageUrl = getAwardImage(data)
    setForm({
      title: data.title || data.label || '',
      image_path: imageUrl,
    })
    setImagePreview(imageUrl)
    setOriginalImagePath(imageUrl)
  }

  function validate() {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    return errs
  }

  async function uploadFile() {
    if (!imageFile) return form.image_path || ''
    setUploading(true)

    const extension = imageFile.name.split('.').pop() || 'jpg'
    const path = `awards/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`

    let lastError = null
    for (const bucket of IMAGE_BUCKETS) {
      try {
        const { error: uploadError } = await supabase.storage.from(bucket).upload(path, imageFile, { upsert: true })
        if (uploadError) {
          lastError = uploadError
          continue
        }

        const { data: urlData, error: urlError } = await supabase.storage.from(bucket).getPublicUrl(path)
        if (urlError || !urlData?.publicUrl) {
          lastError = urlError || new Error('Public URL generation failed')
          continue
        }

        setUploading(false)
        return urlData.publicUrl
      } catch (e) {
        lastError = e
        continue
      }
    }

    setUploading(false)
    throw new Error(lastError?.message || 'Image upload failed - no valid bucket found')
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
      const url = await uploadFile()
      const payload = {
        title: form.title,
        image_path: url || form.image_path || '',
        updated_at: new Date().toISOString(),
      }
      if (!isEdit) payload.created_at = new Date().toISOString()

      const saveQuery = isEdit
        ? supabase.from('awards').update(payload).eq('id', id)
        : supabase.from('awards').insert([payload])

      const { data: savedAwards, error } = await saveQuery
        .select('id, title, image_path, created_at, updated_at')

      if (error) throw error

      let savedAward = Array.isArray(savedAwards) ? savedAwards[0] : savedAwards

      if (!savedAward?.id && isEdit) {
        const { data: verifyAward, error: verifyError } = await supabase
          .from('awards')
          .select('id, title, image_path, created_at, updated_at')
          .eq('id', id)
          .maybeSingle()

        if (verifyError) throw verifyError
        savedAward = verifyAward
      }

      if (!savedAward?.id) {
        throw new Error('Supabase did not return a saved award. Check awards update/insert RLS policies.')
      }

      if (savedAward.title !== payload.title) {
        throw new Error('Supabase did not update the award title. Check awards update RLS policies.')
      }

      const savedImage = getAwardImage(savedAward)
      const expectedImage = payload.image_path || ''
      const imageWasChanged = Boolean(imageFile) || expectedImage !== originalImagePath

      if (imageWasChanged && savedImage !== expectedImage) {
        throw new Error('Supabase did not update the award image. Check awards image_path permissions and storage upload settings.')
      }

      console.debug('Award save result:', savedAward)
      setForm({
        title: savedAward.title || '',
        image_path: savedImage,
      })
      setImageFile(null)
      setImagePreview(savedImage)
      setOriginalImagePath(savedImage)
      showToast(isEdit ? 'Award updated!' : 'Award created!', 'success')

      // navigate back and include a refresh indicator so the list can re-fetch immediately
      setTimeout(() => navigate('/admin/awards', { state: { refresh: Date.now() } }), 600)
    } catch (e) {
      showToast(e.message || 'Save failed', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    const { error } = await supabase.from('awards').delete().eq('id', id)
    if (error) {
      showToast('Delete failed', 'error')
      return
    }
    showToast('Award deleted', 'success')
    setTimeout(() => navigate('/admin/awards'), 1000)
  }

  function handleImageChange(e) {
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

  function handleRemoveImage() {
    setImageFile(null)
    setImagePreview('')
    setForm(prev => ({ ...prev, image_path: '' }))
  }

  function showToast(message, type = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="admin-awards-form-page">
      {toast && (
        <div className={`admin-awards-form-toast admin-awards-form-toast--${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </div>
      )}

      {deleteModal && (
        <div className="admin-awards-form-modal-overlay">
          <div className="admin-awards-form-modal">
            <div className="admin-awards-form-modal-icon">
              <img src={deleteIcon} alt="Delete" style={{ width: 48, height: 48, objectFit: 'contain' }} />
            </div>
            <h3 className="admin-awards-form-modal-title">Delete Award?</h3>
            <p className="admin-awards-form-modal-text">This award will be permanently removed.</p>
            <div className="admin-awards-form-modal-actions">
              <button onClick={() => setDeleteModal(false)} className="admin-awards-form-modal-cancel">Cancel</button>
              <button onClick={handleDelete} className="admin-awards-form-modal-delete">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Row 1: Header (full width) ─────────────────────────────────── */}
      <div className="row">
        <div className="col-12">
          <div className="admin-awards-form-header">
            <div className="admin-awards-form-header-left">
              <button onClick={() => navigate('/admin/awards')} className="admin-awards-form-back-btn">
                <BackIcon />
              </button>
              <div>
                <p className="admin-awards-form-breadcrumb">Dashboard › Awards › {isEdit ? 'Edit Award' : 'Create Award'}</p>
                <h1 className="admin-awards-form-title">{isEdit ? 'Edit Award' : 'Create Award'}</h1>
              </div>
            </div>
            <div className="admin-awards-form-actions">
              <button onClick={() => navigate('/admin/awards')} className="admin-awards-form-cancel-btn">Cancel</button>
              <button onClick={handleSave} disabled={saving || uploading} className="admin-awards-form-save-btn">
                {saving ? 'Saving…' : 'Save Award'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: Single full-width card ────────────────────────────────── */}
      <div className="row">
        <div className="col-12">
          <div className="admin-awards-form-card">

            <div className="admin-awards-form-field">
              <label className="admin-awards-form-label">Title</label>
              <input
                className={`admin-awards-form-input${errors.title ? ' admin-awards-form-input--error' : ''}`}
                value={form.title}
                onChange={e => { setForm(prev => ({ ...prev, title: e.target.value })); if (errors.title) setErrors(prev => ({ ...prev, title: '' })) }}
                placeholder="Award title"
              />
              {errors.title && <span className="admin-awards-form-error">{errors.title}</span>}
            </div>

            <div className="admin-awards-form-field admin-awards-form-field--last">
              <label className="admin-awards-form-label">Image</label>
              <div className="admin-awards-form-image-upload">
                {imagePreview ? (
                  <div className="admin-awards-form-image-preview">
                    <img src={imagePreview} alt="Award preview" className="admin-awards-form-image" />
                    <button type="button" onClick={handleRemoveImage} className="admin-awards-form-remove-image-btn">Remove</button>
                  </div>
                ) : (
                  <label className="admin-awards-form-file-label">
                    <input type="file" accept="image/*" onChange={handleImageChange} className="admin-awards-form-file-input" />
                    <span className="admin-awards-form-file-label-text">Choose File</span>
                  </label>
                )}
                {uploading && <span className="admin-awards-form-uploading">Uploading image…</span>}
              </div>
            </div>

          </div>

          {isEdit && (
            <div className="admin-awards-form-delete-row">
              <button onClick={() => setDeleteModal(true)} className="admin-awards-form-delete-btn">
                <TrashIcon /> DELETE THIS AWARD
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