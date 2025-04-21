import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Book } from '@/interfaces'

export const useUserBookReview = (book: Book, userId?: string) => {
  const supabase = createClient()
  const [initialRating, setInitialRating] = useState<number | null>(null)
  const [initialReview, setInitialReview] = useState<string>('')
  const [bookId, setBookId] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return

    const fetchUserReview = async () => {
      const { data: bookData, error: bookError } = await supabase
        .from('books')
        .upsert(
          {
            title: book.title,
            author_names: book.authors.join(', '),
            cover_url: book.coverUrl,
            work_id: book.workId,
            edition_key: book.editionKey,
            author_keys: book.authorKeys?.join(', '),
          },
          { onConflict: 'work_id' }
        )
        .select('id')
        .single()

      if (bookError || !bookData) {
        console.error('Error inserting or fetching book:', bookError?.message)
        return
      }

      setBookId(bookData.id)

      const { data: userBookData, error: userBookError } = await supabase
        .from('user_books')
        .select('rating, review')
        .eq('user_id', userId)
        .eq('book_id', bookData.id)
        .maybeSingle()

      if (userBookError) {
        console.error('Error fetching user book data:', userBookError.message)
        return
      }

      if (userBookData) {
        setInitialRating(userBookData.rating)
        setInitialReview(userBookData.review || '')
      }
    }

    fetchUserReview()
  }, [userId, book])

  const handleSaveReview = async (
    rating: number | null,
    review: string,
    onSuccess?: () => void
  ) => {
    if (!userId || !bookId) return

    const { error } = await supabase.from('user_books').upsert(
      {
        user_id: userId,
        book_id: bookId,
        rating,
        review,
      },
      {
        onConflict: 'user_id,book_id',
      }
    )

    if (error) {
      console.error('Error saving review:', error.message)
    } else {
      setInitialRating(rating)
      setInitialReview(review)
    }
    if (onSuccess) onSuccess()
  }

  return {
    initialRating,
    initialReview,
    handleSaveReview,
  }
}
