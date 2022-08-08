import styled from '@emotion/styled'
import * as React from 'react'

import Container from './Container'
import Header from './Header'
import Meta from './Meta'

type Props = {
  children: React.ReactNode
}

const LayoutWrapper = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
})

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <Container>
        <LayoutWrapper>
          <Header />
          <main>{children}</main>
        </LayoutWrapper>
      </Container>
    </>
  )
}

export default Layout
