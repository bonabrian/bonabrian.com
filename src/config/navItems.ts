import type { IconType } from 'react-icons'
import { HiOutlineBadgeCheck } from 'react-icons/hi'
import {
  RiBracesLine,
  // RiDoubleQuotesR,
  // RiHashtag,
  RiHome3Line,
  RiLineChartLine,
  // RiLinkM,
  RiNodeTree,
  RiPencilLine,
  RiUserLine,
} from 'react-icons/ri'

type NavItem = {
  href: string
  label: string
  icon: IconType
  onlyOnDropdownMenu?: boolean
}

export const navItems: NavItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: RiHome3Line,
    onlyOnDropdownMenu: true,
  },
  {
    href: '/blog',
    label: 'Blog',
    icon: RiPencilLine,
  },
  {
    href: '/projects',
    label: 'Projects',
    icon: RiNodeTree,
  },
  {
    href: '/snippets',
    label: 'Snippets',
    icon: RiBracesLine,
  },
  {
    href: '/endorsements',
    label: 'Endorsements',
    icon: HiOutlineBadgeCheck,
  },
  // {
  //   href: '/guestbook',
  //   label: 'Guestbook',
  //   icon: RiChat1Line,
  //   onlyOnDropdownMenu: true,
  // },
  {
    href: '/about',
    label: 'About',
    icon: RiUserLine,
  },
  // {
  //   href: '/contact',
  //   label: 'Contact',
  //   icon: RiLinkM,
  //   onlyOnDropdownMenu: true,
  // },
  // {
  //   href: '/tags',
  //   label: 'Tags',
  //   icon: RiHashtag,
  //   onlyOnDropdownMenu: true,
  // },
  {
    href: '/stats',
    label: 'Stats',
    icon: RiLineChartLine,
    onlyOnDropdownMenu: true,
  },
  // {
  //   href: '/quotes',
  //   label: 'Quotes',
  //   icon: RiDoubleQuotesR,
  //   onlyOnDropdownMenu: true,
  // },
]
