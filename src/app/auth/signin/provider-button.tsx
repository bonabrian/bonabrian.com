'use client'

import { useSearchParams } from 'next/navigation'
import { type ClientSafeProvider, signIn } from 'next-auth/react'

import { GitHub, Google } from '@/components/icons'
import { Button } from '@/components/ui'
import cn from '@/utils/cn'

interface StyleGuide {
  logo: JSX.Element
}

const providerStyleGuides: { [key: string]: StyleGuide } = {
  github: {
    logo: <GitHub />,
  },
  google: {
    logo: <Google />,
  },
}

const ProviderButton = ({ provider }: { provider: ClientSafeProvider }) => {
  const { logo } = providerStyleGuides[provider.id]
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl')

  return (
    <Button
      key={provider.id}
      variant="shadow"
      className={cn(
        'flex items-center gap-3 border border-foreground text-sm font-medium',
      )}
      onClick={() =>
        signIn(provider.id, { callbackUrl: callbackUrl as string })
      }
    >
      {logo}
      <span>Sign in with {provider.name}</span>
    </Button>
  )
}

export default ProviderButton
