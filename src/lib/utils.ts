type FormatDateProps = {
  timestamp?: string | null
  locale?: string
  year?: 'numeric' | '2-digit'
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
  day?: 'numeric' | '2-digit'
}

export const ariaAttr = (condition: boolean | undefined) =>
  condition ? true : undefined

export const unique = <T, Key extends keyof T>(
  array: Array<T> | T[],
  property?: Key,
): Array<T> => {
  if (!property) return Array.from(new Set([...array]))

  const set = new Set()
  return array.filter((o: T) => {
    return !set.has(o[property]) && set.add(o[property])
  })
}

export const kebabCase = (str?: string) =>
  str
    ?.match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
    )
    ?.map((x) => x.toLowerCase())
    .join('-')

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

export const getDomainFromUrl = (url?: string | null): string | null => {
  if (!url) return null
  const inx = url.lastIndexOf('/')
  const cleanUrl = url.substring(0, inx + 1)
  return cleanUrl
    .replace(/(^\w+:|^)\/\//, '')
    .replace(/\//g, '')
    .toLocaleLowerCase()
}

export const getBaseUrl = () => {
  const isDevelopment = process.env.NODE_ENV === 'development'
  return isDevelopment ? 'http://localhost:3000' : 'https://bonabrian.com'
}
