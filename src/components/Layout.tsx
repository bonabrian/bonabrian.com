import { motion } from 'framer-motion'

import Container from './Container'
import Footer from './Footer'
import Header from './Header'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const variants = {
    hidden: { opacity: 0, x: -200 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  }

  return (
    <>
      <Header />
      <Container>
        <div className='flex flex-col justify-between min-h-screen'>
          <motion.main
            initial='hidden'
            animate='enter'
            exit='exit'
            variants={variants}
            transition={{ type: 'linear' }}
          >
            {children}
          </motion.main>
        </div>
        <Footer />
      </Container>
    </>
  )
}

export default Layout
