'use client'

import MyLibrary from '@/components/library/my-library'
import LoggedOut from '@/components/logged-out/logged-out'
import { useSessionStatus } from '@/lib/hooks/useSessionStatus'

const MyLibraryPage = () => {
  const { isLoggedIn, isSessionLoading } = useSessionStatus()
  if (isSessionLoading) return <p>Loading your library...</p>

  if (!isLoggedIn) {
    return <LoggedOut page="library" />
  }

  return (
    <div className="bg-background-300 min-h-screen w-screen py-8 flex flex-col gap-12 items-center">
      <MyLibrary />
    </div>
  )
}

export default MyLibraryPage
