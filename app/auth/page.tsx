import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';

import Container from '@/components/container';
import PageHeader from '@/components/page-header';
import { SITE } from '@/constants';
import AuthCard from '@/features/auth/components/auth-card';
import { authOptions } from '@/lib/auth';
import { seo } from '@/lib/meta';

export const metadata: Metadata = seo({
  title: 'Auth',
  description: `Sign in to ${SITE.name}`,
  url: '/auth/signin',
  robots: { index: false, follow: false },
});

const AuthPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect('/');

  const providers = await getProviders();

  return (
    <>
      <PageHeader
        title="Auth"
        description="Please sign in using one of the following providers"
      />
      <Container>
        <AuthCard providers={providers} />
      </Container>
    </>
  );
};

export default AuthPage;
