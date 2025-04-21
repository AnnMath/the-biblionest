import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookStatusColumn } from '@/types'
import {
  BookCheck,
  Bookmark,
  BookOpen,
  Heart,
  LibraryBig,
  Star,
} from 'lucide-react'

const LibraryTabs = ({
  activeTab,
  onTabChange,
}: {
  activeTab: BookStatusColumn
  onTabChange: (val: string) => void
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid grid-cols-2 mx-auto min-[650px]:inline-flex h-auto">
        <TabsTrigger value="is_favourite" aria-label="favourites">
          <Heart fill="oklch(0.65 0.16 18)" /> Favourites
        </TabsTrigger>
        <TabsTrigger value="is_in_wishlist" aria-label="wishlist">
          <Bookmark fill="oklch(0.77 0.13 85)" /> Wishlist
        </TabsTrigger>
        <TabsTrigger value="has_book" aria-label="owned">
          <LibraryBig fill="oklch(0.63 0.045 50)" />
          Owned
        </TabsTrigger>
        <TabsTrigger value="has_read" aria-label="books I've read">
          <BookCheck fill="oklch(0.66 0.04 140)" /> Books I've read
        </TabsTrigger>
        <TabsTrigger value="to_be_read" aria-label="to-be-read pile">
          <BookOpen fill="oklch(0.73 0.05 80)" /> To-be-read pile
        </TabsTrigger>
        <TabsTrigger value="has_review_or_rating" aria-label="my reviews">
          <Star className="fill-amber-400" /> My reviews
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default LibraryTabs
