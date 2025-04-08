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
  console.log(book)

  return (
    <div>
      <h1 className="text-3xl">Book info here!</h1>
    </div>
  )
}

export default BookDetailsPage
