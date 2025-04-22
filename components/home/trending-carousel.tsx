'use client'

import { useEffect, useState } from 'react'
import { fetchTrendingInNest } from '@/lib/api'
import TheSpiteCarousel from '../carousel/the-spite-carousel'
import { BookLite } from '@/interfaces'
import TrendingCarouselSkeleton from '../loading/trending-carousel-skeleton'

const TrendingCarousel = () => {
  const [books, setBooks] = useState<BookLite[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const trending = await fetchTrendingInNest()
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
        header="Trending in the Nest"
        description="These are the most viewed books in BiblioNest right now"
      />
    </div>
  )
}

export default TrendingCarousel
