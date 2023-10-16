import { format, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

import { env } from '@/data/env'

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

export const formatDate = (
  date: string,
  dateFormat: string = 'MMMM dd, yyyy',
) => {
  const formattedDate = format(
    utcToZonedTime(parseISO(date), 'Asia/Jakarta'),
    dateFormat,
  )

  return formattedDate
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
  const isDevelopment = env.NODE_ENV === 'development'
  return isDevelopment ? 'http://localhost:3000' : 'https://bonabrian.com'
}

export const isClient = typeof window !== 'undefined'
export const isServer = typeof window === 'undefined'
