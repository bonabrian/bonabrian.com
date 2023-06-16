import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { getProviders } from 'next-auth/react'

import SignInCard from '@/components/sign-in-card'
import { authOptions } from '@/lib/auth'
import { getMetadata } from '@/lib/metadata'

export const metadata: Metadata = getMetadata({
  title: 'Sign In',
  description: 'Sign In',
})

const SignInPage = async () => {
  const session = await getServerSession(authOptions)

  if (session) redirect('/')

  const providers = await getProviders()
  return <SignInCard providers={providers} />
}

export default SignInPage
