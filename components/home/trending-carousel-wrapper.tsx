'use client'

import dynamic from 'next/dynamic'

const TrendingCarousel = dynamic(() => import('./trending-carousel'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-3xl h-[270px] flex items-center justify-center bg-background-100 rounded-xl shadow text-text-300">
      Loading trending books...
    </div>
  ),
})

export default TrendingCarousel
