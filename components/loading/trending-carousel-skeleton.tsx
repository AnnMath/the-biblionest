import BookSkeleton from './book-skeleton'

const TrendingCarouselSkeleton = () => {
  return (
    <div className="w-full max-w-3xl bg-background-50 p-6 rounded-xl shadow-md">
      <div className="h-6 w-1/2 mb-2 bg-primary-300 rounded" />
      <div className="h-4 w-2/3 mb-4 bg-primary-200 rounded" />
      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {Array.from({ length: 8 }).map((_, i) => (
          <BookSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export default TrendingCarouselSkeleton
