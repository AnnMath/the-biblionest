import { Book } from '@/interfaces'
import BookSidebar from './book-sidebar'
import BookSynopsis from './book-synopsis'
import BookInfo from './book-info'
import BookOrnamentBottom from '../ornaments/book-ornament-bottom'
import BookOrnamentTop from '../ornaments/book-ornament-top'

const BookDetailCard = ({ book }: { book: Book }) => {
  return (
    <div className="max-w-[1024px] w-9/10 md:w-full bg-background-50 mx-auto py-4 rounded-xl shadow-md">
      <BookOrnamentTop />
      <section className="grid grid-cols-1 md:grid-cols-3 p-8 justify-items-center">
        <BookSidebar book={book} />
        <div className="col-span-1 md:col-span-2 gap-2 flex flex-col">
          <h1 className="font-heading font-bold italic text-2xl md:text-4xl">
            {book.title}
          </h1>
          <p className="font-bold">By {book.authors.join(', ')}</p>
          <BookSynopsis synopsis={book.synopsis} />
          <BookInfo book={book} />
        </div>
      </section>
      <BookOrnamentBottom />
    </div>
  )
}

export default BookDetailCard
