'use client'

import { Book } from '@/interfaces'
import { SearchType } from '@/types'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import SearchBar from './search-bar'
import { fetchBooksLite } from '@/lib/api'
import BookListSkeleton from './book-list-skeleton'
import BookList from './book-list'

const Search = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const queryParam = searchParams.get('q') || ''
  const typeParam = (searchParams.get('type') as SearchType) || 'all'

  const [searchQuery, setSearchQuery] = useState(queryParam)
  const [searchType, setSearchType] = useState<SearchType>(typeParam)
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchCompleted, setSearchCompleted] = useState(false)

  const limit = 18

  useEffect(() => {
    if (queryParam.trim()) {
      handleFetch(queryParam, typeParam, 0)
    } else {
      setBooks([])
      setSearchCompleted(false)
    }
  }, [queryParam, typeParam])

  const handleFetch = async (
    query: string,
    type: SearchType,
    offset: number
  ) => {
    setLoading(true)
    setError(null)
    setSearchCompleted(false)

    try {
      const results = await fetchBooksLite(query, type, String(limit), offset)
      setBooks(results)
      console.log(results)
    } catch (err) {
      console.error(err)
      setError('Something went wrong while fetching books.')
    } finally {
      setLoading(false)
      setSearchCompleted(true)
    }
  }

  const handleSearch = (query: string, type: SearchType = 'all') => {
    setSearchQuery(query)
    setSearchType(type)
    router.push(`/search?q=${encodeURIComponent(query)}&type=${type}`)
  }

  const showNoResults =
    !loading && !error && books.length === 0 && queryParam && searchCompleted

  return (
    <div className="bg-background-300">
      <SearchBar
        onSearch={handleSearch}
        initialQuery={searchQuery}
        initialType={searchType}
      />

      {loading && <BookListSkeleton />}

      {!loading && error && (
        <div className="text-center mt-8 text-red-500">{error}</div>
      )}

      {showNoResults && (
        <div className="text-center mt-8">
          No books found for "{queryParam}"
        </div>
      )}

      {!loading && books.length > 0 && <BookList books={books} />}
    </div>
  )
}

export default Search
