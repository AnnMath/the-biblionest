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
  editionKey,
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
    editionKey,
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
            <LibraryBig fill="oklch(0.63 0.045 50)" />I own this
          </>
        ) : (
          <>
            <LibraryBig />
            Mark as owned
          </>
        )}
      </Button>
    </>
  )
}

export default HasBookButton
