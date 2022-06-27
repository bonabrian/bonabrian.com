import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'

import type { NavItemProps } from '@/common/config'

const NavItem = ({ href, label }: NavItemProps) => {
  const router = useRouter()

  const ItemLink = styled.a({
    margin: 'auto 2rem',
    fontWeight: 600,
    color: `${
      router.pathname === href
        ? 'var(--active-nav-item-color)'
        : 'var(--text-color)'
    }`,
    transitionProperty:
      'color,background-color,border-color,text-decoration-color,fill,stroke,-webkit-text-decoration-color',
    transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)',
    transitionDuration: '200ms',
    ':hover': { color: 'var(--active-nav-item-color)' },
  })

  return (
    <Link href={href} passHref>
      <ItemLink>{label}</ItemLink>
    </Link>
  )
}

export default NavItem
