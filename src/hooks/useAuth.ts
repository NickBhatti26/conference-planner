import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, metadata: any) => {
    setLoading(true)
    
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata }
    })

    if (signUpError) {
      setLoading(false)
      return { error: signUpError }
    }

    if (authData.user) {
      // SAFE interests handling
      const rawInterests = metadata.interests
      let processedInterests: string[] = []
      
      if (Array.isArray(rawInterests)) {
        processedInterests = rawInterests
      } else if (typeof rawInterests === 'string' && rawInterests.trim()) {
        processedInterests = rawInterests.split(',').map((i: string) => i.trim())
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: authData.user.id,
          full_name: metadata.full_name,
          specialty: metadata.specialty,
          role: metadata.role,
          interests: processedInterests
        }])

      if (profileError) {
        console.error('Profile error:', profileError)
      }
    }

    setLoading(false)
    return { error: null }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  return { user, loading, signUp, signIn, signOut }
}