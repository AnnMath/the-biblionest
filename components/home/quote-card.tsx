'use client'

import { fetchQuote } from '@/lib/api'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Quote } from '@/interfaces'
import { LoaderCircle } from 'lucide-react'
import LoadingDecoration from '../loading/loading-decoration'

const QuoteCard = ({ initialQuote }: { initialQuote: Quote | null }) => {
  const [quote, setQuote] = useState<Quote | null>(initialQuote)
  const [error, setError] = useState(true)

  const getNewQuote = async () => {
    try {
      const newQuote = await fetchQuote()
      setQuote(newQuote)
      setError(false)
    } catch (err) {
      console.error('Failed to fetch quote:', err)
      setError(true)
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      getNewQuote()
    }, 30000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <article className="flex flex-col items-center justify-center bg-background-50 mx-8 p-4 xl:mx-0 text-text-500 min-w-[300px] min-h-[380px] rounded-xl shadow-md">
      <Image src="/decoration-2-top.svg" alt="" width={142} height={20} />
      <div className="p-6 text-pretty">
        {quote ? (
          <div className="flex flex-col gap-1.5">
            <p>"{quote.quote}"</p>
            <p className="font-heading italic text-center">From {quote.book}</p>
            <p className="text-right italic text-sm">- {quote.author}</p>
          </div>
        ) : error ? (
          <>
            <p className="text-red-600 text-xs text-center">
              Failed to fetch quote
            </p>
            <p>"Anything that can go wrong will go wrong."</p>
            <p className="text-right italic text-sm">- E. A. Murphy Jr.</p>
          </>
        ) : (
          <LoadingDecoration />
        )}
      </div>
      <Image src="/decoration-2-bottom.svg" alt="" width={142} height={20} />
    </article>
  )
}

export default QuoteCard
