import { useEffect, useRef } from 'react'

export const useInfiniteScroll = (callback: () => void, hasMore: boolean) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hasMore) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback()
      }
    })

    const elem = loadMoreRef.current
    if (elem) observer.observe(elem)
    return () => {
      if (elem) observer.unobserve(elem)
    }
  }, [callback, hasMore])
  return loadMoreRef
}
