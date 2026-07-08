import { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useAdminAuth } from '../hooks/useAdminAuth'
import '../styles/Adminlogin.css'
import mailingIcon from '../../assets/mailing.png'
import padlockIcon from '../../assets/padlock.png'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)
  const [resetLoading, setResetLoading] = useState(false)
  const { session, loading, error, signIn } = useAdminAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError(null)
    setStatusMessage(null)

    const trimmedEmail = email.trim()
    if (trimmedEmail !== trimmedEmail.toLowerCase()) {
      setSubmitError('Invalid login credentials.')
      return
    }

    const { error: signError } = await signIn({ email: trimmedEmail, password, keepSignedIn })
    if (signError) {
      setSubmitError(signError.message || 'Invalid login credentials.')
      return
    }

    navigate('/admin', { replace: true })
  }

  const handleForgotPassword = async () => {
    setSubmitError(null)
    setStatusMessage(null)

    if (!email) {
      setSubmitError('Please enter your email address first.')
      return
    }

    const redirectTo = `${window.location.origin}/admin/reset-password`

    setResetLoading(true)
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    })
    setResetLoading(false)

    if (resetError) {
      setSubmitError(resetError.message || 'Unable to send reset email.')
    } else {
      setStatusMessage('An email reset link has been sent to your inbox.')
    }
  }

  if (session) {
    return <Navigate to="/admin" replace />
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>STEM Center Africa</h1>
          <p>Administrative Command Center</p>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <div className="input-with-icon">
              <img src={mailingIcon} alt="Email icon" className="input-icon email-icon" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-row">
              <div className="input-with-icon">
                <img src={padlockIcon} alt="Password icon" className="input-icon password-icon" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="form-meta">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
              />
              Remember me
            </label>
            <button
              type="button"
              className="link-button"
              onClick={handleForgotPassword}
              disabled={resetLoading}
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          {(submitError || error) && (
            <p className="error">{submitError || error?.message}</p>
          )}
          {statusMessage && <p className="status">{statusMessage}</p>}
        </form>

        <footer className="admin-login-footer">
          <Link to="/">Public Website</Link>
          <a href="mailto:support@stemafrica.org">Support</a>
          <Link to="/privacy">Privacy</Link>
        </footer>
      </div>
    </div>
  )
}
