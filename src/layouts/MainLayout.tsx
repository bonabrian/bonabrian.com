import Container from '@/components/Container'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main
        className="flex flex-col min-h-screen py-10 px-2 sm:px-0"
        role="main"
      >
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  )
}
