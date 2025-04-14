'use client'

import { Book, BookCheck } from 'lucide-react'
import { Button } from '../ui/button'
import { BookButtonProps } from '@/interfaces'
import { useSessionStatus } from '@/lib/hooks/useSessionStatus'
import { useBookStatus } from '@/lib/hooks/useBookStatus'
import { handleBookStatusToggle } from './handleBookStatusToggle'

const HasReadButton = ({
  title,
  authors,
  coverUrl,
  workId,
  editionKey,
}: BookButtonProps) => {
  const { userId, isLoggedIn, isSessionLoading } = useSessionStatus()

  const {
    bookId,
    statusValue: hasRead,
    setStatusValue: setHasRead,
    isBookStatusLoading,
  } = useBookStatus({
    workId,
    title,
    authors,
    coverUrl,
    editionKey,
    userId,
    column: 'has_read',
  })

  const handleClick = async () => {
    await handleBookStatusToggle({
      isLoggedIn,
      userId,
      bookId,
      column: 'has_read',
      currentValue: hasRead,
      setValue: setHasRead,
      toastMessages: {
        on: 'Added to your read pile',
        off: 'Removed from your read pile',
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
        {hasRead ? (
          <>
            <BookCheck fill="oklch(0.66 0.04 140)" />
            I've read this
          </>
        ) : (
          <>
            <Book />
            Mark as read
          </>
        )}
      </Button>
    </>
  )
}

export default HasReadButton
