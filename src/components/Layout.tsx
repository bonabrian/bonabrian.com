import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main
        className="flex flex-col mx-auto max-w-6xl justify-center py-10 px-4"
        role="main"
      >
        <div className="min-h-screen">{children}</div>
      </main>
      <Footer />
    </>
  )
}

export default Layout
