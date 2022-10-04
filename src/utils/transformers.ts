import removeMarkdown from 'remove-markdown'

type FormatDateProps = {
  timestamp?: string | null
  locale?: string
  year?: 'numeric' | '2-digit'
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
  day?: 'numeric' | '2-digit'
}

export const formatDate = ({
  timestamp = null,
  locale = 'en-Us',
  year = 'numeric',
  month = 'long',
  day = 'numeric',
}: FormatDateProps) => {
  const date = timestamp ? new Date(timestamp) : new Date()

  const formatted = date.toLocaleDateString(locale, {
    year,
    month,
    day,
  })

  const raw = date.toISOString()

  return {
    formatted,
    raw,
  }
}

export const excerptText = (
  content?: string | null,
  defaultExcerpt?: string | null,
  trimLength?: boolean | null,
  minCharacters: number = 70,
  maxCharacters: number = 150,
): string => {
  if (defaultExcerpt) return defaultExcerpt

  const text = content
    ?.split(/[\r\n]+/gm)
    ?.filter((it: string) => !it.startsWith('#'))
    ?.join('\n')
    ?.split('\n')
    ?.map((it: string) => (it || '').trim())
    ?.filter((it: string) => it && it.length)
    ?.map((it: string) =>
      removeMarkdown(it, { gfm: true, useImgAltText: true }),
    )

  let excerpt = ''
  if (text) {
    let lastIndex = 0
    while (excerpt.length < maxCharacters) {
      excerpt += `${text[lastIndex]} `
      lastIndex += 1
    }
  }

  if (trimLength) {
    const allWords = excerpt.split(' ')
    excerpt = ''
    let lastIndex = 0
    while (excerpt.length < maxCharacters) {
      const word = allWords[lastIndex]
      excerpt += `${word} `
      if (
        word.endsWith('.') &&
        !word.endsWith('etc.') &&
        excerpt.length > minCharacters
      ) {
        break
      }
      lastIndex += 1
    }
  }

  excerpt = excerpt.trim()
  return excerpt.length > 0
    ? `${excerpt}${excerpt.endsWith('.') ? '..' : '...'}`
    : defaultExcerpt || ''
}

export const getDomainFromUrl = (url?: string | null): string | null => {
  if (!url) return null
  const inx = url.lastIndexOf('/')
  const cleanUrl = url.substring(0, inx + 1)
  return cleanUrl
    .replace(/(^\w+:|^)\/\//, '')
    .replace(/\//g, '')
    .toLocaleLowerCase()
}
