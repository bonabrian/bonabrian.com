import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'

import type { NavItemProps } from '@/common/config'

const NavItem = ({ href, label }: NavItemProps) => {
  const router = useRouter()

  const ItemLink = styled.a({
    margin: 'auto 2rem',
    fontWeight: 600,
    position: 'relative',
    color: 'var(--text-primary)',
    transitionProperty:
      'color,background-color,border-color,text-decoration-color,fill,stroke,-webkit-text-decoration-color',
    transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)',
    transitionDuration: '200ms',
    ':hover': { color: 'var(--color-primary)' },
  })

  return (
    <Link href={href} passHref>
      <ItemLink
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
                  bottom: 0,
                },
              })
            : {}
        }
      >
        {label}
      </ItemLink>
    </Link>
  )
}

export default NavItem
