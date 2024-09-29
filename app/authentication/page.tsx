import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';

import Container from '@/components/shared/container';
import PageHeader from '@/components/shared/page-header';
import { authOptions } from '@/lib/auth';
import { seo } from '@/lib/meta';

import AuthCard from './auth-card';

export const metadata: Metadata = seo({
  title: 'Authentication',
  description: 'Authentication',
  url: '/auth/signin',
  robots: { index: false, follow: false },
});

const AuthenticationPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect('/');

  const providers = await getProviders();

  return (
    <>
      <PageHeader
        title="Authentication"
        description="Please sign in using one of the following providers"
      />
      <Container>
        <AuthCard providers={providers} />
      </Container>
    </>
  );
};

export default AuthenticationPage;
