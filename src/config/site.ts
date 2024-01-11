interface Author {
  name: string
  url: string
  avatar: string
  email: string
  github: string
  linkedIn: string
  twitter?: string
}

interface Site {
  url: string
  name: string
  title: string
  description: string
  author: Author
  keywords?: string[]
}

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://bonabrian.com'
    : 'http://localhost:3000'

const site: Site = {
  url: BASE_URL,
  name: "bonabrian's portfolio",
  title: 'Bona Brian Siagian',
  description:
    'Passionate Full-stack engineer who focused on solving problems with digital products.',
  author: {
    name: 'Bona Brian Siagian',
    url: 'https://bonabrian.com',
    email: 'bonabrian.dev@gmail.com',
    github: 'https://github.com/bonabrian',
    linkedIn: 'https://www.linkedin.com/in/bonabrian',
    avatar:
      'https://res.cloudinary.com/dg48wbt00/image/upload/v1695023059/avatar.jpg',
    twitter: '@bonabrian_',
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
}

export default site
