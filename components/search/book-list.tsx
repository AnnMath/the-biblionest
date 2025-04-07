import { BookLite } from '@/interfaces'
import BookListCard from './book-list-card'

const BookList = ({ books }: { books: BookLite[] }) => {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
      {books.map((book) => (
        <BookListCard key={book.workId} book={book} />
      ))}
    </div>
  )
}

export default BookList
