import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import deleteIcon from '../../assets/delete.png'
import uploadIcon from '../../assets/upload.png'
import '../styles/AdminEventform.css'

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// ── Description block type definitions ──────────────────────────────────
// Must stay in sync with the DescriptionBlock renderer in the public
// EventDetail.jsx — each type maps to its own visual treatment there.
const BLOCK_TYPES = [
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'heading', label: 'Section Heading (e.g. "Event Highlights", "Activities")' },
  { value: 'highlight', label: 'Highlight (label + text)' },
  { value: 'stats', label: 'Stats (short number/fact chips)' },
  { value: 'list', label: 'Bulleted List' },
  { value: 'tags', label: 'Tags' },
  { value: 'links', label: 'Links' },
  { value: 'hashtags', label: 'Hashtags line' },
]

function blankBlockForType(type) {
  switch (type) {
    case 'heading':
      return { type: 'heading', text: '' }
    case 'highlight':
      return { type: 'highlight', label: '', text: '', subtext: '' }
    case 'stats':
      return { type: 'stats', items: [''] }
    case 'list':
      return { type: 'list', items: [''] }
    case 'tags':
      return { type: 'tags', items: [''] }
    case 'links':
      return { type: 'links', items: [{ label: '', url: '' }] }
    case 'hashtags':
      return { type: 'hashtags', text: '' }
    case 'paragraph':
    default:
      return { type: 'paragraph', text: '' }
  }
}

// QR codes need: label (shown above the QR box), linkUrl (where it points),
// linkLabel (the text shown next to the 🔗 icon on the public page), and
// imageUrl (the actual QR graphic — auto-generated from linkUrl on save).
function blankQr() {
  return { label: '', linkUrl: '', linkLabel: '' }
}

// Auto-generates a scannable QR code image URL from a destination link.
// Keeps QR generation out of Supabase storage — no file upload needed.
function buildQrImageUrl(linkUrl) {
  if (!linkUrl || !linkUrl.trim()) return ''
  return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(linkUrl.trim())}`
}

export default function AdminEventForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)
  const fileInputRef = useRef(null)

  const [form, setForm] = useState({
    title: '',
    event_id: '',
    location: '',
    excerpt: '',
    start_date: '',
    end_date: '',
    time: '',
    image_url: '',
    register_url: '',
    requires_registration: false,
    description_blocks: [blankBlockForType('paragraph')],
    qr_codes: [blankQr()],
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
    if (isEdit) fetchEvent()
  }, [id])

  async function fetchEvent() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single()
    if (error) { showToast('Failed to load event', 'error'); return }

    setForm({
      title: data.title || '',
      event_id: data.event_id || '',
      location: data.location || '',
      excerpt: data.excerpt || '',
      start_date: data.start_date || '',
      end_date: data.end_date || '',
      time: data.time || '',
      image_url: data.image_url || '',
      register_url: data.register_url || '',
      requires_registration: data.requires_registration || false,
      description_blocks: Array.isArray(data.description_blocks) && data.description_blocks.length > 0
        // Older rows saved before typed blocks existed only have { text }.
        // Treat those as plain paragraphs so they're still editable/visible here.
        ? data.description_blocks.map(b => (b && b.type ? b : { type: 'paragraph', text: b?.text || '' }))
        : [blankBlockForType('paragraph')],
      qr_codes: Array.isArray(data.qr_codes) && data.qr_codes.length > 0
        // Older rows saved before linkLabel existed only have { label, linkUrl }.
        // Fill in the missing field so it's still editable here.
        ? data.qr_codes.map(q => ({ label: q.label || '', linkUrl: q.linkUrl || '', linkLabel: q.linkLabel || '' }))
        : [blankQr()],
    })
    setImageFile(null)
    setImagePreview(data.image_url || '')
    setSlugManuallyEdited(true)
  }

  // Auto-generate event_id from title
  function handleTitleChange(value) {
    setForm(f => ({
      ...f,
      title: value,
      event_id: slugManuallyEdited ? f.event_id : slugify(value),
    }))
    if (errors.title) setErrors(e => ({ ...e, title: '' }))
  }

  function handleEventIdChange(value) {
    setSlugManuallyEdited(true)
    setForm(f => ({ ...f, event_id: slugify(value) }))
  }

  // ── Description Blocks ──────────────────────────────────────────────────
  function updateBlockField(index, field, value) {
    setForm(f => {
      const blocks = [...f.description_blocks]
      blocks[index] = { ...blocks[index], [field]: value }
      return { ...f, description_blocks: blocks }
    })
  }

  function updateBlockType(index, type) {
    setForm(f => {
      const blocks = [...f.description_blocks]
      blocks[index] = blankBlockForType(type)
      return { ...f, description_blocks: blocks }
    })
  }

  // items-based blocks (stats / list / tags) are edited as one item per line
  function updateBlockItemsText(index, text) {
    updateBlockField(index, 'items', text.split('\n'))
  }

  // links block is edited as "Label | https://url" per line
  function updateBlockLinksText(index, text) {
    const items = text.split('\n').map(line => {
      const [label, url] = line.split('|').map(s => (s || '').trim())
      return { label: label || '', url: url || '' }
    })
    updateBlockField(index, 'items', items)
  }

  function addBlock() {
    setForm(f => ({ ...f, description_blocks: [...f.description_blocks, blankBlockForType('paragraph')] }))
  }

  function removeBlock(index) {
    setForm(f => ({
      ...f,
      description_blocks: f.description_blocks.filter((_, i) => i !== index),
    }))
  }

  // ── QR Codes ────────────────────────────────────────────────────────────
  function updateQr(index, field, value) {
    setForm(f => {
      const qr_codes = [...f.qr_codes]
      qr_codes[index] = { ...qr_codes[index], [field]: value }
      return { ...f, qr_codes }
    })
  }

  function addQr() {
    setForm(f => ({ ...f, qr_codes: [...f.qr_codes, blankQr()] }))
  }

  function removeQr(index) {
    setForm(f => ({
      ...f,
      qr_codes: f.qr_codes.filter((_, i) => i !== index),
    }))
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
      const path = `event-images/cover/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('event-images')
        .upload(path, imageFile, { upsert: true })

      if (uploadError) {
        throw new Error(`Image upload failed: ${uploadError.message || uploadError}`)
      }

      const { data: urlData, error: urlError } = supabase.storage
        .from('event-images')
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

  // ── Validation ───────────────────────────────────────────────────────────
  function validate() {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    if (!form.event_id.trim()) errs.event_id = 'Event ID is required'
    if (!form.start_date) errs.start_date = 'Start date is required'
    return errs
  }

  function cleanDescriptionBlocks(blocks) {
    return blocks
      .map(b => {
        if (b.type === 'stats' || b.type === 'list' || b.type === 'tags') {
          return { ...b, items: (b.items || []).map(i => (i || '').trim()).filter(Boolean) }
        }
        if (b.type === 'links') {
          return {
            ...b,
            items: (b.items || []).filter(l => (l.label && l.label.trim()) || (l.url && l.url.trim())),
          }
        }
        return b
      })
      .filter(b => {
        if (b.type === 'paragraph' || b.type === 'heading' || b.type === 'hashtags') {
          return b.text && b.text.trim() !== ''
        }
        if (b.type === 'highlight') {
          return (b.label && b.label.trim()) || (b.text && b.text.trim())
        }
        if (b.type === 'stats' || b.type === 'list' || b.type === 'tags') {
          return b.items && b.items.length > 0
        }
        if (b.type === 'links') {
          return b.items && b.items.length > 0
        }
        return false
      })
  }

  // Cleans QR rows and stamps each with a freshly generated imageUrl so the
  // public EventDetail page always has a working QR graphic + link text.
  function cleanQrCodes(qrCodes) {
    return qrCodes
      .filter(q => q.label.trim() !== '' || q.linkUrl.trim() !== '' || (q.linkLabel || '').trim() !== '')
      .map(q => ({
        label: q.label.trim(),
        linkUrl: q.linkUrl.trim(),
        linkLabel: (q.linkLabel || '').trim(),
        imageUrl: buildQrImageUrl(q.linkUrl),
      }))
  }

  // ── Save ─────────────────────────────────────────────────────────────────
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
        description_blocks: cleanDescriptionBlocks(form.description_blocks),
        qr_codes: cleanQrCodes(form.qr_codes),
        updated_at: new Date().toISOString(),
      }
      if (!isEdit) payload.created_at = new Date().toISOString()

      const { error } = isEdit
        ? await supabase.from('events').update(payload).eq('id', id)
        : await supabase.from('events').insert([payload])

      if (error) throw error
      showToast(isEdit ? 'Event updated!' : 'Event created!', 'success')
      setTimeout(() => navigate('/admin/events'), 1200)
    } catch (e) {
      showToast(e.message || 'Save failed', 'error')
    } finally {
      setSaving(false)
    }
  }

  // ── Delete ────────────────────────────────────────────────────────────────
  async function handleDelete() {
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) { showToast('Delete failed', 'error'); return }
    showToast('Event deleted', 'success')
    setTimeout(() => navigate('/admin/events'), 1000)
  }

  function showToast(message, type = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="aef-page">

      {/* Toast */}
      {toast && (
        <div className={`aef-toast aef-toast--${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="aef-modal-overlay">
          <div className="aef-modal">
            <div className="aef-modal-icon">
              <img src={deleteIcon} alt="Delete" style={{ width: 48, height: 48, objectFit: 'contain' }} />
            </div>
            <h3 className="aef-modal-title">Delete This Event?</h3>
            <p className="aef-modal-text">This action cannot be undone.</p>
            <div className="aef-modal-actions">
              <button onClick={() => setDeleteModal(false)} className="aef-modal-cancel">Cancel</button>
              <button onClick={handleDelete} className="aef-modal-delete">Delete Event</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Row 1: Header (full width) ─────────────────────────────────── */}
      <div className="row">
        <div className="col-12">
          <div className="aef-header">
            <div className="aef-header-left">
              <button onClick={() => navigate('/admin/events')} className="aef-back-btn">
                <BackIcon />
              </button>
              <div>
                <p className="aef-breadcrumb">Dashboard &rsaquo; Events &rsaquo; {isEdit ? 'Edit Event' : 'Create Event'}</p>
                <h1 className="aef-page-title">{isEdit ? 'Edit Event' : 'Create Event'}</h1>
              </div>
            </div>
            <div className="aef-header-right">
              <button onClick={() => navigate('/admin/events')} className="aef-cancel-btn">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="aef-save-btn"
              >
                {saving ? 'Saving…' : 'Save Event'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: Left (8) / Right (4) ────────────────────────────────── */}
      <div className="row aef-body-row">

        {/* Left column: Basic Info, Date & Time, Description Blocks, QR Codes */}
        <div className="col-md-8 aef-col-left">

          <div className="aef-card shadow-lg">
            <div className="aef-card-header">
              <InfoIcon />
              <span className="aef-card-label">Basic Info</span>
            </div>

            <div className="aef-field">
              <label className="aef-label">Event Title</label>
              <input
                className={`aef-input${errors.title ? ' aef-input--error' : ''}`}
                placeholder="Event title"
                value={form.title}
                onChange={e => handleTitleChange(e.target.value)}
              />
              {errors.title && <span className="aef-error-msg">{errors.title}</span>}
            </div>

            <div className="aef-field">
              <label className="aef-label">Event ID</label>
              <input
                className={`aef-input${errors.event_id ? ' aef-input--error' : ''}`}
                placeholder="event-slug-here"
                value={form.event_id}
                onChange={e => handleEventIdChange(e.target.value)}
              />
              <span className="aef-help-text">Used in the public URL. No spaces.</span>
              {errors.event_id && <span className="aef-error-msg">{errors.event_id}</span>}
            </div>

            <div className="aef-field">
              <label className="aef-label">Location</label>
              <input
                className="aef-input"
                placeholder="e.g. The Sarit Expo Centre"
                value={form.location}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
              />
            </div>

            <div className="aef-field aef-field--last">
              <label className="aef-label">Excerpt</label>
              <textarea
                className="aef-textarea"
                rows={3}
                placeholder="Short description shown on event cards..."
                value={form.excerpt}
                onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
              />
            </div>
          </div>

          <div className="aef-card shadow-lg">
            <div className="aef-card-header">
              <CalIcon />
              <span className="aef-card-label">Date &amp; Time</span>
            </div>

            <div className="aef-row-2">
              <div className="aef-field">
                <label className="aef-label">Start Date</label>
                <input
                  type="date"
                  className={`aef-input${errors.start_date ? ' aef-input--error' : ''}`}
                  value={form.start_date}
                  onChange={e => { setForm(f => ({ ...f, start_date: e.target.value })); setErrors(er => ({ ...er, start_date: '' })) }}
                />
                {errors.start_date && <span className="aef-error-msg">{errors.start_date}</span>}
              </div>
              <div className="aef-field">
                <label className="aef-label">End Date</label>
                <input
                  type="date"
                  className="aef-input"
                  value={form.end_date}
                  onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))}
                />
              </div>
            </div>

            <div className="aef-field aef-field--last">
              <label className="aef-label">Time Range</label>
              <input
                className="aef-input"
                placeholder="e.g. 9:00 am – 5:00 pm"
                value={form.time}
                onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
              />
            </div>
          </div>

          <div className="aef-card shadow-lg">
            <div className="aef-card-header">
              <BlockIcon />
              <span className="aef-card-label">Description Blocks (JSONB)</span>
            </div>
            <p className="aef-section-desc">
              Build the "About the Event" page section by section. Add a "Section Heading" block
              (e.g. "Event Highlights", "Activities") to start a new titled section — every block
              after it will visually belong to that section until the next heading.
            </p>

            {form.description_blocks.map((block, i) => (
              <div key={i} className="aef-block-row">
                <span className="aef-drag-handle">⠿</span>

                <div className="aef-block-content" style={{ flex: 1 }}>
                  <div className="aef-field" style={{ marginBottom: 8 }}>
                    <label className="aef-label">Block Type</label>
                    <select
                      className="aef-input"
                      value={block.type}
                      onChange={e => updateBlockType(i, e.target.value)}
                    >
                      {BLOCK_TYPES.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* ── paragraph / heading / hashtags: single text field ── */}
                  {(block.type === 'paragraph' || block.type === 'heading' || block.type === 'hashtags') && (
                    <textarea
                      className="aef-textarea aef-block-textarea"
                      rows={block.type === 'paragraph' ? 3 : 1}
                      placeholder={
                        block.type === 'heading' ? 'e.g. Event Highlights'
                          : block.type === 'hashtags' ? '#STEMExpo2026 #STEMCenterAfrica'
                            : 'Write a paragraph...'
                      }
                      value={block.text}
                      onChange={e => updateBlockField(i, 'text', e.target.value)}
                    />
                  )}

                  {/* ── highlight: label + text + optional subtext ── */}
                  {block.type === 'highlight' && (
                    <>
                      <input
                        className="aef-input"
                        placeholder="Label (e.g. Location)"
                        value={block.label}
                        onChange={e => updateBlockField(i, 'label', e.target.value)}
                        style={{ marginBottom: 8 }}
                      />
                      <input
                        className="aef-input"
                        placeholder="Text (e.g. The Sarit Expo Centre)"
                        value={block.text}
                        onChange={e => updateBlockField(i, 'text', e.target.value)}
                        style={{ marginBottom: 8 }}
                      />
                      <input
                        className="aef-input"
                        placeholder="Subtext (optional — shown under a 📍 icon)"
                        value={block.subtext || ''}
                        onChange={e => updateBlockField(i, 'subtext', e.target.value)}
                      />
                    </>
                  )}

                  {/* ── stats / list / tags: one item per line ── */}
                  {(block.type === 'stats' || block.type === 'list' || block.type === 'tags') && (
                    <>
                      <textarea
                        className="aef-textarea aef-block-textarea"
                        rows={4}
                        placeholder={
                          block.type === 'stats' ? '500+ student participants\n500+ additional attendees'
                            : block.type === 'list' ? 'Robotics, Drones, Space Science\nScratch Coding, Mathematics'
                              : 'Robotics\nAI\nCoding'
                        }
                        value={(block.items || []).join('\n')}
                        onChange={e => updateBlockItemsText(i, e.target.value)}
                      />
                      <span className="aef-help-text">One item per line.</span>
                    </>
                  )}

                  {/* ── links: "Label | URL" per line ── */}
                  {block.type === 'links' && (
                    <>
                      <textarea
                        className="aef-textarea aef-block-textarea"
                        rows={4}
                        placeholder="Read about our impacts here | https://example.com/impact"
                        value={(block.items || []).map(l => `${l.label} | ${l.url}`).join('\n')}
                        onChange={e => updateBlockLinksText(i, e.target.value)}
                      />
                      <span className="aef-help-text">One link per line, formatted as: Label | https://url</span>
                    </>
                  )}
                </div>

                <button
                  className="aef-block-remove"
                  onClick={() => removeBlock(i)}
                  title="Remove block"
                >
                  <TrashIcon />
                </button>
              </div>
            ))}

            <button className="aef-add-btn" onClick={addBlock}>
              + Add Block
            </button>
          </div>

          <div className="aef-card shadow-lg">
            <div className="aef-card-header">
              <QrIcon />
              <span className="aef-card-label">QR Codes (JSONB)</span>
            </div>
            <p className="aef-section-desc">
              QR codes appear on the event detail page sidebar. The QR image is generated
              automatically from the Link URL when you save — you don't need to upload one.
            </p>

            {form.qr_codes.map((qr, i) => (
              <div key={i} className="aef-qr-row">
                <div className="aef-qr-fields" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                  <input
                    className="aef-input"
                    placeholder="Label (e.g. Map Location)"
                    value={qr.label}
                    onChange={e => updateQr(i, 'label', e.target.value)}
                  />
                  <input
                    className="aef-input"
                    placeholder="Link URL"
                    value={qr.linkUrl}
                    onChange={e => updateQr(i, 'linkUrl', e.target.value)}
                  />
                  <input
                    className="aef-input"
                    placeholder="Link Label (e.g. View on Google Maps)"
                    value={qr.linkLabel || ''}
                    onChange={e => updateQr(i, 'linkLabel', e.target.value)}
                  />
                </div>
                <button
                  className="aef-block-remove"
                  onClick={() => removeQr(i)}
                  title="Remove QR code"
                >
                  <TrashIcon />
                </button>
              </div>
            ))}

            <button className="aef-add-btn" onClick={addQr}>
              + Add QR Code
            </button>
          </div>

          {isEdit && (
            <div className="aef-danger-zone">
              <button onClick={() => setDeleteModal(true)} className="aef-delete-link-btn">
                <TrashIcon /> DELETE THIS EVENT
              </button>
            </div>
          )}

        </div>

        {/* Right column: Media & Links, Settings, Footer */}
        <div className="col-md-4 aef-col-right">

          <div className="aef-card shadow-lg">
            <div className="aef-card-header">
              <LinkIcon />
              <span className="aef-card-label">Media &amp; Links</span>
            </div>

            <div className="aef-field">
              <label className="aef-label">Event Image</label>
              <div
                className="aef-dropzone"
                onDragOver={e => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="aef-file-input"
                  onChange={handleImageSelect}
                />

                {imagePreview ? (
                  <div className="aef-dropzone-preview">
                    <img src={imagePreview} alt="Event preview" className="aef-image-preview" />
                    <button
                      type="button"
                      className="aef-remove-image-btn"
                      onClick={removeImage}
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="aef-dropzone-content">
                    <img src={uploadIcon} alt="Upload icon" className="aef-dropzone-icon" />
                    <p className="aef-dropzone-title">Drop an image here or click to browse</p>
                    <p className="aef-dropzone-subtitle">PNG, JPG, WEBP up to 5MB</p>
                  </div>
                )}
              </div>
              {uploading && <span className="aef-uploading">Uploading image…</span>}
              <span className="aef-help-text">The image will be uploaded to the event-images storage bucket.</span>
            </div>

            <div className="aef-field aef-field--last">
              <label className="aef-label">Register URL</label>
              <input
                className="aef-input"
                placeholder="https://lu.ma/..."
                value={form.register_url}
                onChange={e => setForm(f => ({ ...f, register_url: e.target.value }))}
              />
            </div>
          </div>

          <div className="aef-card shadow-lg">
            <div className="aef-card-header">
              <SettingsIcon />
              <span className="aef-card-label">Settings</span>
            </div>

            <div className="aef-toggle-row">
              <div>
                <p className="aef-toggle-label">Requires Registration</p>
                <p className="aef-toggle-desc">Show a Register button on the public event page</p>
              </div>
              <button
                className={`aef-toggle${form.requires_registration ? ' aef-toggle--on' : ''}`}
                onClick={() => setForm(f => ({ ...f, requires_registration: !f.requires_registration }))}
                aria-pressed={form.requires_registration}
              >
                <span className="aef-toggle-thumb" />
              </button>
            </div>
          </div>

          <div className="aef-footer-bar">
            <button onClick={() => navigate('/admin/events')} className="aef-cancel-btn">
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving} className="aef-save-btn">
              {saving ? 'Saving…' : 'Save Event'}
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
function CalIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
}
function LinkIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
}
function SettingsIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
}
function BlockIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
}
function QrIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="3" height="3" /></svg>
}
function TrashIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3,6 5,6 21,6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" /></svg>
}
