import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { getProviders } from 'next-auth/react'

import PageHeader from '@/components/page-header'
import { Container } from '@/components/ui'
import { authOptions } from '@/lib/auth'
import { seo } from '@/lib/meta'

import SignInCard from './signin-card'

export const metadata: Metadata = seo({
  title: 'Sign In',
  description: 'Sign In',
  url: '/auth/signin',
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

      <Container>
        <SignInCard providers={providers} />
      </Container>
    </>
  )
}

export default SignInPage
