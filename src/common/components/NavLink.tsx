import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import Link from './Link'

const NavItem = styled.span({
  margin: 'auto 0.75rem',
  fontWeight: 600,
  position: 'relative',
  color: 'var(--text-primary)',
  transitionProperty:
    'color,background-color,border-color,text-decoration-color,fill,stroke,-webkit-text-decoration-color',
  transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)',
  transitionDuration: '200ms',
  ':hover': { color: 'var(--color-primary)' },
})

type NavLinkProps = {
  href: string
  label: string
}

const NavLink = ({ href, label }: NavLinkProps) => {
  const router = useRouter()

  return (
    <Link href={href}>
      <NavItem
        css={
          router.pathname === href
            ? css({
                color: 'var(--color-primary)',
                ':before': {
                  zIndex: 5,
                  content: '""',
                  width: '100%',
                  height: '3px',
                  position: 'absolute',
                  background: 'var(--color-primary)',
                  bottom: '-0.25rem',
                },
              })
            : {}
        }
      >
        {label}
      </NavItem>
    </Link>
  )
}

export default NavLink
