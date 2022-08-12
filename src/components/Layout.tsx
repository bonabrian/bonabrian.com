import Container from './Container'
import Footer from './Footer'
import Header from './Header'
import { PageMeta } from './Meta'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <PageMeta />
      <Header />
      <Container>
        <div className='flex flex-col justify-between min-h-screen'>
          <main>{children}</main>
        </div>
        <Footer />
      </Container>
    </>
  )
}

export default Layout
