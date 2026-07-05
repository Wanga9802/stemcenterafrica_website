import { useState } from 'react'
import '../../Styles/Joinus.css'
import { supabase } from '../../lib/supabaseClient'
import pythonImg from '../../assets/python.jpg'
import scratchImg from '../../assets/scratch.jpg'
import roboticsImg from '../../assets/Robotics.jpg'
import arduinoImg from '../../assets/ARDUINO.jpg'

const INTEREST_OPTIONS = [
  'Web Development',
  'Robotics & Embedded Systems',
  'Arduino & IoT',
  'Python Programming',
  'Basic Computer Skills',
  'Scratch for Kids',
]

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  describesYou: '',
  interests: [],
}

function Joinus() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error | duplicate
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const toggleInterest = (item) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter((i) => i !== item)
        : [...prev.interests, item],
    }))
  }

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email) {
      setStatus('error')
      setErrorMessage('Please fill in your first name, last name, and email.')
      return
    }

    if (!form.describesYou) {
      setStatus('error')
      setErrorMessage('Please tell us which of these best describes you.')
      return
    }

    if (form.interests.length === 0) {
      setStatus('error')
      setErrorMessage('Please select at least one area of interest.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    const { error } = await supabase.from('community_signups').insert({
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      describes_you: form.describesYou || null,
      interests: form.interests,
    })

    if (error) {
      // Postgres unique_violation code for the duplicate email constraint
      if (error.code === '23505') {
        setStatus('duplicate')
      } else {
        setStatus('error')
        setErrorMessage('Something went wrong. Please try again.')
      }
      return
    }

    setStatus('success')
    setForm(INITIAL_FORM)
  }

  return (
    <section className='join-section'>
      <div className="join-container">

        {/* ── Intro heading block── */}
        <div className="join-intro">
          <h2 className="join-intro-title">
            Join  STEM Community of Innovators and Tech Leaders
          </h2>
          <p className="join-intro-body">
            At STEM Center Africa, you're not just signing up for a course — you're joining a
            dynamic, thriving community of young innovators and professionals. Whether you're a
            beginner or an experienced tech enthusiast, our community is here to support you to
            Discover, Grow, and Transform your future in Tech.
          </p>
        </div>

        {/* Top tagline */}
        <p className="join-tagline">
          Stay up to date with upcoming events, free learning materials, news and updates!
        </p>

        <div className="join-row">

          {/* ── Left column: staggered image grid ── */}
          <div className="join-images">
            <div className="join-img-grid">

              {/* Left column: top-left starts high, bottom-left overlaps up */}
              <div className="join-img-col">
                <div className="join-img-cell cell-top-left">
                  <img src={pythonImg} alt="Python Programming" className="join-img" />
                </div>
                <div className="join-img-cell cell-bottom-left">
                  <img src={arduinoImg} alt="Arduino & IoT" className="join-img" />
                </div>
              </div>

              {/* Right column: top-right offset down, bottom-right lower */}
              <div className="join-img-col">
                <div className="join-img-cell cell-top-right">
                  <img src={roboticsImg} alt="Robotics" className="join-img" />
                </div>
                <div className="join-img-cell cell-bottom-right">
                  <img src={scratchImg} alt="Scratch Coding" className="join-img" />
                </div>
              </div>

            </div>
          </div>

          {/* ── Right column: form card ── */}
          <div className="join-form-col">
            <div className="join-card">

              <h2 className="join-card-title">Stay Updated with STEM Center Africa</h2>
              <p className="join-card-subtitle">
                Sign up to receive learning resources, event invites, and important updates.
              </p>

              {status === 'success' ? (
                <div className="join-success-message">
                  Thanks for signing up! Keep an eye on your inbox for updates.
                </div>
              ) : (
                <div className="join-form">

                  {status === 'duplicate' && (
                    <div className="join-form-message join-form-message-warning">
                      This email is already signed up — no need to submit again!
                    </div>
                  )}

                  {status === 'error' && errorMessage && (
                    <div className="join-form-message join-form-message-error">
                      {errorMessage}
                    </div>
                  )}

                  <div className="join-form-row">
                    <div className="join-field">
                      <label className="join-label" htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        className="join-input"
                        value={form.firstName}
                        onChange={handleChange('firstName')}
                      />
                    </div>
                    <div className="join-field">
                      <label className="join-label" htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        className="join-input"
                        value={form.lastName}
                        onChange={handleChange('lastName')}
                      />
                    </div>
                  </div>

                  <div className="join-field">
                    <label className="join-label" htmlFor="email">
                      Email <span className="join-required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="join-input"
                      value={form.email}
                      onChange={handleChange('email')}
                    />
                  </div>

                  <div className="join-field">
                    <label className="join-label" htmlFor="role">
                      Which of these best describes you? <span className="join-required">*</span>
                    </label>
                    <select
                      id="role"
                      className="join-input join-select"
                      value={form.describesYou}
                      onChange={handleChange('describesYou')}
                    >
                      <option value="" disabled hidden />
                      <option value="student">Student</option>
                      <option value="professional">Working Professional</option>
                      <option value="educator">Educator</option>
                      <option value="parent">Parent</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="join-field">
                    <label className="join-label">
                      What are you interested in? <span className="join-required">*</span>
                    </label>
                    <div className="join-checkboxes">
                      {INTEREST_OPTIONS.map((item) => (
                        <label key={item} className="join-checkbox-label">
                          <input
                            type="checkbox"
                            className="join-checkbox"
                            checked={form.interests.includes(item)}
                            onChange={() => toggleInterest(item)}
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="join-submit-btn"
                    onClick={handleSubmit}
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'Submitting…' : 'Submit'}
                  </button>

                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Joinus;
