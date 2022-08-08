import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { menuItems } from '../data'
import { breakpoints } from '../utils'
import Dropdown from './Dropdown'
import Logo from './Logo'
import NavLink from './NavLink'
import ThemeSwitch from './ThemeSwitch'

const HeaderWrapper = styled.header({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '2.5rem 0',
})

const Navigation = styled.div`
  display: none;
  @media (min-width: ${breakpoints.sm}) {
    display: flex;
  }
`

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo />
      <div
        css={css({
          display: 'flex',
          fontSize: 'var(--font-size-base)',
          alignItems: 'center',
          lineHeight: '1.25rem',
        })}
      >
        <Navigation>
          {menuItems
            .filter((item) => item.showOnNavigation === true)
            .map((menu) => (
              <NavLink
                key={menu.label}
                href={menu.href}
                label={menu.label.toLowerCase()}
              />
            ))}
        </Navigation>
        <ThemeSwitch />
        <Dropdown />
      </div>
    </HeaderWrapper>
  )
}

export default Header
