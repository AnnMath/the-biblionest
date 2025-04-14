'use client'

import MyLibrary from '@/components/library/my-library'
import { useSessionStatus } from '@/lib/hooks/useSessionStatus'

const MyLibraryPage = () => {
  const { isLoggedIn, isSessionLoading } = useSessionStatus()
  if (isSessionLoading) return <p>Loading your library...</p>

  if (!isLoggedIn) {
    return (
      <div className="text-center p-8">
        <p className="text-sm mb-4">
          Please log in or sign up to see your books.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-background-300 min-h-screen w-screen py-8 flex flex-col gap-12 items-center">
      <MyLibrary />
    </div>
  )
}

export default MyLibraryPage
