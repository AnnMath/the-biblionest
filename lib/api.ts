import { Book, BookFromAPI, BookLite, Quote } from '@/interfaces'
import { SearchType } from '@/types'
import findAppropriateEdition from '@/utils/helpers/editionHelper'
import getLanguages from '@/utils/helpers/getLanguageHelper'
import { createClient } from '@/utils/supabase/client'

const BASE_URL = 'https://openlibrary.org'

/***  LOCAL HELPERS ***/
const fetchFromAPI = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) return null
  return res.json()
}

const fetchAuthorNames = async (authorObjects: any[]): Promise<string[]> => {
  const names = await Promise.all(
    authorObjects.map(async (author) => {
      const authorData = await fetchFromAPI(
        `${BASE_URL}${author.author.key}.json`
      )
      return authorData?.name || 'Unknown Author'
    })
  )
  return names
}

const getLiteBooks = (searchData: any) => {
  const books = searchData.map((book: BookFromAPI) => {
    return {
      title: book.title || 'Unknown Title',
      authors: book.author_name || ['Unknown Author'],
      workId: book.key.replace('/works/', ''),
      publishYear: book.first_publish_year || undefined,
      coverUrl: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : undefined,
      editionKey:
        book.cover_edition_key ||
        book.lending_edition_s ||
        (book.ia && book.ia[0]) ||
        null,
      authorKeys: book.author_key,
    }
  })

  return books
}

/*** BOOK FETCHES ***/

export const fetchBooksLite = async (
  query: string,
  type: SearchType = 'all',
  limit: number = 18,
  offset: number
): Promise<BookLite[]> => {
  if (!query) return []

  let searchUrl = `${BASE_URL}/search.json?limit=${limit}&offset=${offset}`
  if (type === 'title') {
    searchUrl += `&title=${encodeURIComponent(query)}`
  } else if (type === 'author') {
    searchUrl += `&author=${encodeURIComponent(query)}`
  } else {
    searchUrl += `&q=${encodeURIComponent(query)}`
  }

  const searchData = await fetchFromAPI(searchUrl)
  if (!searchData?.docs) return []

  const books = getLiteBooks(searchData.docs)

  return books
}

export const fetchBookById = async (
  workId: string,
  editionKey?: string | null
): Promise<Book | null> => {
  try {
    // fetch the work data
    const workUrl = `${BASE_URL}/works/${workId}.json`
    const workData = await fetchFromAPI(workUrl)

    if (!workData) return null

    let editionData

    // If there is an edition key, use that to get the editionData
    if (editionKey) {
      const editionUrl = `${BASE_URL}/books/${editionKey}.json`
      editionData = await fetchFromAPI(editionUrl)
    }

    // If there's no editionKey find an appropriate edition
    if (!editionData) {
      const editionsUrl = `${BASE_URL}/works/${workId}/editions.json` // fetches all editions for a particular work e.g. https://openlibrary.org/works/OL21864981W/editions.json
      const editionsData = await fetchFromAPI(editionsUrl)

      if (!editionsData?.entries?.length) return null

      const edition = findAppropriateEdition(editionsData.entries)
      if (!edition) return null

      // Get editionData for the selected edition
      const editionUrl = `${BASE_URL}/${edition.key}.json`
      editionData = await fetchFromAPI(editionUrl)
    }

    if (!editionData) return null

    // Get relevant data to build the book object
    const authors = workData?.authors
      ? await fetchAuthorNames(workData.authors)
      : editionData.authors?.map((a: any) => a.name) || ['Unknown Author']

    const authorKeys = workData?.authors.map((author: any) =>
      author.author.key.replace('/authors/', '')
    )

    const ratingData = workId
      ? await fetchFromAPI(`${BASE_URL}/works/${workId}/ratings.json`)
      : null

    const rating = ratingData?.summary
      ? {
          average: ratingData.summary.average,
          count: ratingData.summary.count,
        }
      : undefined

    return {
      title: workData.title,
      authors,
      authorKeys,
      workId,
      coverUrl: editionData.covers?.[0]
        ? `https://covers.openlibrary.org/b/id/${editionData.covers[0]}-L.jpg`
        : undefined,
      editionKey: editionData.key?.replace('/books/', ''),
      publishYear:
        editionData.publish_date || workData?.first_publish_date || undefined,
      synopsis:
        workData?.description?.value ||
        workData?.description ||
        editionData.description?.value ||
        editionData.description ||
        'No synopsis available.',
      isbn: editionData.isbn_13?.[0] || editionData.isbn_10?.[0] || undefined,
      language: getLanguages(editionData),
      format: editionData.physical_format,
      pages: editionData.number_of_pages,
      rating,
      subjects: workData.subjects || [],
    }
  } catch (error) {
    console.error('Error fetching book detail:', error)
    return null
  }
}

export const fetchTrending = async (): Promise<BookLite[]> => {
  let searchUrl = `${BASE_URL}/trending/daily.json?limit=10`

  const searchData = await fetchFromAPI(searchUrl)
  if (!searchData?.works) return []

  const books = getLiteBooks(searchData.works)

  return books
}

export const fetchTrendingInNest = async () => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('books')
    .select(
      `
      id,
      title,
      author_names,
      cover_url,
      work_id,
      edition_key,
      view_count
    `
    )
    .order('view_count', { ascending: false })
    .limit(10)

  if (error) {
    console.error('Error fetching trending books:', error.message)
    return []
  }

  // TODO: Type this properly
  return data.map((book: any) => ({
    title: book.title,
    authors: book.author_names?.split(',').map((a: string) => a.trim()) || [],
    coverUrl: book.cover_url,
    workId: book.work_id,
    editionKey: book.edition_key,
  }))
}

/** AUTHORS */

export const fetchPopularWorksByAuthor = async (
  authorName: string,
  limit: number = 10
): Promise<BookLite[]> => {
  let searchUrl = `${BASE_URL}/search.json?author=${encodeURIComponent(
    authorName
  )}&language=eng&limit=${limit}&sort=editions`

  const searchData = await fetchFromAPI(searchUrl)
  if (!searchData.docs) return []

  return searchData.docs.map((doc: BookFromAPI) => ({
    title: doc.title,
    authors: doc.author_name || [],
    authorKeys: doc.author_key || [],
    coverUrl: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : undefined,
    workId: doc.key?.replace('/works/', ''),
    editionKey: doc.cover_edition_key,
  }))
}

/*RANDOM QUOTES*/
export const fetchQuote = async (): Promise<Quote> => {
  const URL = 'https://recite-production.up.railway.app/api/v1/random'
  const response = await fetch(URL)
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }
  const result = await response.json()
  return {
    id: result._id,
    quote: result.quote,
    book: result.book,
    author: result.author,
  }
}
