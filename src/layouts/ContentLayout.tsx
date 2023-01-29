import Footer from '@/components/Footer'
import Header from '@/components/Header'

export const ContentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="max-w-6xl px-4 mx-auto xl:px-0 flex flex-col">
        <div className="flex flex-col justify-between min-h-screen py-10">
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}
