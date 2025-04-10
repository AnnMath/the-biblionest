'use client'

import { createClient } from '@/utils/supabase/client'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import CustomToast from '../custom-toast/custom-toast'

interface FavouriteButtonProps {
  title: string
  authors: string[]
  coverUrl: string | undefined
  workId: string
}

const FavouriteButton = ({
  title,
  authors,
  coverUrl,
  workId,
}: FavouriteButtonProps) => {
  const supabase = createClient()

  const [userId, setUserId] = useState<string | undefined>(undefined)
  const [bookId, setBookId] = useState<string | null>(null)
  const [isFavourite, setIsFavourite] = useState<boolean>(false)
  const [isLoadingFavouriteStatus, setIsLoadingFavouriteStatus] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      console.log('Not logged in')
      setIsLoggedIn(false)
      setUserId(undefined)
      setIsLoadingFavouriteStatus(false)
      return
    }

    setUserId(session?.user.id)
    setIsLoggedIn(true)
  }

  const checkIfFavourited = async () => {
    if (!userId) {
      setIsLoadingFavouriteStatus(false)
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
      setIsLoadingFavouriteStatus(false)
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

    setIsLoadingFavouriteStatus(false)
  }

  useEffect(() => {
    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsLoggedIn(true)
        setUserId(session.user.id)
      } else {
        setIsLoggedIn(false)
        setUserId(undefined)
        setBookId(null)
        setIsFavourite(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (userId) {
      checkIfFavourited()
    }
  }, [userId])

  const handleClick = async () => {
    if (!isLoggedIn) {
      toast(<CustomToast message="Please log in to add to favourites!" />)
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
  }
  return (
    <>
      <Button onClick={handleClick} disabled={isLoadingFavouriteStatus}>
        {isFavourite ? 'Favourited' : 'Add to favourites'}
      </Button>
      <Toaster position="bottom-center" />
    </>
  )
}

export default FavouriteButton
