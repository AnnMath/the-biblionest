'use client'

import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

// This is a little dummy component to track book views
// as BookDetailCard is a server component, I don't want to do side-effecty things like incrementing a count
// Also, only real views, so not bots or other server weirdness
const TrackBookViews = ({ workId }: { workId: string }) => {
  useEffect(() => {
    const supabase = createClient()

    const incrementView = async () => {
      const { error } = await supabase.rpc('increment_view_count', {
        target_work_id: workId,
      })

      if (error) {
        console.error('Failed to track view:', error.message)
      }
    }

    const timeout = setTimeout(incrementView, 1000)

    return () => clearTimeout(timeout)
  }, [workId])

  return null
}

export default TrackBookViews
