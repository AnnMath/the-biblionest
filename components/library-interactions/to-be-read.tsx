'use client'

import { BookOpen } from 'lucide-react'
import { Button } from '../ui/button'
import { BookButtonProps } from '@/interfaces'
import { useSessionStatus } from '@/lib/hooks/useSessionStatus'
import { useBookStatus } from '@/lib/hooks/useBookStatus'
import { handleBookStatusToggle } from './handleBookStatusToggle'

const ToBeReadButton = ({
  title,
  authors,
  coverUrl,
  workId,
  editionKey,
}: BookButtonProps) => {
  const { userId, isLoggedIn, isSessionLoading } = useSessionStatus()

  const {
    bookId,
    statusValue: toBeRead,
    setStatusValue: setToBeRead,
    isBookStatusLoading,
  } = useBookStatus({
    workId,
    title,
    authors,
    coverUrl,
    editionKey,
    userId,
    column: 'to_be_read',
  })

  const handleClick = async () => {
    await handleBookStatusToggle({
      isLoggedIn,
      userId,
      bookId,
      column: 'to_be_read',
      currentValue: toBeRead,
      setValue: setToBeRead,
      toastMessages: {
        on: 'Added to your to-read pile',
        off: 'Removed from to-read pile',
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
        {toBeRead ? (
          <>
            <BookOpen fill="oklch(0.73 0.05 80)" />I want to read this
          </>
        ) : (
          <>
            <BookOpen />
            Put in to-read pile
          </>
        )}
      </Button>
    </>
  )
}

export default ToBeReadButton
