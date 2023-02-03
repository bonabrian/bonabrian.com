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

import { routePaths } from './routePaths'

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
    path: routePaths.BLOG,
    label: 'Blog',
    icon: RiPencilLine,
  },
  {
    path: routePaths.PROJECTS,
    label: 'Projects',
    icon: RiNodeTree,
  },
  {
    path: routePaths.SNIPPETS,
    label: 'Snippets',
    icon: RiBracesLine,
  },
  {
    path: routePaths.ENDORSEMENTS,
    label: 'Endorsements',
    icon: HiOutlineBadgeCheck,
  },
  {
    path: routePaths.ABOUT,
    label: 'About',
    icon: RiUserLine,
  },
  {
    path: routePaths.STATS,
    label: 'Stats',
    icon: RiLineChartLine,
    onlyShowOnDropdownMenu: true,
  },
]
