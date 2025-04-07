import { BookLite } from '@/interfaces'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import PlaceholderImage from '../placeholder-image/placeholder-image'

const BookListCard = ({ book }: { book: BookLite }) => {
  return (
    <Card className="flex flex-col items-center bg-background-200 justify-between text-text-500 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="w-auto h-auto">
        {book.coverUrl ? (
          <Image
            src={book.coverUrl}
            alt={`${book.title} cover`}
            height={300}
            width={200}
            className="object-cover"
            placeholder="blur"
            blurDataURL="/placeholder.jpg"
          />
        ) : (
          <PlaceholderImage />
        )}
      </div>
      <CardContent className="mt-auto px-4">
        <h3 className="font-bold font-heading text-lg">{book.title} </h3>

        {book.authors && <p>By {book.authors.join(', ')}</p>}
      </CardContent>
    </Card>
  )
}

export default BookListCard
