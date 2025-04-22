import BookDetailCard from '@/components/book-details/book-detail-card'
import ErrorPage from '@/components/error/error-page'
import { fetchBookById } from '@/lib/api'

const BookDetailsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | null | undefined }>
}) => {
  const { id } = await params
  const searchParamObj = await searchParams
  const edition = searchParamObj.edition

  const book = await fetchBookById(id, edition)
  // TODO: maybe some better error handling here
  if (!book) return <ErrorPage />

  return (
    <div className="bg-background-300 min-h-screen w-full py-8">
      <BookDetailCard book={book} />
    </div>
  )
}

export default BookDetailsPage
