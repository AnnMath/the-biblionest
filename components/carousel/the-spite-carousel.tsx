'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { BookLite } from '@/interfaces'
import { useRef } from 'react'
import Image from 'next/image'
import PlaceholderImage from '../placeholder-image/placeholder-image'
import Link from 'next/link'

const TheSpiteCarousel = ({
  books,
  header,
}: {
  books: BookLite[]
  header: string
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = scrollRef.current.offsetWidth * 0.8
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      })
    }
  }
  return (
    <div className="relative w-full bg-background-50 p-6 rounded-xl shadow-md">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background-300/90 to-transparent z-20 rounded-l-xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background-300/90 to-transparent z-20 rounded-r-xl" />
      <h2 className="text-3xl text-primary-500 font-bold font-heading italic mb-4 z-50 relative">
        {header}
      </h2>
      <div className="relative">
        <Button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-2 opacity-80 rounded-full shadow-md"
          onClick={() => scroll('left')}
          aria-label="scroll left"
        >
          <ChevronLeft className="text-text-500" />
        </Button>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {books.map((book) => (
            <Link
              key={book.workId}
              href={
                book.editionKey
                  ? `/book/${book.workId}?edition=${book.editionKey}`
                  : `/book/${book.workId}`
              }
            >
              <div className="flex-shrink-0 w-[180px] h-[270px] bg-background-100 rounded-xl shadow-md flex items-center justify-center">
                {book.coverUrl ? (
                  <Image
                    src={book.coverUrl}
                    alt={`cover of ${book.title}`}
                    className="w-full h-full object-cover rounded-xl"
                    height={270}
                    width={180}
                  />
                ) : (
                  <PlaceholderImage />
                )}
              </div>
            </Link>
          ))}
        </div>
        <Button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-2 opacity-80 rounded-full shadow-md"
          aria-label="scroll left"
        >
          <ChevronRight className="text-text-500" />
        </Button>
      </div>
    </div>
  )
}

export default TheSpiteCarousel
