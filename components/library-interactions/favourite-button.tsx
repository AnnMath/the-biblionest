'use client'

import { createClient } from '@/utils/supabase/client'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import CustomToast from '../custom-toast/custom-toast'
import { Heart } from 'lucide-react'
import { BookButtonProps } from '@/interfaces'
import { useSessionStatus } from '@/lib/hooks/useSessionStatus'

const FavouriteButton = ({
  title,
  authors,
  coverUrl,
  workId,
}: BookButtonProps) => {
  const supabase = createClient()

  const [bookId, setBookId] = useState<string | null>(null)
  const [isFavourite, setIsFavourite] = useState<boolean>(false)
  const [isBookStatusLoading, setIsBookStatusLoading] = useState(true)

  const { userId, isLoggedIn, isSessionLoading } = useSessionStatus()

  const checkIfFavourited = async () => {
    if (!userId) {
      setIsBookStatusLoading(false)
      return
    }

    // check if the book exists in the book table. If not, insert it and get the book_id
    const { data: bookData, error: bookError } = await supabase
      .from('books')
      .upsert(
        {
          title,
          author_names: authors.join(', '),
          cover_url: coverUrl,
          work_id: workId,
        },
        { onConflict: 'work_id' }
      )
      .select('id')
      .single()

    if (bookError || !bookData) {
      console.error('Error fetching/inserting book:', bookError?.message)
      setIsBookStatusLoading(false)
      return
    }

    setBookId(bookData.id)

    //  check if the user has favourited this book
    const { data: userBookData, error: userBookError } = await supabase
      .from('user_books')
      .select('is_favourite')
      .eq('user_id', userId)
      .eq('book_id', bookData.id) // use the value directly here
      .maybeSingle()

    if (userBookError) {
      console.log('No user_book entry yet, not favourited')
      setIsFavourite(false)
    } else {
      setIsFavourite(userBookData?.is_favourite || false)
    }

    setIsBookStatusLoading(false)
  }

  useEffect(() => {
    if (userId) {
      checkIfFavourited()
    }
  }, [userId])

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
