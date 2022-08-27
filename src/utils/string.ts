import removeMarkdown from 'remove-markdown'

const minCharacters = 70
const maxCharacters = 150

export const excerptText = (
  content?: string | null,
  defaultExcerpt?: string | null,
  trimLength?: boolean | null,
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

export const kebabCase = (str: string) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((x) => x.toLowerCase())
    .join('-')
