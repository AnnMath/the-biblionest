// I thought the first edition of a work would be fine, but that's not necessarily the best one
// E.g. the first edition for 'The Shining' is in Portuguese
// So a helper is needed

const findAppropriateEdition = (editions: any[]): any | null => {
  // First try to find an English edition with a cover
  const englishWithCover = editions.find(
    (ed) =>
      ed.languages?.some((lang: any) => lang.key === '/languages/eng') &&
      ed.covers &&
      ed.covers.length > 0
  )

  if (englishWithCover) return englishWithCover

  // Then try any English edition
  const anyEnglish = editions.find((ed) =>
    ed.languages?.some((lang: any) => lang.key === '/languages/eng')
  )

  if (anyEnglish) return anyEnglish

  // Then try any edition with a cover
  const anyWithCover = editions.find((ed) => ed.covers && ed.covers.length > 0)

  if (anyWithCover) return anyWithCover

  // Fallback to the first edition
  return editions[0] || null
}

export default findAppropriateEdition
