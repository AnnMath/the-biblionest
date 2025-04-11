import { fetchTrending } from '@/lib/api'
import TheSpiteCarousel from '../carousel/the-spite-carousel'

// good lord, I hate the ShadCN carousel so much, so I'm gonna make my own
const TrendingCarousel = async () => {
  const books = await fetchTrending()

  return (
    <div className="w-full max-w-3xl">
      <TheSpiteCarousel books={books} header="What's trending today?" />
    </div>
  )
}

export default TrendingCarousel
