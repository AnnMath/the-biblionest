import { BookLite } from '@/interfaces'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import PlaceholderImage from '../placeholder-image/placeholder-image'
import Link from 'next/link'

const BookListCard = ({ book }: { book: BookLite }) => {
  return (
    <Link
      href={
        book.editionKey
          ? `/book/${book.workId}?edition=${book.editionKey}`
          : `/book/${book.workId}`
      }
      className="book-item"
    >
      <Card className="flex flex-col items-center bg-background-100 justify-between text-text-500 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl h-full">
        <Image src="/decoration-2-top.svg" alt="" width={142} height={20} />
        <div className="relative w-[180px] h-[270px] flex items-center justify-center">
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
        <Image src="/decoration-2-bottom.svg" alt="" width={142} height={20} />
        <CardContent className="mt-auto px-4">
          <h2 className="font-bold font-heading text-lg">{book.title} </h2>

          {book.authors && <p>By {book.authors[0]}</p>}
        </CardContent>
      </Card>
    </Link>
  )
}

export default BookListCard
