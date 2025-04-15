import { Book } from '@/interfaces'
import Image from 'next/image'
import PlaceholderImage from '../placeholder-image/placeholder-image'
import ShowStarRating from '../rating/show-star-rating'
import FavouriteButton from '../library-interactions/favourite-button'
import WishListButton from '../library-interactions/wishlist-button'
import HasBookButton from '../library-interactions/has-book-button'
import HasReadButton from '../library-interactions/has-read-button'
import ToBeReadButton from '../library-interactions/to-be-read'

const BookSidebar = ({ book }: { book: Book }) => {
  return (
    <aside className="col-span-1 flex flex-col gap-3">
      <div className="relative w-[180px] h-[270px]">
        {book.coverUrl ? (
          <Image
            src={book.coverUrl}
            alt={`cover of ${book.title}`}
            fill
            sizes="180px"
            className="rounded-r-xl"
            placeholder="blur"
            blurDataURL="/placeholder.jpg"
          />
        ) : (
          <PlaceholderImage />
        )}
      </div>
      {book.rating?.average !== null ? (
        <>
          <ShowStarRating rating={book.rating?.average} />{' '}
          <p className="text-sm">
            {book.rating?.average.toFixed(1)} from {book.rating?.count}{' '}
            {book.rating?.count === 1 ? 'rating' : 'ratings'}
          </p>
        </>
      ) : (
        <p className="text-sm">No ratings yet</p>
      )}
      <FavouriteButton
        title={book.title}
        authors={book.authors}
        coverUrl={book.coverUrl}
        workId={book.workId}
        editionKey={book.editionKey}
        authorKeys={book.authorKeys}
      />
      <WishListButton
        title={book.title}
        authors={book.authors}
        coverUrl={book.coverUrl}
        workId={book.workId}
        editionKey={book.editionKey}
        authorKeys={book.authorKeys}
      />
      <HasBookButton
        title={book.title}
        authors={book.authors}
        coverUrl={book.coverUrl}
        workId={book.workId}
        editionKey={book.editionKey}
        authorKeys={book.authorKeys}
      />
      <HasReadButton
        title={book.title}
        authors={book.authors}
        coverUrl={book.coverUrl}
        workId={book.workId}
        editionKey={book.editionKey}
        authorKeys={book.authorKeys}
      />
      <ToBeReadButton
        title={book.title}
        authors={book.authors}
        coverUrl={book.coverUrl}
        workId={book.workId}
        editionKey={book.editionKey}
        authorKeys={book.authorKeys}
      />
    </aside>
  )
}

export default BookSidebar
