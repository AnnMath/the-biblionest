import HomeScreen from '@/components/home/home-screen'
import QuoteCard from '@/components/home/quote-card'

const Home = () => {
  return (
    <div className="bg-background-300 min-h-screen w-screen py-8 flex flex-col gap-12 items-center">
      <HomeScreen />
      <div className="max-w-[1280px] flex flex-col md:flex-row md:justify-between">
        <QuoteCard />
      </div>
    </div>
  )
}

export default Home
