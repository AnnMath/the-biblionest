import { Book, BookFromAPI, BookLite } from '@/interfaces'
import { SearchType } from '@/types'
import findAppropriateEdition from '@/utils/helpers/editionHelper'
import getLanguages from '@/utils/helpers/getLanguageHelper'
import displayLanguage from '@/utils/helpers/languageHelper'

const BASE_URL = 'https://openlibrary.org'

// Good to have a global fetch function because we'll need to query the api quite a bit to get all the relevant book info
const fetchFromAPI = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) return null
  return res.json()
}

export const fetchBooksLite = async (
  query: string,
  type: SearchType = 'all',
  limit: string = '20'
): Promise<BookLite[]> => {
  if (!query) return []

  let searchUrl = `${BASE_URL}/search.json?limit=${limit}`
  if (type === 'title') {
    searchUrl += `&title=${encodeURIComponent(query)}`
  } else if (type === 'author') {
    searchUrl += `&author=${encodeURIComponent(query)}`
  } else {
    searchUrl += `&q=${encodeURIComponent(query)}`
  }

  const searchData = await fetchFromAPI(searchUrl)
  if (!searchData?.docs) return []

  const books = searchData.docs.map((book: BookFromAPI) => {
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
    }
  })

  return books
}

const fetchAuthorNames = async (authors: any[]): Promise<string[]> => {
  const names = await Promise.all(
    authors.map(async (author) => {
      const authorData = await fetchFromAPI(
        `${BASE_URL}${author.author.key}.json`
      )
      return authorData?.name || 'Unknown Author'
    })
  )
  return names
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

    // If there is an edition key, use that
    if (editionKey) {
      const editionUrl = `${BASE_URL}/books/${editionKey}.json`
      editionData = await fetchFromAPI(editionUrl)
    }

    // If there's no editionKey find an appropriate edition
    if (!editionData) {
      const editionsUrl = `${BASE_URL}/works/${workId}/editions.json` // fetches all editions for a particular work e.g. https://openlibrary.org/works/OL21864981W/editions.json
      const editionsData = await fetchFromAPI(editionsUrl)

      if (!editionsData?.entries?.length) return null

      // Find an appropriate edition (preferably English)
      const edition = findAppropriateEdition(editionsData.entries)
      if (!edition) return null

      // Fetch detailed information for the selected edition
      const editionUrl = `${BASE_URL}/${edition.key}.json`
      editionData = await fetchFromAPI(editionUrl)
    }

    if (!editionData) return null

    const authors = workData?.authors
      ? await fetchAuthorNames(workData.authors)
      : editionData.authors?.map((a: any) => a.name) || ['Unknown Author']

    const ratingData = workId
      ? await fetchFromAPI(`${BASE_URL}/${workId}/ratings.json`)
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
