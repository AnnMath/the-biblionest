import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

// NOTE! Client session only

export const useSessionStatus = () => {
  const supabase = createClient()
  const [userId, setUserId] = useState<string | undefined>(undefined)
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
      } else {
        setUserId(session.user.id)
        setIsLoggedIn(true)
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
      } else {
        setIsLoggedIn(false)
        setUserId(undefined)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return { userId, isLoggedIn, isSessionLoading }
}
