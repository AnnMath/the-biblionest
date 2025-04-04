export interface Profile {
  display_name: string
  // TODO: add other profile fields if needed
}

export interface Book {
  title: string
  authors: string[]
  workId: string
  publishYear?: number
  synopsis?: string
  isbn?: string
  language?: string
  format?: string
  pages?: number
  coverUrl?: string
}
