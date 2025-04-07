import { Skeleton } from '@/components/ui/skeleton'

const BookListSkeleton = () => {
  return (
    <div className="flex flex-col w-full md:flex-row md:w-3/4 md:flex-wrap gap-8 md:mx-auto mt-8 justify-center">
      {[1, 2, 3, 4, 5, 6].map((card, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default BookListSkeleton
