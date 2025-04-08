import { Book } from '@/interfaces'

const BookInfo = ({ book }: { book: Book }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 mt-4">
      <div>
        <p className="font-bold">Published</p>
        <p>{book.publishYear ? book.publishYear : '-'}</p>
      </div>
      <div>
        <p className="font-bold">Format</p>
        <p className="capitalize">{book.format ? book.format : '-'}</p>
      </div>
      <div>
        <p className="font-bold">Pages</p>
        <p>{book.pages ? book.pages : '-'}</p>
      </div>
      <div>
        <p className="font-bold">Language</p>
        <p>{book.language ? book.language : '-'}</p>
      </div>
      <div>
        <p className="font-bold">ISBN</p>
        <p>{book.isbn ? book.isbn : '-'}</p>
      </div>
    </div>
  )
}

export default BookInfo
