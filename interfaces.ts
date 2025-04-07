export interface Profile {
  display_name: string
  // TODO: add other profile fields if needed
}

export interface BookFromAPI {
  author_key: string[]
  author_name: string[]
  cover_edition_key: string
  cover_i: number
  edition_count: number
  first_publish_year: number
  has_fulltext: boolean
  ia: string[]
  ia_collection_s: string
  key: string
  language: string[]
  lending_edition_s: string
  lending_identifier_s: string
  public_scan_b: boolean
  title: string
}

export interface BaseBook {
  title: string
  authors: string[]
  workId: string
  coverUrl?: string
}

export interface BookLite extends BaseBook {}

export interface Book extends BaseBook {
  publishYear?: number | undefined
  synopsis?: string
  isbn?: string | undefined
  language?: string
  format?: string | undefined
  pages?: number | undefined
  rating?: {
    average: number | null
    count: number
  }
  subjects?: string[]
}
