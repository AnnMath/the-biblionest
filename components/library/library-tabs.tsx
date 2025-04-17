import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookStatusColumn } from '@/types'
import { BookCheck, Bookmark, BookOpen, Heart, LibraryBig } from 'lucide-react'

const LibraryTabs = ({
  activeTab,
  onTabChange,
}: {
  activeTab: BookStatusColumn
  onTabChange: (val: string) => void
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid grid-cols-2 text-left mx-auto min-[650px]:inline-flex h-auto">
        <TabsTrigger value="is_favourite">
          <Heart fill="oklch(0.65 0.16 18)" /> Favourites
        </TabsTrigger>
        <TabsTrigger value="is_in_wishlist">
          <Bookmark fill="oklch(0.77 0.13 85)" /> Wishlist
        </TabsTrigger>
        <TabsTrigger value="has_book">
          <LibraryBig fill="oklch(0.63 0.045 50)" />
          Owned
        </TabsTrigger>
        <TabsTrigger value="has_read">
          <BookCheck fill="oklch(0.66 0.04 140)" /> Books I've read
        </TabsTrigger>
        <TabsTrigger value="to_be_read">
          <BookOpen fill="oklch(0.73 0.05 80)" /> To-be-read pile
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default LibraryTabs
