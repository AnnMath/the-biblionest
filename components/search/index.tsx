'use client'

import { Book } from '@/interfaces'
import { SearchType } from '@/types'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
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
  const offsetParam = parseInt(searchParams.get('offset') || '0')

  const [searchQuery, setSearchQuery] = useState(queryParam)
  const [searchType, setSearchType] = useState<SearchType>(typeParam)
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchCompleted, setSearchCompleted] = useState(false)

  const [offset, setOffset] = useState(0)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const bookListRef = useRef<HTMLDivElement>(null)
  const fetchedOffsets = useRef<Set<number>>(new Set())
  const fetchedWorkIds = useRef<Set<string>>(new Set())

  const limit = 6

  const fetchAllUpToOffset = async (targetOffset: number) => {
    fetchedOffsets.current.clear()
    fetchedWorkIds.current.clear() // reset tracked workIds

    setBooks([])
    setOffset(targetOffset)
    setHasMore(true)
    setSearchCompleted(false)
    setLoading(true)

    const pagesToFetch = Math.ceil((targetOffset + 1) / limit)

    try {
      for (let i = 0; i < pagesToFetch; i++) {
        const currentOffset = i * limit
        if (!fetchedOffsets.current.has(currentOffset)) {
          const results = await fetchBooksLite(
            queryParam,
            typeParam,
            limit,
            currentOffset
          )

          // dedupe based on workId
          const uniqueResults = results.filter((book) => {
            if (!fetchedWorkIds.current.has(book.workId)) {
              fetchedWorkIds.current.add(book.workId)
              return true
            }
            return false
          })
          setBooks((prev) => [...prev, ...uniqueResults])

          if (results.length < limit) {
            setHasMore(false)
            break
          }
        }
      }
      fetchedOffsets.current.add(targetOffset)
    } catch (err) {
      console.error(err)
      setError('Something went wrong while fetching books.')
      setHasMore(false)
    } finally {
      setLoading(false)
      setSearchCompleted(true)
    }
  }

  useEffect(() => {
    if (queryParam.trim()) {
      fetchAllUpToOffset(offsetParam)
    } else {
      setBooks([])
      setSearchCompleted(false)
    }
  }, [queryParam, typeParam])

  useEffect(() => {
    if (offsetParam > 0 && books.length > 0) {
      const bookElements = document.querySelectorAll('.book-item')
      if (bookElements[offsetParam]) {
        bookElements[offsetParam].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        })
      }
    }
  }, [books, offsetParam])

  const handleFetch = async (
    query: string,
    type: SearchType,
    limit: number,
    offset: number
  ) => {
    if (fetchedOffsets.current.has(offset)) return
    fetchedOffsets.current.add(offset)

    setError(null)
    if (offset === 0) {
      setLoading(true)
      setBooks([])
      fetchedWorkIds.current.clear() // reset here too
      setSearchCompleted(false)
    } else {
      setIsFetchingMore(true)
    }

    try {
      const results = await fetchBooksLite(query, type, limit, offset)

      const uniqueResults = results.filter((book) => {
        if (!fetchedWorkIds.current.has(book.workId)) {
          fetchedWorkIds.current.add(book.workId)
          return true
        }
        return false
      })
      setBooks((prev) => [...prev, ...uniqueResults])
      setHasMore(results.length === limit)
    } catch (err) {
      console.error(err)
      setError('Something went wrong while fetching books.')
      setHasMore(false)
    } finally {
      setIsFetchingMore(false)
    }
  }

  const loadMoreRef = useInfiniteScroll(() => {
    if (!isFetchingMore && hasMore) {
      const newOffset = offset + limit
      handleFetch(queryParam, typeParam, limit, newOffset)
      setOffset(newOffset)

      const params = new URLSearchParams(searchParams.toString())
      params.set('offset', newOffset.toString())
      router.replace(`/search?${params.toString()}`, { scroll: false })
    }
  }, hasMore)

  const handleSearch = (query: string, type: SearchType = 'all') => {
    setSearchQuery(query)
    setSearchType(type)
    setOffset(0)

    router.push(`/search?q=${encodeURIComponent(query)}&type=${type}&offset=0`)
  }

  const handleBackToTop = async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const params = new URLSearchParams(searchParams.toString())
    params.set('offset', '0')
    router.replace(`/search?${params.toString()}`, { scroll: false })

    setTimeout(() => {
      fetchAllUpToOffset(0)
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

          {offset > 0 && (
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
