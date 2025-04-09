import { fetchTrending } from '@/lib/api'
import TheSpiteCarousel from '../carousel/the-spite-carousel'

// good lord, I hate the ShadCN carousel so much, so I'm gonna make my own
const TrendingCarousel = async () => {
  const books = await fetchTrending()
  console.log('TRENDING', books)
  return (
    <div className="w-full max-w-3xl px-4 sm:px-6 md:px-8 mx-auto">
      <TheSpiteCarousel books={books} header="See what's trending today!" />
    </div>
  )
}

export default TrendingCarousel
