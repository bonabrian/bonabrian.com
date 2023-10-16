import { getBaseUrl } from './utils'

export const defaultMetadata = {
  applicationName: "bonabrian's portfolio",
  title: 'Full-stack Engineer',
  titleTemplate: '%s | Bona Brian Siagian',
  description:
    'Passionate Full-stack engineer who focused on solving problems with digital products.',
  author: {
    name: 'Bona Brian Siagian',
    url: 'https://bonabrian.com',
    email: 'bonabrian.dev@gmail.com',
    github: 'https://github.com/bonabrian',
    linkedin: 'https://www.linkedin.com/in/bonabrian',
    avatar:
      'https://res.cloudinary.com/dg48wbt00/image/upload/v1695023059/avatar.jpg',
  },
  keywords: [
    'bonabrian',
    'Bona Brian Siagian',
    'developer',
    'portfolio',
    'developer portfolio website',
    'portfolio website',
    'full-stack',
    'back-end',
    'front-end',
  ],
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    site: '@bonabrian_',
    creator: '@bonabrian_',
  },
}

export const buildOgImageUrl = (
  title: string,
  description: string,
  image?: string,
): string => {
  const baseUrl = getBaseUrl()

  return `${baseUrl}/api/og?title=${encodeURIComponent(
    title,
  )}&description=${encodeURIComponent(description)}${
    image ? `&image=${image}` : ''
  }`
}
