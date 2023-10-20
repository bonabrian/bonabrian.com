import {
  AtSign,
  BarChart,
  BookOpenText,
  CodeBracket,
  GitHub,
  Home,
  Layers,
  LightBulb,
  LinkedIn,
  Medal,
  Pencil,
  RSS,
} from '@/components/icons'

import { siteConfig } from './site'

interface NavLink {
  path: string
  label: string
  icon: JSX.Element
  onlyShowOnDropdownMenu?: boolean
}

interface FooterIconLink {
  title: string
  url: string
  icon: JSX.Element
  colorClass: string
}

export const ROUTES = {
  blog: '/blog',
  projects: '/projects',
  snippets: '/snippets',
  tags: '/tags',
  endorsements: '/endorsements',
  guestbook: '/guestbook',
  about: '/about',
  dashboard: '/dashboard',
  resume: '/resume',
  todayILearned: '/today-i-learned',
}

export const footerLinks = [
  [
    {
      title: 'Projects',
      url: ROUTES.projects,
    },
    {
      title: 'About',
      url: ROUTES.about,
    },
  ],
  [
    {
      title: 'Blog',
      url: ROUTES.blog,
    },
    {
      title: 'T.I.L',
      url: ROUTES.todayILearned,
    },
    {
      title: 'Snippets',
      url: ROUTES.snippets,
    },
  ],
  [
    {
      title: 'Dashboard',
      url: ROUTES.dashboard,
    },
    {
      title: 'Endorsements',
      url: ROUTES.endorsements,
    },
    {
      title: 'Guestbook',
      url: ROUTES.guestbook,
    },
  ],
]

export const footerIconLinks: FooterIconLink[] = [
  {
    title: 'Github',
    url: siteConfig.author.github,
    icon: <GitHub />,
    colorClass: 'hover:text-current',
  },
  {
    title: 'LinkedIn',
    url: siteConfig.author.linkedIn,
    icon: <LinkedIn />,
    colorClass: 'hover:text-[#0A66C2]',
  },
  {
    title: 'RSS Feed',
    url: '/feed.xml',
    icon: <RSS />,
    colorClass: 'hover:text-[#FFA500]',
  },
]

export const navLinks: NavLink[] = [
  {
    path: '/',
    label: 'Home',
    icon: <Home />,
    onlyShowOnDropdownMenu: true,
  },
  {
    path: ROUTES.dashboard,
    label: 'Dashboard',
    icon: <BarChart />,
  },
  {
    path: ROUTES.projects,
    label: 'Projects',
    icon: <Layers />,
  },
  {
    path: ROUTES.snippets,
    label: 'Snippets',
    icon: <CodeBracket />,
    onlyShowOnDropdownMenu: true,
  },
  {
    path: ROUTES.blog,
    label: 'Blog',
    icon: <Pencil />,
  },
  {
    path: ROUTES.todayILearned,
    label: 'T.I.L',
    icon: <LightBulb />,
  },
  {
    path: ROUTES.endorsements,
    label: 'Endorsements',
    icon: <Medal />,
  },
  {
    path: ROUTES.guestbook,
    label: 'Guestbook',
    icon: <BookOpenText />,
    onlyShowOnDropdownMenu: true,
  },
  {
    path: ROUTES.about,
    label: 'About',
    icon: <AtSign />,
  },
]
