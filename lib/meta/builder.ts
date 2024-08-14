import { BASE_URL } from '@/constants';

import { env } from '../env';

/**
 * Helper function to determine the hostname for the given environment,
 * with a focus on working with Vercel deployments. Set by Vercel automatically.
 * @return the hostname for the given environment.
 */
export const appHost = (includeProtocol: boolean = true): string => {
  let host = '';

  if (env.NEXT_PUBLIC_APP_URL) {
    host = env.NEXT_PUBLIC_APP_URL;
  } else if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    host = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  } else if (process.env.VERCEL_URL) {
    host = `https://${process.env.VERCEL_URL}`;
  }

  return includeProtocol
    ? host
    : host.replace('https://', '').replace('http://', '');
};

/**
 * Build a URL for the given path.
 * @return the URL for the given path.
 */
export const fullURL = (path: string = '', host: string = appHost()): URL =>
  new URL(path, host);

/**
 * Build OG Image url
 */
export const buildOgImageURL = (
  title: string,
  caption?: string,
  date?: string,
): string => {
  try {
    const url = new URL(`${BASE_URL}/api/og`);
    url.searchParams.set('title', title);
    if (caption) url.searchParams.set('caption', caption);
    if (date) url.searchParams.set('date', date);

    return url.href;
  } catch {
    return `${BASE_URL}/api/og`;
  }
};
