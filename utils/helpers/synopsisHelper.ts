import { ParsedSynopsis } from '@/interfaces'

// Some synopses have some markdown-esque links at the end, which look super ugly unformatted
// This helps them look pretty

const formatSynopsis = (
  synopsis: string | null | undefined
): ParsedSynopsis => {
  if (!synopsis) return { main: '', extras: [] }

  const parts = synopsis.split('----------')
  const main = parts[0].trim()

  const extrasText = parts[1]?.trim() || ''
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g

  const extras: { text: string; href: string }[] = []
  let match

  while ((match = linkRegex.exec(extrasText)) !== null) {
    extras.push({ text: match[1], href: match[2] })
  }

  return { main, extras }
}

export default formatSynopsis
