import { BookLite } from './interfaces'

export type SearchType = 'all' | 'title' | 'author'

export type BookStatusColumn =
  | 'is_favourite'
  | 'is_in_wishlist'
  | 'has_read'
  | 'has_book'
  | 'to_be_read'
  | 'has_review_or_rating'

export type UserBookEntry = {
  book: BookLite
  user_id: string
  book_id: string
  created_at: string
  updated_at: string
  rating: number | null
  review: string | null
} & {
  [K in BookStatusColumn]: boolean
}
