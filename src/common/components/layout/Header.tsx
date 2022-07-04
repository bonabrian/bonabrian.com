import styled from '@emotion/styled'
import Link from 'next/link'

import ThemeToggle from '@/common/components/ThemeToggle'
import { breakpoints } from '@/common/utils'

import Navigation from './navigation'

const HeaderWrapper = styled.div({
  position: 'fixed',
  top: 0,
  zIndex: 5,
  backgroundColor: 'var(--header-bg)',
  backdropFilter: 'blur(6px)',
  width: '100%',
})

const HeaderInner = styled.header`
  @media (min-width: ${breakpoints.sm}) {
    padding-inline-start: 22px;
    padding-inline-end: 22px;
  }
  @media (min-width: ${breakpoints.md}) {
    padding-inline-start: 11px;
    padding-inline-end: 11px;
  }
  @media (min-width: ${breakpoints.lg}) {
    padding-inline-start: 0px;
    padding-inline-end: 0px;
  }
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 22px 0;
  margin-inline-start: auto;
  margin-inline-end: auto;
  max-width: 800px;
`

const Brand = styled.a`
  @media (min-width: ${breakpoints.sm}) {
    font-size: 1.25rem;
  }
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  min-width: 2.5rem;
  height: 2.5rem;
`

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <Link href='/' passHref>
          <Brand>b.</Brand>
        </Link>
        <Navigation />
        <ThemeToggle />
      </HeaderInner>
    </HeaderWrapper>
  )
}

export default Header
