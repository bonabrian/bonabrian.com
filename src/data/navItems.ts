import type { IconType } from 'react-icons'
import { HiOutlineBadgeCheck } from 'react-icons/hi'
import {
  RiChat1Line,
  // RiDoubleQuotesR,
  RiHashtag,
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

const navItems: NavItem[] = [
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
    href: '/endorsements',
    label: 'Endorsements',
    icon: HiOutlineBadgeCheck,
  },
  {
    href: '/guestbook',
    label: 'Guestbook',
    icon: RiChat1Line,
    onlyOnDropdownMenu: true,
  },
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
  {
    href: '/tags',
    label: 'Tags',
    icon: RiHashtag,
    onlyOnDropdownMenu: true,
  },
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

export default navItems
