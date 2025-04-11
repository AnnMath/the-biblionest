'use client'

import { createClient } from '@/utils/supabase/client'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import CustomToast from '../custom-toast/custom-toast'
import { Heart } from 'lucide-react'
import { BookButtonProps } from '@/interfaces'
import { useSessionStatus } from '@/lib/hooks/useSessionStatus'
import { useBookStatus } from '@/lib/hooks/useBookStatus'

const FavouriteButton = ({
  title,
  authors,
  coverUrl,
  workId,
}: BookButtonProps) => {
  const supabase = createClient()

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
    userId,
    column: 'is_favourite',
  })

  const handleClick = async () => {
    if (!isLoggedIn) {
      toast(
        <CustomToast
          message="Please log in to add to favourites!"
          color="bg-info-500/70"
        />,
        {
          unstyled: true,
        }
      )
      return
    }

    if (!userId || !bookId) {
      console.warn('Missing user or book ID — cannot toggle favourite.')
      return
    }

    const { error } = await supabase.from('user_books').upsert(
      {
        user_id: userId,
        book_id: bookId,
        is_favourite: !isFavourite,
      },
      { onConflict: 'user_id,book_id' }
    )

    if (error) {
      console.error('Error toggling favourite:', error.message)
      return
    }

    setIsFavourite(!isFavourite)

    if (isFavourite) {
      toast(
        <CustomToast
          message="Removed from favourites"
          color="bg-info-200/70"
        />,
        {
          unstyled: true,
        }
      )
    } else {
      toast(
        <CustomToast message="Added to favourites" color="bg-info-200/70" />,
        {
          unstyled: true,
        }
      )
    }
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
            <Heart className="text-rose-500" fill="oklch(64.5% 0.246 16.439)" />
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
