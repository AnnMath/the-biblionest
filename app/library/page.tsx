'use client'

import MyLibrary from '@/components/library/my-library'
import FullScreenLoader from '@/components/loading/full-screen-loader'
import LoggedOut from '@/components/logged-out/logged-out'
import { useSessionStatus } from '@/lib/hooks/useSessionStatus'

const MyLibraryPage = () => {
  const { isLoggedIn, isSessionLoading } = useSessionStatus()
  if (isSessionLoading) return <FullScreenLoader />

  if (!isLoggedIn) {
    return <LoggedOut message="your library" />
  }

  return (
    <div className="bg-background-300 min-h-screen w-screen py-8 flex flex-col gap-12 items-center">
      <MyLibrary />
    </div>
  )
}

export default MyLibraryPage
