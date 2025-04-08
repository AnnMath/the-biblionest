import displayLanguage from './languageHelper'

const getLanguages = (editionData: any): string => {
  if (!editionData.languages) return 'Unknown'

  return editionData.languages
    .map((lang: any) => {
      const langCode = lang.key.split('/').pop()
      return displayLanguage(langCode)
    })
    .join(', ')
}

export default getLanguages
