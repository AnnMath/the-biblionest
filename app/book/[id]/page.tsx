import BookDetailCard from '@/components/book-details/book-detail-card'
import { fetchBookById } from '@/lib/api'
import { notFound } from 'next/navigation'

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
  if (!book) notFound()

  console.log(book)

  return (
    <div className="bg-background-300 min-h-screen w-full py-8">
      <BookDetailCard book={book} />
    </div>
  )
}

export default BookDetailsPage
