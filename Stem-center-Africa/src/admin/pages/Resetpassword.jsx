import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import '../styles/Resetpassword.css'
import padlockIcon from '../../assets/padlock.png'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // This listener fires when the session is recovered from the link
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === 'PASSWORD_RECOVERY') {
          setReady(true)  // show the form
        }
      }
    )
    return () => subscription.unsubscribe()
  }, [])

  const handleReset = async (e) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      alert('Password updated! Please sign in.')
      navigate('/admin/login')
    }
  }

  if (!ready) {
    return (
      <div className="reset-password-loading">
        <p>Verifying reset link...</p>
      </div>
    )
  }

  return (
    <div className="reset-password-page">
      <div className="reset-password-card">
        <h2>Set New Password</h2>

        {error && <p className="reset-password-error">{error}</p>}

        <form onSubmit={handleReset} className="reset-password-form">
          <div className="input-with-icon">
            <img src={padlockIcon} alt="Password icon" className="input-icon password-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="reset-password-input"
            />
          </div>

          <div className="password-input-row">
            <div className="input-with-icon">
              <img src={padlockIcon} alt="Password icon" className="input-icon password-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="reset-password-input"
              />
            </div>
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="reset-password-button"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}