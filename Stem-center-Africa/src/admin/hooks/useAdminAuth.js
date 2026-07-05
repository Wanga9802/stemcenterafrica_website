import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../lib/supabaseClient'

export function useAdminAuth() {
  const [session, setSession] = useState(undefined)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return
        setSession(data.session)
        setUser(data.session?.user ?? null)
        setLoading(false)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err)
        setLoading(false)
      })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error)
    } else {
      setSession(data.session)
      setUser(data.session?.user ?? null)
    }

    setLoading(false)
    return { data, error }
  }, [])

  const signOut = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signOut()
    if (error) {
      setError(error)
    } else {
      setSession(null)
      setUser(null)
    }

    setLoading(false)
    return { error }
  }, [])

  return {
    session,
    user,
    loading,
    error,
    signIn,
    signOut,
  }
}
