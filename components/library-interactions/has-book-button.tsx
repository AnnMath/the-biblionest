'use client'

import { LibraryBig } from 'lucide-react'
import { Button } from '../ui/button'
import { BookButtonProps } from '@/interfaces'
import { useSessionStatus } from '@/lib/hooks/useSessionStatus'
import { useBookStatus } from '@/lib/hooks/useBookStatus'
import { handleBookStatusToggle } from './handleBookStatusToggle'

const HasBookButton = ({
  title,
  authors,
  coverUrl,
  workId,
}: BookButtonProps) => {
  const { userId, isLoggedIn, isSessionLoading } = useSessionStatus()

  const {
    bookId,
    statusValue: hasBook,
    setStatusValue: setHasBook,
    isBookStatusLoading,
  } = useBookStatus({
    workId,
    title,
    authors,
    coverUrl,
    userId,
    column: 'has_book',
  })

  const handleClick = async () => {
    await handleBookStatusToggle({
      isLoggedIn,
      userId,
      bookId,
      column: 'has_book',
      currentValue: hasBook,
      setValue: setHasBook,
      toastMessages: {
        on: 'Added to your bookshelf',
        off: 'Removed from your bookshelf',
      },
    })
  }
  return (
    <>
      <Button
        onClick={handleClick}
        disabled={isSessionLoading || isBookStatusLoading}
        variant="outline"
      >
        {hasBook ? (
          <>
            <LibraryBig fill="oklch(64.9% 0.12 35.14)" />I own this
          </>
        ) : (
          <>
            <LibraryBig />I don't own this
          </>
        )}
      </Button>
    </>
  )
}

export default HasBookButton
