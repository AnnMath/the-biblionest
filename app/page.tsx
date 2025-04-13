import HomeScreen from '@/components/home/home-screen'
import QuoteCard from '@/components/home/quote-card'
import TrendingCarousel from '@/components/home/trending-carousel-wrapper'
import { fetchQuote, fetchTrending } from '@/lib/api'

const Home = async () => {
  const initialQuote = await fetchQuote()

  return (
    <div className="bg-background-300 min-h-screen w-screen py-8 flex flex-col gap-12 items-center">
      <HomeScreen />
      <div className="w-full max-w-[1280px] flex flex-col gap-4 items-center xl:flex-row xl:justify-between xl:items-end">
        <QuoteCard initialQuote={initialQuote} />
        <TrendingCarousel />
      </div>
    </div>
  )
}

export default Home
