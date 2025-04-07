import { BookLite } from '@/interfaces'
import Image from 'next/image'
import PlaceholderImage from '../placeholder-image/placeholder-image'

const BookList = ({ books }: { books: BookLite[] }) => {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
      {books.map((book) => (
        <div
          key={book.workId}
          className="bg-background-50 p-4 rounded-lg shadow-md flex flex-col gap-2 items-center justify-between text-text-500 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="w-2/3 aspect-[2/3] relative">
            {book.coverUrl ? (
              <Image
                src={book.coverUrl}
                alt={`${book.title} cover`}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="/placeholder.jpg"
              />
            ) : (
              <PlaceholderImage />
            )}
          </div>
          <div className="mt-auto max-w-2/3">
            <h3 className="font-bold text-lg">{book.title}</h3>
            {book.authors && (
              <p className="text-sm">By {book.authors.join(', ')}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default BookList
