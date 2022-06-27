import styled from '@emotion/styled'
import * as React from 'react'

import Meta from '@/common/components/Meta'
import { useMediaQuery } from '@/common/hooks'
import { breakpoints } from '@/common/utils'

import Header from './Header'
import MobileNavigation from './navigation/MobileNavigation'

type LayoutProps = {
  children: React.ReactNode
}

const LayoutWrapper = styled.div({
  backgroundColor: 'var(--background-color)',
  color: 'var(--text-color)',
  minHeight: '100vh',
  paddingTop: '6rem',
  paddingBottom: '0.5rem',
  transition: '0.4s ease-out',
})

const Container = styled.div`
  @media (min-width: ${breakpoints.sm}) {
    max-width: 100vw;
  }
  @media (min-width: ${breakpoints.md}) {
    max-width: 85vw;
  }
  @media (min-width: ${breakpoints.lg}) {
    max-width: 800px;
  }
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  position: relative;
  z-index: 1;
  margin: 0 auto;
`

const Layout = ({ children }: LayoutProps) => {
  const isMobileView = useMediaQuery('(max-width: 767px)')

  return (
    <LayoutWrapper>
      <Meta />
      {isMobileView ? <MobileNavigation /> : <Header />}
      <Container>{children}</Container>
    </LayoutWrapper>
  )
}

export default Layout
