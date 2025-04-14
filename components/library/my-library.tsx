'use client'

import { BookCheck, Bookmark, BookOpen, Heart, LibraryBig } from 'lucide-react'
import BookOrnamentBottom from '../ornaments/book-ornament-bottom'
import BookOrnamentTop from '../ornaments/book-ornament-top'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createClient } from '@/utils/supabase/client'
import { useSessionStatus } from '@/lib/hooks/useSessionStatus'
import { useEffect, useState } from 'react'
import { BookStatusColumn, UserBookEntry } from '@/types'
import { BookLite } from '@/interfaces'
import LibraryBookCard from './library-book-card'

const MyLibrary = () => {
  const supabase = createClient()
  const { userId } = useSessionStatus()

  const [activeTab, setActiveTab] = useState<BookStatusColumn>('is_favourite')
  const [books, setBooks] = useState<UserBookEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

  const filteredBooks = books.filter((entry) => entry[activeTab])

  const toBookLite = (entry: any): BookLite => ({
    title: entry.book.title,
    authors:
      entry.book.author_names?.split(',').map((name: string) => name.trim()) ||
      [],
    coverUrl: entry.book.cover_url,
    workId: entry.book.work_id,
    editionKey: entry.book.edition_key,
  })

  return (
    <article className="max-w-[1280px] bg-background-50 p-4 rounded-xl shadow-md min-w-[320px] w-screen">
      <BookOrnamentTop />
      <section className="flex flex-col gap-8 py-8 md:p-8">
        <h1 className="font-heading font-bold italic text-4xl text-primary-500 text-center">
          Welcome to your library!
        </h1>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as BookStatusColumn)}
        >
          <TabsList className="grid grid-cols-2 text-left mx-auto min-[650px]:inline-flex h-auto">
            <TabsTrigger value="is_favourite">
              <Heart fill="oklch(0.65 0.16 18)" /> Favourites
            </TabsTrigger>
            <TabsTrigger value="is_in_wishlist">
              <Bookmark fill="oklch(0.77 0.13 85)" /> Wishlist
            </TabsTrigger>
            <TabsTrigger value="has_book">
              <LibraryBig fill="oklch(0.63 0.045 50)" />
              Owned
            </TabsTrigger>
            <TabsTrigger value="has_read">
              <BookCheck fill="oklch(0.66 0.04 140)" /> Books I've read
            </TabsTrigger>
            <TabsTrigger value="to_be_read">
              <BookOpen fill="oklch(0.73 0.05 80)" /> To-be-read pile
            </TabsTrigger>
          </TabsList>
        </Tabs>

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
            {filteredBooks.map((entry) => (
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
