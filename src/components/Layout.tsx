import Container from './Container'
import Footer from './Footer'
import Header from './Header'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Container>
        <div className="flex flex-col min-h-screen py-10 px-2 sm:px-0">
          {children}
        </div>
        <Footer />
      </Container>
    </>
  )
}

export default Layout
