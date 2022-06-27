import styled from '@emotion/styled'

import { mainNavItems } from '@/common/config'
import { breakpoints } from '@/common/utils'

import NavItem from './NavItem'

const NavItemsWrapper = styled.div`
  @media (min-width: ${breakpoints.sm}) {
    display: none;
  }
  @media (min-width: ${breakpoints.md}) {
    display: flex;
  }
  display: none;
`

const Navigation = () => {
  return (
    <NavItemsWrapper>
      {mainNavItems.map((navItem) => (
        <NavItem {...navItem} key={navItem.label} />
      ))}
    </NavItemsWrapper>
  )
}

export default Navigation
