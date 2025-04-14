import { BookLite } from './interfaces'

export type SearchType = 'all' | 'title' | 'author'

export type BookStatusColumn =
  | 'is_favourite'
  | 'is_in_wishlist'
  | 'has_read'
  | 'has_book'
  | 'to_be_read'

export type UserBookEntry = {
  book: BookLite
  user_id: string
  book_id: string
} & {
  [K in BookStatusColumn]: boolean
}
