import { BookLite } from '@/interfaces'
import { BookCheck, Bookmark, BookOpen, Heart, LibraryBig } from 'lucide-react'
import Link from 'next/link'

type LibraryBookCardProps = {
  book: BookLite
  status?: {
    is_favourite?: boolean
    is_in_wishlist?: boolean
    has_book?: boolean
    has_read?: boolean
    to_be_read?: boolean
  }
}

const LibraryBookCard = ({ book, status = {} }: LibraryBookCardProps) => {
  const { is_favourite, is_in_wishlist, has_book, has_read, to_be_read } =
    status

  return (
    <Link
      href={
        book.editionKey
          ? `/book/${book.workId}?edition=${book.editionKey}`
          : `/book/${book.workId}`
      }
      className="rounded-md border bg-background-100 p-4 shadow-md transition hover:shadow-lg flex gap-4 items-start"
    >
      <div className="flex flex-col justify-between gap-1">
        <h2 className="font-heading text-base font-bold text-text-500">
          {book.title}
        </h2>
        {book.authors?.length > 0 && (
          <p className="text-sm text-text-400 italic">By {book.authors[0]}</p>
        )}

        <div className="flex gap-2 mt-2 text-muted-foreground">
          {is_favourite && (
            <Heart fill="oklch(0.65 0.16 18)" className="w-4 h-4" />
          )}
          {is_in_wishlist && (
            <Bookmark fill="oklch(0.77 0.13 85)" className="w-4 h-4" />
          )}
          {has_book && (
            <LibraryBig fill="oklch(0.63 0.045 50)" className="w-4 h-4" />
          )}
          {has_read && (
            <BookCheck fill="oklch(0.66 0.04 140)" className="w-4 h-4" />
          )}
          {to_be_read && (
            <BookOpen fill="oklch(0.73 0.05 80)" className="w-4 h-4" />
          )}
        </div>
      </div>
    </Link>
  )
}

export default LibraryBookCard
