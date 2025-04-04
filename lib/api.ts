import { Book, BookFromAPI } from '@/interfaces'
import { SearchType } from '@/types'
import displayLanguage from '@/utils/helpers/languageHelper'

const BASE_URL = 'https://openlibrary.org'

// Good to have a global fetch function because we'll need to query the api quite a bit to get all the relevant book info
const fetchFromAPI = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) return null
  return res.json()
}

export const fetchBooks = async (
  query: string,
  type: SearchType = 'all',
  limit: number = 20
): Promise<Book[]> => {
  if (!query) return []

  // Make the URL based on type
  // TODO: These all return the generic works list - ISBN goes to the specific edition, obvs, so I'll probably need a different API call for search by ISBN
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

  // Here we need to search additional details from the data above. ISBNs and such.
  const books = await Promise.all(
    searchData.docs.map(async (book: BookFromAPI) => {
      const workId = book.key // e.g '/works/OL27448W'
      const workData = await fetchFromAPI(`${BASE_URL}${workId}.json`) // e.g. https://openlibrary.org/works/OL27448W.json

      const editionId =
        book.cover_edition_key || // preferred - so far, this seems to be on all books but just to be safe, some fallbacks
        book.lending_edition_s ||
        book.ia?.[0] ||
        null

      const editionData = editionId
        ? await fetchFromAPI(`${BASE_URL}/books/${editionId}.json`) // e.g. https://openlibrary.org/books/OL51694024M.json
        : null

      const ratingsData = await fetchFromAPI(
        `${BASE_URL}${workId}/ratings.json`
      )

      const ratingsSummary = ratingsData.summary
      const rating = {
        average: ratingsSummary.average,
        count: ratingsSummary.count,
      }

      const languageCode = editionData?.languages?.[0]?.key?.replace(
        '/languages/',
        ''
      )

      const displayLang = displayLanguage(languageCode)

      return {
        title: book.title || 'Unknown Title',
        authors: book.author_name || ['Unknown Author'],
        workId: workId.replace('/works/', ''),
        publishYear:
          book.first_publish_year || workData?.first_publish_date || undefined,
        synopsis:
          workData?.description?.value ||
          workData?.description ||
          'No synopsis available.',
        isbn:
          editionData?.isbn_13?.[0] || editionData?.isbn_10?.[0] || undefined,
        language: displayLang,
        format: editionData?.physical_format || undefined,
        pages: editionData?.number_of_pages || undefined,
        coverUrl: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : undefined,
        rating: rating || undefined,
        subjects: workData?.subjects,
      }
    })
  )
  return books
}
