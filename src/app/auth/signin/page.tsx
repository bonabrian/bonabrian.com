import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { getProviders } from 'next-auth/react'

import PageHeader from '@/components/page-header'
import { authOptions } from '@/lib/auth'
import { getMetadata } from '@/lib/metadata'

import SignInCard from './sign-in-card'

export const metadata: Metadata = getMetadata({
  title: 'Sign In',
  description: 'Sign In',
})

const SignInPage = async () => {
  const session = await getServerSession(authOptions)

  if (session) redirect('/')

  const providers = await getProviders()
  return (
    <>
      <PageHeader
        title="Sign In"
        description="Please sign in using one of the following providers"
      />

      <div id="content">
        <SignInCard providers={providers} />
      </div>
    </>
  )
}

export default SignInPage
