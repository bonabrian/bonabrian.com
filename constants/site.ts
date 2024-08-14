import { env } from '@/lib/env';

interface Author {
  name: string;
  url: string;
  avatar: string;
  email: string;
  linkedIn: string;
  github: string;
  twitter?: string;
}

interface Site {
  url: string;
  name: string;
  title: string;
  description: string;
  author: Author;
  keywords?: string[];
}

export const BASE_URL =
  env.NODE_ENV === 'production'
    ? 'https://bonabrian.com'
    : 'http://localhost:3000';

export const SITE: Site = {
  url: BASE_URL,
  name: "bonabrian's portfolio",
  title: 'Bona Brian Siagian',
  description:
    'Passionate Full-stack engineer who focused on solving problems with digital products.',
  author: {
    name: 'Bona Brian Siagian',
    url: 'https://bonabrian.com',
    email: 'bonabrian.dev@gmail.com',
    linkedIn: 'https://www.linkedin.com/in/bonabrian',
    github: 'https://www.github.com/bonabrian',
    avatar: '/media/bonabrian/bonabrian.jpg',
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
};
