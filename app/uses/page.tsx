import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { allPages } from '@/.contentlayer/generated';
import Container from '@/components/shared/container';
import Mdx from '@/components/shared/mdx';
import PageHeader from '@/components/shared/page-header';
import { ROUTES } from '@/constants';
import { seo } from '@/lib/meta';

export const metadata: Metadata = seo({
  title: 'Uses',
  description:
    'A list of the tools, apps and hardware I use on a regular basis.',
  keywords: [
    'hardware',
    'software',
    'apps',
    'tools',
    'extensions',
    'stack',
    'website',
    'tech',
    'uses',
  ],
  url: ROUTES.uses,
});

const UsesPage = () => {
  const uses = allPages.find((page) => page.slug === 'uses');

  if (!uses) return notFound();

  return (
    <>
      <PageHeader
        title="Uses"
        description="A list of the tools, apps and hardware I use on a regular basis."
      />
      <Container>
        <Mdx code={uses?.body.code} />
      </Container>
    </>
  );
};

export default UsesPage;
