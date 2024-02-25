'use client'

import {
  domAnimation,
  LazyMotion,
  MotionConfig as MotionProvider,
} from 'framer-motion'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

import useMounted from '@/hooks/use-mounted'

const Providers = ({ children }: { children: React.ReactNode }) => {
  const mounted = useMounted()

  return (
    mounted && (
      <MotionProvider reducedMotion="user">
        <LazyMotion strict features={domAnimation}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SessionProvider>{children}</SessionProvider>
          </ThemeProvider>
        </LazyMotion>
      </MotionProvider>
    )
  )
}

export default Providers
