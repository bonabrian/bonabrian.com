import {
  AtSign,
  BarChart,
  BookOpenText,
  CodeBracket,
  GitHub,
  Home,
  Layers,
  LinkedIn,
  Medal,
  Pencil,
  RSS,
} from '@/components/icons'
import { defaultMetadata } from '@/lib/metadata'

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
  endorsements: '/endorsements',
  guestbook: '/guestbook',
  about: '/about',
  dashboard: '/dashboard',
  resume: '/resume',
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
      title: 'Snippets',
      url: ROUTES.snippets,
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
    {
      title: 'Dashboard',
      url: ROUTES.dashboard,
    },
  ],
]

export const footerIconLinks: FooterIconLink[] = [
  {
    title: 'Github',
    url: defaultMetadata.author.github,
    icon: <GitHub />,
    colorClass: 'hover:text-current',
  },
  {
    title: 'LinkedIn',
    url: defaultMetadata.author.linkedin,
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
    path: ROUTES.blog,
    label: 'Blog',
    icon: <Pencil />,
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
  },
  {
    path: ROUTES.endorsements,
    label: 'Endorsements',
    icon: <Medal />,
  },
  {
    path: ROUTES.dashboard,
    label: 'Dashboard',
    icon: <BarChart />,
  },
  {
    path: ROUTES.guestbook,
    label: 'Guestbook',
    icon: <BookOpenText />,
  },
  {
    path: ROUTES.about,
    label: 'About',
    icon: <AtSign />,
  },
]
