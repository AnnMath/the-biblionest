'use client'

import { SearchType } from '@/types'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string, type: SearchType, limit: string) => void
  initialQuery?: string
  initialType?: SearchType
  initialLimit?: string
}

const SearchBar = ({
  onSearch,
  initialQuery = '',
  initialType = 'all',
  initialLimit = '20',
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery)
  const [type, setType] = useState<SearchType>(initialType)
  const [limit, setLimit] = useState<string>(initialLimit)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query, type, limit)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto flex flex-col items-center gap-2 p-6 md:flex-row md:p-0"
    >
      <Select onValueChange={(value) => setType(value as SearchType)}>
        <SelectTrigger
          className="w-full md:w-[180px] self-start md:self-auto"
          aria-label="search by"
        >
          <SelectValue placeholder="Search by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Search by</SelectLabel>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="author">Author</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <label htmlFor="search" className="sr-only">
        Search books
      </label>
      <Input
        id="search"
        type="text"
        placeholder="Search"
        required
        autoComplete="off"
        className="bg-background-50"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Select onValueChange={(value) => setLimit(value)}>
        <SelectTrigger
          className="w-full md:w-[180px] self-start md:self-auto"
          aria-label="display number of books"
        >
          <SelectValue placeholder="Display" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button type="submit" className="md:self-auto w-full md:w-auto">
        Search
      </Button>
    </form>
  )
}

export default SearchBar
