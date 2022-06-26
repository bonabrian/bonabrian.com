import styled from '@emotion/styled'
import * as React from 'react'

import Meta from '@/common/components/Meta'

import Header from './Header'

type LayoutProps = {
  children: React.ReactNode
}

const LayoutWrapper = styled.div`
  background-color: var(--background-color);
  color: var(--text-color);
  min-height: 100vh;
  padding-top: 6rem;
  padding-bottom: 0.5rem;
  transition: 0.4s ease-out;
`

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutWrapper>
      <Meta />
      <Header />
      {children}
    </LayoutWrapper>
  )
}

export default Layout
