import { Skeleton } from '@/components/ui/skeleton'

const BookListSkeleton = () => {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
      {[1, 2, 3].map((_, index) => (
        <div key={index}>
          <Skeleton className="h-[483px]  rounded-xl" />
        </div>
      ))}
    </div>
  )
}

export default BookListSkeleton
