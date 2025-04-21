import { fetchPopularWorksByAuthor } from '@/lib/api'
import TheSpiteCarousel from '../carousel/the-spite-carousel'
import { Book } from '@/interfaces'

const ByAuthorCarousel = async ({ book }: { book: Book }) => {
  const allRelated = await fetchPopularWorksByAuthor(book.authors[0])
  const related = allRelated.filter((relBook) => relBook.title !== book.title)
  if (related.length < 5) return null
  return (
    <div className="max-w-[1024px] mx-auto mt-8">
      <TheSpiteCarousel
        books={related}
        header={`More from ${book.authors[0]}`}
        description=""
      />
    </div>
  )
}

export default ByAuthorCarousel
