import { compareDesc } from 'date-fns';
import type { Metadata } from 'next';

import { allSnippets } from '@/.contentlayer/generated';
import Container from '@/components/shared/container';
import PageHeader from '@/components/shared/page-header';
import SnippetList from '@/components/snippets/snippet-list';
import { ROUTES } from '@/constants';
import { seo } from '@/lib/meta';

export const metadata: Metadata = seo({
  title: 'Snippets',
  description:
    'A curated collection of snippets I frequently use in my projects.',
  keywords: [
    'snippets',
    'code',
    'collection',
    'tricks',
    'shorthand',
    'scripts',
  ],
  url: ROUTES.snippets,
});

const SnippetsPage = () => {
  const snippets = allSnippets
    .filter((snippet) => snippet.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <>
      <PageHeader
        title="Snippets"
        description="A curated collection of snippets I frequently use in my projects."
      />
      <Container>
        <SnippetList snippets={snippets} />
      </Container>
    </>
  );
};

export default SnippetsPage;
