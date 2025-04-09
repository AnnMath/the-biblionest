import HomeScreen from '@/components/home/home-screen'
import QuoteCard from '@/components/home/quote-card'
import TrendingCarousel from '@/components/home/trending-carousel'

const Home = () => {
  return (
    <div className="bg-background-300 min-h-screen w-screen py-8 flex flex-col gap-12 items-center">
      <HomeScreen />
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row lg:justify-between gap-4">
        <QuoteCard />
        <TrendingCarousel />
      </div>
    </div>
  )
}

export default Home
