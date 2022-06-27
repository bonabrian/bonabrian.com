export type NavItemProps = {
  href: string
  label: string
}

export const mainNavItems: NavItemProps[] = [
  { href: '/about', label: 'about' },
  { href: '/work', label: 'work' },
  { href: '/resume', label: 'resume' },
  { href: '/blog', label: 'blog' },
  // TODO: maybe need contact?
  // { href: '/contact', label: 'Contact' },
]

export const mobileNavItems: NavItemProps[] = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/work', label: 'work' },
  { href: '/resume', label: 'resume' },
  { href: '/blog', label: 'blog' },
]
