import styled from '@emotion/styled'
import * as React from 'react'

import Meta from '@/common/components/Meta'

import Header from './Header'

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
