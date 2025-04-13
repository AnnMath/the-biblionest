import { Skeleton } from '@/components/ui/skeleton'

const BookSkeleton = () => {
  return (
    <div className="flex-shrink-0 w-[180px] h-[270px] bg-background-200 rounded-xl shadow-md flex items-center justify-center">
      <Skeleton className="w-full h-full rounded-xl" />
    </div>
  )
}

export default BookSkeleton
