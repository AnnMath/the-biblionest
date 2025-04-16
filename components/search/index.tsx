'use client'

import { Book } from '@/interfaces'
import { SearchType } from '@/types'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import SearchBar from './search-bar'
import { fetchBooksLite } from '@/lib/api'
import BookListSkeleton from './book-list-skeleton'
import BookList from './book-list'
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll'
import { Button } from '../ui/button'
import { ChevronUp } from 'lucide-react'

const Search = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const queryParam = searchParams.get('q') || ''
  const typeParam = (searchParams.get('type') as SearchType) || 'all'
  const pageParam = parseInt(searchParams.get('page') || '1')

  const [searchQuery, setSearchQuery] = useState(queryParam)
  const [searchType, setSearchType] = useState<SearchType>(typeParam)
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchCompleted, setSearchCompleted] = useState(false)

  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  // Track page positions and ref for scrolling
  const [pagePositions, setPagePositions] = useState<{
    [page: number]: number
  }>({})
  const bookListRef = useRef<HTMLDivElement>(null)
  const initialLoadComplete = useRef(false)

  const pageSize = 18

  const fetchAllPagesUpTo = async (targetPage: number) => {
    setBooks([])
    setSearchCompleted(false)
    setIsFetchingMore(false)
    setHasMore(true)
    setPage(1)
    setPagePositions({})
    initialLoadComplete.current = false

    for (let p = 1; p <= targetPage; p++) {
      await handleFetch(queryParam, typeParam, pageSize.toString(), p)
      setPage(p)
      setPagePositions((prev) => ({
        ...prev,
        [p]: (p - 1) * pageSize,
      }))
    }

    initialLoadComplete.current = true
  }

  useEffect(() => {
    if (queryParam.trim()) {
      fetchAllPagesUpTo(pageParam)
    } else {
      setBooks([])
      setSearchCompleted(false)
    }
  }, [queryParam, typeParam])

  // Scroll to the correct position once initial loading completes
  useEffect(() => {
    if (initialLoadComplete.current && pageParam > 1 && bookListRef.current) {
      const scrollToPosition = pagePositions[pageParam] || 0

      // Find the element at the specified position
      if (scrollToPosition < books.length) {
        const bookElements = bookListRef.current.querySelectorAll('.book-item')
        if (bookElements && bookElements[scrollToPosition]) {
          bookElements[scrollToPosition].scrollIntoView({
            behavior: 'auto',
            block: 'start',
          })
        }
      }
    }
  }, [books, pagePositions, pageParam, initialLoadComplete.current])

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
      const nextPage = page + 1
      handleFetch(queryParam, typeParam, pageSize.toString(), nextPage)
      setPage(nextPage)

      const params = new URLSearchParams(searchParams.toString())
      params.set('page', nextPage.toString())
      router.replace(`/search?${params.toString()}`, { scroll: false })

      // Track this new page's position
      setPagePositions((prev) => ({
        ...prev,
        [nextPage]: books.length,
      }))
    }
  }, hasMore)

  const handleSearch = (query: string, type: SearchType = 'all') => {
    setSearchQuery(query)
    setSearchType(type)

    router.push(`/search?q=${encodeURIComponent(query)}&type=${type}&page=1`)
  }

  const handleBackToTop = async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const params = new URLSearchParams(searchParams.toString())
    params.set('page', '1')
    router.replace(`/search?${params.toString()}`, { scroll: false })

    setTimeout(() => {
      fetchAllPagesUpTo(1)
    }, 500)
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
          <div ref={bookListRef}>
            <BookList books={books} />
            {isFetchingMore && <BookListSkeleton />}
            <div ref={loadMoreRef} className="h-10" />
          </div>
          {page > 1 && (
            <Button
              className="fixed bottom-10 right-10 rounded-full cursor-pointer shadow-md hover:shadow-lg hover:animate-bounce"
              onClick={handleBackToTop}
              size="icon"
              aria-label="back to top"
            >
              <ChevronUp />
            </Button>
          )}
        </>
      )}
    </div>
  )
}

export default Search
