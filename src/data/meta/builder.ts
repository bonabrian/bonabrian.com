import { unique } from '@/lib/utils'

import { BASE_URL } from '../app'
import { env } from '../env'

/**
 * Helper function to determine the hostname for the given environment,
 * with a focus on working with Vercel deployments. Set by Vercel automatically.
 * @return the hostname for the given environment.
 */
export const appHost = (includeProtocol = true): string => {
  const host = env.NEXT_PUBLIC_APP_URL
    ? env.NEXT_PUBLIC_APP_URL
    : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : ''

  return includeProtocol
    ? host
    : host.replace('https://', '').replace('http://', '')
}

/**
 * Build a URL for the given path.
 * @return the URL for the given path.
 */
export const fullURL = (path: string = '', host: string = appHost()): URL => {
  return new URL(path, host)
}

/**
 * Map given keywords
 */
export const mapKeywords = (keywords?: string | string[] | null): string => {
  if (!keywords) return ''
  if (Array.isArray(keywords)) {
    return unique(keywords || []).join(',')
  }

  return keywords
}

/**
 * Build OG Image url
 */
export const buildOgImageURL = (
  title: string,
  description: string,
  image?: string,
): string => {
  return `${BASE_URL}/api/og?title=${encodeURIComponent(
    title,
  )}&description=${encodeURIComponent(description)}${
    image ? `&image=${image}` : ''
  }`
}
