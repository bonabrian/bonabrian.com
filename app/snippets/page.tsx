import { compareDesc } from 'date-fns';
import type { Metadata } from 'next';

import { allSnippets } from '@/.content-collections/generated';
import Container from '@/components/container';
import EmptyState from '@/components/empty-state';
import PageHeader from '@/components/shared/page-header';
import { ROUTES } from '@/constants';
import SnippetCard from '@/features/snippets/components/snippet-card';
import { seo } from '@/lib/meta';
import { cn } from '@/lib/utils';

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
        {snippets.length ? (
          <div className={cn('grid')}>
            {snippets.map((snippet) => (
              <SnippetCard key={snippet._id} snippet={snippet} />
            ))}
          </div>
        ) : (
          <EmptyState message="The snippets are probably off having a party somewhere without us!" />
        )}
      </Container>
    </>
  );
};

export default SnippetsPage;
