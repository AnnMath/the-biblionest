'use client'

import BookOrnamentBottom from '../ornaments/book-ornament-bottom'
import BookOrnamentTop from '../ornaments/book-ornament-top'
import { createClient } from '@/utils/supabase/client'
import { useSessionStatus } from '@/lib/hooks/useSessionStatus'
import { useEffect, useState } from 'react'
import { BookStatusColumn, UserBookEntry } from '@/types'
import { BookLite } from '@/interfaces'
import LibraryBookCard from './library-book-card'
import LibrarySortDropdown from './library-sort-dropdown'
import LibraryTabs from './library-tabs'
import { LoaderCircle } from 'lucide-react'

const MyLibrary = () => {
  const supabase = createClient()
  const { userId, displayName } = useSessionStatus()

  const [activeTab, setActiveTab] = useState<BookStatusColumn>('is_favourite')
  const [books, setBooks] = useState<UserBookEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortOption, setSortOption] = useState<string>('title-asc')

  useEffect(() => {
    if (!userId) return

    const fetchBooks = async () => {
      setIsLoading(true)

      const { data, error } = await supabase
        .from('user_books')
        .select(
          `
                *,
                book:books (
                    id,
                    title,
                    author_names,
                    cover_url,
                    work_id,
                    edition_key
                )
                `
        )
        .eq('user_id', userId)

      if (error) {
        console.error('Error fetching user books:', error.message)
      } else {
        setBooks(data)
      }

      setIsLoading(false)
    }
    fetchBooks()
  }, [userId])

  const toBookLite = (entry: any): BookLite => ({
    title: entry.book.title,
    authors:
      entry.book.author_names?.split(',').map((name: string) => name.trim()) ||
      [],
    coverUrl: entry.book.cover_url,
    workId: entry.book.work_id,
    editionKey: entry.book.edition_key,
  })

  const getLastName = (name: string) => {
    const parts = name.trim().split(' ')
    return parts[parts.length - 1].toLowerCase()
  }

  const sortBooks = (entries: UserBookEntry[]): UserBookEntry[] => {
    return [...entries].sort((a, b) => {
      const aBook = toBookLite(a)
      const bBook = toBookLite(b)

      const aAuthor = aBook.authors[0] || ''
      const bAuthor = bBook.authors[0] || ''

      switch (sortOption) {
        case 'title-asc':
          return aBook.title.localeCompare(bBook.title)
        case 'title-desc':
          return bBook.title.localeCompare(aBook.title)
        case 'author-asc':
          return getLastName(aAuthor).localeCompare(getLastName(bAuthor))
        case 'author-desc':
          return getLastName(bAuthor).localeCompare(getLastName(aAuthor))
        case 'created-at-asc':
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
        case 'created-at-desc':
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          )
        default:
          return 0
      }
    })
  }

  const filteredBooks = books.filter((entry) => entry[activeTab])
  const sortedBooks = sortBooks(filteredBooks)

  return (
    <article className="max-w-[1280px] bg-background-50 p-4 rounded-xl shadow-md min-w-[320px] w-screen">
      <BookOrnamentTop />
      <section className="flex flex-col gap-8 py-8 md:p-8">
        {displayName && (
          <h1 className="font-heading font-bold italic text-4xl text-primary-500 text-center">
            {displayName}'s library
          </h1>
        )}

        <LibraryTabs
          activeTab={activeTab}
          onTabChange={(val) => setActiveTab(val as BookStatusColumn)}
        />

        <LibrarySortDropdown
          sortOption={sortOption}
          onSortChange={(val) => setSortOption(val)}
        />

        {isLoading ? (
          <p className="text-center italic text-secondary-500">
            Loading your library...
          </p>
        ) : filteredBooks.length === 0 ? (
          <p className="text-center italic text-secondary-500">
            Nothing here yet — time to build your nest!
          </p>
        ) : (
          <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {sortedBooks.map((entry) => (
              <LibraryBookCard
                key={entry.book_id}
                book={toBookLite(entry)}
                status={{
                  is_favourite: entry.is_favourite,
                  has_book: entry.has_book,
                  has_read: entry.has_read,
                  is_in_wishlist: entry.is_in_wishlist,
                  to_be_read: entry.to_be_read,
                }}
              />
            ))}
          </section>
        )}
      </section>
      <BookOrnamentBottom />
    </article>
  )
}

export default MyLibrary
