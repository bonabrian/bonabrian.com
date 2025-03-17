import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import allPages from '@/.content-collections/generated/allPages';
import Container from '@/components/container';
import PageHeader from '@/components/shared/page-header';
import { ROUTES } from '@/constants';
import Mdx from '@/features/content/components/mdx/mdx';
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
        <Mdx code={uses.code} />
      </Container>
    </>
  );
};

export default UsesPage;
