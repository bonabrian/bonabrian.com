import './global.css'

import { DM_Sans as DMSans } from 'next/font/google'

const font = DMSans({ subsets: ['latin'] })

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" suppressHydrationWarning>
    <body className={font.className}>{children}</body>
  </html>
)

export default RootLayout
