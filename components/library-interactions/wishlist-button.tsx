'use client'

import { Bookmark } from 'lucide-react'
import { Button } from '../ui/button'
import { BookButtonProps } from '@/interfaces'
import { useSessionStatus } from '@/lib/hooks/useSessionStatus'
import { useBookStatus } from '@/lib/hooks/useBookStatus'
import { handleBookStatusToggle } from './handleBookStatusToggle'

const WishListButton = ({
  title,
  authors,
  coverUrl,
  workId,
}: BookButtonProps) => {
  const { userId, isLoggedIn, isSessionLoading } = useSessionStatus()

  const {
    bookId,
    statusValue: isInWishList,
    setStatusValue: setIsInWishList,
    isBookStatusLoading,
  } = useBookStatus({
    workId,
    title,
    authors,
    coverUrl,
    userId,
    column: 'is_in_wishlist',
  })

  const handleClick = async () => {
    await handleBookStatusToggle({
      isLoggedIn,
      userId,
      bookId,
      column: 'is_in_wishlist',
      currentValue: isInWishList,
      setValue: setIsInWishList,
      toastMessages: {
        on: 'Added to wishlist',
        off: 'Removed from wishlist',
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
        {isInWishList ? (
          <>
            <Bookmark fill="oklch(77% 0.13 85)" />
            In wishlist
          </>
        ) : (
          <>
            <Bookmark />
            Add to wishlist
          </>
        )}
      </Button>
    </>
  )
}

export default WishListButton
