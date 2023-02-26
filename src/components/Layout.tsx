import Footer from './Footer'
import Navigation from './navigation'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation />
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
