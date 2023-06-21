'use client'

import { useSearchParams } from 'next/navigation'
import type { ClientSafeProvider } from 'next-auth/react'
import { signIn } from 'next-auth/react'

import { useTheme } from '@/hooks'
import cn from '@/lib/cn'

import Github from '../../assets/images/github.svg'
import GithubDark from '../../assets/images/github-dark.svg'
import Google from '../../assets/images/google.svg'
import GoogleDark from '../../assets/images/google-dark.svg'

interface StyleGuide {
  Logo: any
  LogoDark?: any
  bg: string
  bgDark?: string
  text: string
  textDark: string
}

const providerStyleGuides: { [key: string]: StyleGuide } = {
  github: {
    Logo: Github,
    LogoDark: GithubDark,
    bg: 'bg-black',
    bgDark: 'bg-white',
    text: 'text-white',
    textDark: 'text-black',
  },
  google: {
    Logo: Google,
    LogoDark: GoogleDark,
    bg: 'bg-white',
    bgDark: 'bg-[#4285f4]',
    text: 'text-black',
    textDark: 'text-white',
  },
}

const LoginProviderButton = ({
  provider,
}: {
  provider: ClientSafeProvider
}) => {
  const { theme, mounted } = useTheme()
  const isDark = theme === 'dark'
  const { Logo, LogoDark, bg, bgDark, text, textDark } =
    providerStyleGuides[provider.id]
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl')

  if (!mounted) return null

  return (
    <div key={provider.name}>
      <button
        type="button"
        className={cn(
          'w-56 h-12 flex items-center gap-3 text-sm font-medium leading-5 transition-colors duration-150 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-primary',
          isDark && bgDark ? bgDark : bg,
          isDark && textDark ? textDark : text,
        )}
        onClick={() =>
          signIn(provider.id, { callbackUrl: callbackUrl as string })
        }
      >
        {isDark && LogoDark ? (
          <LogoDark className={cn('h-full p-2')} />
        ) : (
          <Logo className={cn('h-full p-2')} />
        )}
        Sign in with {provider.name}
      </button>
    </div>
  )
}

export default LoginProviderButton
