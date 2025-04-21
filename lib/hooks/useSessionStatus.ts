import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

// NOTE! Client session only

export const useSessionStatus = () => {
  const supabase = createClient()
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const [displayName, setDisplayName] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSessionLoading, setIsSessionLoading] = useState(true)

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        setIsLoggedIn(false)
        setUserId(undefined)
        setDisplayName(null)
        setIsSessionLoading(false)
        return
      }

      setUserId(session.user.id)
      setIsLoggedIn(true)

      const { data, error } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', session.user.id)
        .single()

      if (!error && data) {
        setDisplayName(data.display_name)
      }

      setIsSessionLoading(false)
    }

    fetchSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsLoggedIn(true)
        setUserId(session.user.id)
        fetchSession()
      } else {
        setIsLoggedIn(false)
        setUserId(undefined)
        setDisplayName(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return { userId, displayName, isLoggedIn, isSessionLoading }
}
