import type { IconType } from 'react-icons'
import { HiOutlineBadgeCheck } from 'react-icons/hi'
import {
  RiBracesLine,
  RiHome3Line,
  RiLineChartLine,
  RiNodeTree,
  RiPencilLine,
  RiUserLine,
} from 'react-icons/ri'

import { routes } from './routes'

export type Nav = {
  path: string
  label: string
  icon: IconType
  onlyShowOnDropdownMenu?: boolean
}

export const navItems: Nav[] = [
  {
    path: '/',
    label: 'Home',
    icon: RiHome3Line,
    onlyShowOnDropdownMenu: true,
  },
  {
    path: routes.BLOG,
    label: 'Blog',
    icon: RiPencilLine,
  },
  {
    path: routes.PROJECTS,
    label: 'Projects',
    icon: RiNodeTree,
  },
  {
    path: routes.SNIPPETS,
    label: 'Snippets',
    icon: RiBracesLine,
  },
  {
    path: routes.ENDORSEMENTS,
    label: 'Endorsements',
    icon: HiOutlineBadgeCheck,
  },
  {
    path: routes.ABOUT,
    label: 'About',
    icon: RiUserLine,
  },
  {
    path: routes.STATS,
    label: 'Stats',
    icon: RiLineChartLine,
    onlyShowOnDropdownMenu: true,
  },
]
