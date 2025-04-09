'use client'

import { fetchQuote } from '@/lib/api'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Quote } from '@/interfaces'
import { LoaderCircle } from 'lucide-react'

const QuoteCard = () => {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)

  const getNewQuote = async () => {
    try {
      setLoading(true)
      setError(false)
      const newQuote = await fetchQuote()
      setQuote(newQuote)
    } catch (error) {
      console.error('Failed to fetch quote:', error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getNewQuote()

    // TODO: remember to uncomment this.

    const intervalId = setInterval(() => {
      getNewQuote()
    }, 30000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <article className="flex flex-col items-center justify-center bg-background-50 mx-8 p-4 xl:mx-0 text-text-500 min-w-md min-h-[380px] rounded-xl shadow-md">
      <Image src="/decoration-2-top.svg" alt="" width={142} height={20} />
      <div className="p-6 text-pretty">
        {!loading && !error && quote && (
          <div className="flex flex-col gap-1.5">
            <p>"{quote.quote}"</p>
            <p className="font-heading italic text-center">From {quote.book}</p>
            <p className="text-right italic text-sm">- {quote.author}</p>
          </div>
        )}
        {loading && <LoaderCircle className="animate-spin text-primary-500" />}
        {!loading && error && (
          <>
            <p className="text-red-600 text-xs text-center">
              Failed to fetch quote
            </p>
            <p>"Anything that can go wrong will go wrong."</p>
            <p className="text-right italic text-sm">- E. A. Murphy Jr.</p>
          </>
        )}
      </div>
      <Image src="/decoration-2-bottom.svg" alt="" width={142} height={20} />
    </article>
  )
}

export default QuoteCard
