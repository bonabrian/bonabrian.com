import type { IconType } from 'react-icons'
import {
  RiChat1Line,
  RiDoubleQuotesR,
  RiFileListLine,
  RiHashtag,
  RiHome3Line,
  RiLineChartLine,
  RiLinkM,
  RiLoginCircleLine,
  RiNodeTree,
  RiPencilLine,
  RiUserLine,
} from 'react-icons/ri'

export type MenuItem = {
  href: string
  label: string
  icon: IconType
  showOnNavigation?: boolean
}

export const menuItems: MenuItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: RiHome3Line,
  },
  {
    href: '/blog',
    label: 'Blog',
    icon: RiPencilLine,
    showOnNavigation: true,
  },
  {
    href: '/work',
    label: 'Work',
    icon: RiNodeTree,
    showOnNavigation: true,
  },
  {
    href: '/resume',
    label: 'Resume',
    icon: RiFileListLine,
    showOnNavigation: true,
  },
  {
    href: '/about',
    label: 'About',
    icon: RiUserLine,
    showOnNavigation: true,
  },
  {
    href: '/login',
    label: 'Login',
    icon: RiLoginCircleLine,
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: RiLinkM,
  },
  {
    href: '/tags',
    label: 'Tags',
    icon: RiHashtag,
  },
  {
    href: '/guestbook',
    label: 'Guestbook',
    icon: RiChat1Line,
  },
  {
    href: '/stats',
    label: 'Stats',
    icon: RiLineChartLine,
  },
  {
    href: '/quotes',
    label: 'Quotes',
    icon: RiDoubleQuotesR,
  },
]
