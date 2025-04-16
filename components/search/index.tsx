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
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll'

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

  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const pageSize = '30'

  useEffect(() => {
    if (queryParam.trim()) {
      setBooks([])
      setSearchCompleted(false)
      setIsFetchingMore(false)
      setHasMore(true)
      setPage(1)

      handleFetch(queryParam, typeParam, pageSize, 1) // ← force it!
    } else {
      setBooks([])
      setSearchCompleted(false)
    }
  }, [queryParam, typeParam])

  const handleFetch = async (
    query: string,
    type: SearchType,
    limit: string,
    page: number
  ) => {
    if (page === 1) {
      setLoading(true)
      setBooks([])
    } else {
      setIsFetchingMore(true)
    }

    setError(null)
    if (page === 1) setSearchCompleted(false)

    try {
      const results = await fetchBooksLite(query, type, limit, page)

      if (page === 1) {
        setBooks(results)
      } else {
        setBooks((prev) => [...prev, ...results])
      }

      setHasMore(results.length === parseInt(limit))
    } catch (err) {
      console.error(err)
      setError('Something went wrong while fetching books.')
      setHasMore(false)
    } finally {
      setLoading(false)
      setIsFetchingMore(false)
      setSearchCompleted(true)
    }
  }

  const loadMoreRef = useInfiniteScroll(() => {
    if (!isFetchingMore && hasMore) {
      handleFetch(queryParam, typeParam, pageSize, page + 1)
      setPage((prev) => prev + 1)
    }
  }, hasMore)

  const handleSearch = (query: string, type: SearchType = 'all') => {
    // If the search parameters haven't changed, don't trigger a new search
    if (query === searchQuery && type === searchType) {
      return
    }

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

      {!loading && books.length > 0 && (
        <>
          <BookList books={books} />
          {isFetchingMore && <BookListSkeleton />}
          <div ref={loadMoreRef} className="h-10" />
        </>
      )}
    </div>
  )
}

export default Search
