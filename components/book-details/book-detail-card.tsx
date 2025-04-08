import { Book } from '@/interfaces'
import Image from 'next/image'
import PlaceholderImage from '../placeholder-image/placeholder-image'
import { Star } from 'lucide-react'
import ShowStarRating from '../rating/show-star-rating'

const BookDetailCard = ({ book }: { book: Book }) => {
  return (
    <section className="max-w-[1024px] w-full bg-background-50 mx-auto py-8 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-3 p-4 place-items-center">
      <aside className="col-span-1">
        <div className="relative w-[180px] h-[270px]">
          {book.coverUrl ? (
            <Image
              src={book.coverUrl}
              alt={`cover of ${book.title}`}
              fill
              sizes="180px"
            />
          ) : (
            <PlaceholderImage />
          )}
        </div>
      </aside>
      <div className="col-span-1 md:col-span-2 gap-2">
        <h1 className="font-heading font-bold italic text-2xl md:text-4xl">
          {book.title}
        </h1>
        <p>By {book.authors.join(', ')}</p>
        {book.rating?.average !== null ? (
          <ShowStarRating rating={book.rating?.average} />
        ) : (
          <p>No ratings</p>
        )}
      </div>

      <div className=""></div>
    </section>
  )
}

export default BookDetailCard
