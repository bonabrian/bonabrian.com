import {
  AtSign,
  BookOpenText,
  Dashboard,
  FileCode,
  GitHub,
  Home,
  LightBulb,
  LinkedIn,
  Medal,
  Pencil,
  RSS,
  Shapes,
} from '@/components/icons'

import { GITHUB_ACCOUNT } from './github'
import site from './site'

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
  className: string
}

export const ROUTES = {
  blog: '/blog',
  projects: '/projects',
  notes: '/notes',
  tags: '/tags',
  endorsements: '/endorsements',
  guestbook: '/guestbook',
  about: '/about',
  dashboard: '/dashboard',
  resume: '/resume',
  todayILearned: '/today-i-learned',
}

export const NAV_LINKS: NavLink[] = [
  {
    path: '/',
    label: 'Home',
    icon: <Home className="h-5 w-5" />,
    onlyShowOnDropdownMenu: true,
  },
  {
    path: ROUTES.blog,
    label: 'Blog',
    icon: <Pencil className="h-5 w-5" />,
  },
  {
    path: ROUTES.projects,
    label: 'Projects',
    icon: <Shapes className="h-5 w-5" />,
  },
  {
    path: ROUTES.dashboard,
    label: 'Dashboard',
    icon: <Dashboard className="h-5 w-5" />,
  },
  {
    path: ROUTES.notes,
    label: 'Notes',
    icon: <FileCode className="h-5 w-5" />,
    onlyShowOnDropdownMenu: true,
  },
  {
    path: ROUTES.todayILearned,
    label: 'T.I.L',
    icon: <LightBulb className="h-5 w-5" />,
    onlyShowOnDropdownMenu: true,
  },
  {
    path: ROUTES.guestbook,
    label: 'Guestbook',
    icon: <BookOpenText className="h-5 w-5" />,
  },
  {
    path: ROUTES.endorsements,
    label: 'Endorsements',
    icon: <Medal className="h-5 w-5" />,
  },
  {
    path: ROUTES.about,
    label: 'About',
    icon: <AtSign className="h-5 w-5" />,
  },
]

export const FOOTER_LINKS = [
  [
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'About',
      url: ROUTES.about,
    },
    {
      title: 'Dashboard',
      url: ROUTES.dashboard,
    },
    {
      title: 'Projects',
      url: ROUTES.projects,
    },
  ],
  [
    {
      title: 'Blog',
      url: ROUTES.blog,
    },
    {
      title: 'Notes',
      url: ROUTES.notes,
    },
    {
      title: 'T.I.L',
      url: ROUTES.todayILearned,
    },
  ],
  [
    {
      title: 'Guestbook',
      url: ROUTES.guestbook,
    },
    {
      title: 'Endorsements',
      url: ROUTES.endorsements,
    },
  ],
]

export const FOOTER_ICON_LINKS: FooterIconLink[] = [
  {
    title: 'GitHub',
    url: GITHUB_ACCOUNT.url,
    icon: <GitHub />,
    className: 'hover:text-current',
  },
  {
    title: 'LinkedIn',
    url: site.author.linkedIn,
    icon: <LinkedIn />,
    className: 'hover:text-[#0A66C2]',
  },
  {
    title: 'RSS Feed',
    url: '/feed.xml',
    icon: <RSS />,
    className: 'hover:text-[#FFA500]',
  },
]
