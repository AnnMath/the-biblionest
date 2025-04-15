'use client'

import { Button } from '../ui/button'
import { Heart } from 'lucide-react'
import { BookButtonProps } from '@/interfaces'
import { useSessionStatus } from '@/lib/hooks/useSessionStatus'
import { useBookStatus } from '@/lib/hooks/useBookStatus'
import { handleBookStatusToggle } from './handleBookStatusToggle'

const FavouriteButton = ({
  title,
  authors,
  coverUrl,
  workId,
  editionKey,
  authorKeys,
}: BookButtonProps) => {
  const { userId, isLoggedIn, isSessionLoading } = useSessionStatus()

  const {
    bookId,
    statusValue: isFavourite,
    setStatusValue: setIsFavourite,
    isBookStatusLoading,
  } = useBookStatus({
    workId,
    title,
    authors,
    coverUrl,
    editionKey,
    userId,
    authorKeys,
    column: 'is_favourite',
  })

  const handleClick = async () => {
    await handleBookStatusToggle({
      isLoggedIn,
      userId,
      bookId,
      column: 'is_favourite',
      currentValue: isFavourite,
      setValue: setIsFavourite,
      toastMessages: {
        on: 'Added to favourites',
        off: 'Removed from favourites',
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
        {isFavourite ? (
          <>
            <Heart fill="oklch(65% 0.16 18)" />
            In favourites
          </>
        ) : (
          <>
            <Heart />
            Add to favourites
          </>
        )}
      </Button>
    </>
  )
}

export default FavouriteButton
