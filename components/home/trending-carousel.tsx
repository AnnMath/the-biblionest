'use client'

import { useEffect, useState } from 'react'
import { fetchTrending } from '@/lib/api'
import TheSpiteCarousel from '../carousel/the-spite-carousel'
import { BookLite } from '@/interfaces'
import TrendingCarouselSkeleton from '../loading/trending-carousel-skeleton'

const TrendingCarousel = () => {
  const [books, setBooks] = useState<BookLite[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const trending = await fetchTrending()
        setBooks(trending)
      } catch (error) {
        console.error('Failed to fetch trending books:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTrending()
  }, [])

  if (loading) {
    return <TrendingCarouselSkeleton />
  }

  return (
    <div className="w-full max-w-3xl">
      <TheSpiteCarousel
        books={books}
        header="What's trending right now?"
        description="See what the Open Library community is adding to their bookshelves right now"
      />
    </div>
  )
}

export default TrendingCarousel
