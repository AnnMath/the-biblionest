import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { BookStatusColumn } from '@/types'

interface UseBookStatusProps {
  workId: string
  title: string
  authors: string[]
  coverUrl: string | undefined
  editionKey?: string | null | undefined
  userId?: string
  column: BookStatusColumn
}

export const useBookStatus = ({
  workId,
  title,
  authors,
  coverUrl,
  editionKey,
  userId,
  column,
}: UseBookStatusProps) => {
  const supabase = createClient()

  const [bookId, setBookId] = useState<string | null>(null)
  const [statusValue, setStatusValue] = useState(false)
  const [isBookStatusLoading, setIsBookStatusLoading] = useState(true)

  useEffect(() => {
    const checkStatus = async () => {
      if (!userId) {
        setIsBookStatusLoading(false)
        return
      }

      const { data: bookData, error: bookError } = await supabase
        .from('books')
        .upsert(
          {
            title,
            author_names: authors.join(', '),
            cover_url: coverUrl,
            work_id: workId,
            edition_key: editionKey,
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

      const { data: userBookData, error: userBookError } = await supabase
        .from('user_books')
        .select(column)
        .eq('user_id', userId)
        .eq('book_id', bookData.id)
        .maybeSingle()

      if (userBookError) {
        console.log(`No user_book entry yet, not marked as ${column}`)
        setStatusValue(false)
      } else {
        setStatusValue(
          (userBookData as Record<string, boolean>)?.[column] || false
        )
      }

      setIsBookStatusLoading(false)
    }

    checkStatus()
  }, [userId, workId, title, authors, coverUrl, column])

  return { bookId, statusValue, setStatusValue, isBookStatusLoading }
}
