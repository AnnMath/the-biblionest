import { BookLite } from '@/interfaces'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import PlaceholderImage from '../placeholder-image/placeholder-image'
import Link from 'next/link'

const BookListCard = ({ book }: { book: BookLite }) => {
  return (
    <Link href={`/book/${book.workId}?edition=${book.editionKey}`}>
      <Card className="flex flex-col items-center bg-background-100 justify-between text-text-500 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
        <Image src="/decoration-2-top.svg" alt="" width={285} height={40} />
        <div className="relative w-[180px] h-[270px] flex items-center justify-center">
          {book.coverUrl ? (
            <Image
              src={book.coverUrl}
              alt={`${book.title} cover`}
              fill
              sizes="180px"
              className="object-contain"
              placeholder="blur"
              blurDataURL="/placeholder.jpg"
            />
          ) : (
            <PlaceholderImage />
          )}
        </div>
        <Image src="/decoration-2-bottom.svg" alt="" width={285} height={40} />
        <CardContent className="mt-auto px-4">
          <h2 className="font-bold font-heading text-lg">{book.title} </h2>

          {book.authors && <p>By {book.authors.join(', ')}</p>}
        </CardContent>
      </Card>
    </Link>
  )
}

export default BookListCard
