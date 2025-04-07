'use client'

import { Book } from '@/interfaces'
import { SearchType } from '@/types'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import SearchBar from './search-bar'
import { fetchBooksLite } from '@/lib/api'
import BookListSkeleton from './book-list-skeleton'
import LoadingDecoration from '../loading/loading-decoration'

const Search = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const queryParam = searchParams.get('q') || ''
  const typeParam = (searchParams.get('type') as SearchType) || 'all'
  const limitParam = searchParams.get('limit') || '20'

  const [searchQuery, setSearchQuery] = useState(queryParam)
  const [searchType, setSearchType] = useState<SearchType>(typeParam)
  const [searchLimit, setSearchLimit] = useState(limitParam)
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (queryParam.trim()) {
      handleFetch(queryParam, typeParam, limitParam)
    } else {
      setBooks([])
    }
  }, [queryParam, typeParam, limitParam])

  const handleFetch = async (
    query: string,
    type: SearchType,
    limit: string
  ) => {
    setLoading(true)
    setError(null)

    try {
      const results = await fetchBooksLite(query, type, limit)
      setBooks(results)
      console.log(results)
    } catch (err) {
      console.error(err)
      setError('Something went wrong while fetching books.')
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (
    query: string,
    type: SearchType = 'all',
    limit: string = '20'
  ) => {
    setSearchQuery(query)
    setSearchType(type)
    setSearchLimit(limit)
    router.push(
      `/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}`
    )
  }
  return (
    <div className="bg-background-300">
      <SearchBar
        onSearch={handleSearch}
        initialQuery={searchQuery}
        initialType={searchType}
        initialLimit={searchLimit}
      />
      {loading && (
        <>
          <LoadingDecoration />
          <BookListSkeleton />
        </>
      )}
      {error && <div className="text-center mt-8 text-red-500">{error}</div>}
      {!loading && !error && books.length === 0 && queryParam && (
        <div className="text-center mt-8">
          No books found for "{queryParam}"
        </div>
      )}
    </div>
  )
}

export default Search
