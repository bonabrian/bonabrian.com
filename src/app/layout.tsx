import '@/styles/app.css'

import { Poppins } from 'next/font/google'

import Analytics from '@/components/analytics'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import Providers from '@/components/providers'

const fontSans = Poppins({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={fontSans.variable}>
      <body className="antialiased text-black bg-slate-100 dark:bg-gray-900 dark:text-slate-100">
        <Providers>
          <Navbar />
          <main
            className="flex flex-col mx-auto max-w-5xl justify-center py-10 px-4"
            role="main"
          >
            <div className="min-h-screen">{children}</div>
          </main>
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
