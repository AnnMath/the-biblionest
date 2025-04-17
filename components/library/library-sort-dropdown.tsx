import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const LibrarySortDropdown = ({
  sortOption,
  onSortChange,
}: {
  sortOption: string
  onSortChange: (val: string) => void
}) => {
  return (
    <div className="self-center sm:self-start">
      <Select value={sortOption} onValueChange={onSortChange}>
        <SelectTrigger className="w-48 ">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort</SelectLabel>
            <SelectItem value="title-asc">Title A-Z</SelectItem>
            <SelectItem value="title-desc">Title Z-A</SelectItem>
            <SelectItem value="author-asc">Author A-Z</SelectItem>
            <SelectItem value="author-desc">Author Z-A</SelectItem>
            <SelectItem value="created-at-asc">Most recently added</SelectItem>
            <SelectItem value="created-at-desc">Oldest first</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default LibrarySortDropdown
