import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import type { Snippet as SnippetDB } from '@/.content-collections/generated';
import { allSnippets } from '@/.content-collections/generated';
import { ROUTES } from '@/constants/routes';
import { BASE_URL } from '@/constants/site';
import Snippet from '@/features/snippets/components/snippet';
import { SnippetProvider } from '@/features/snippets/components/snippet-provider';
import { buildJsonLd, seo } from '@/lib/meta';
import { formatDate } from '@/lib/utils';

const findSnippetBySlug = (slug?: string): SnippetDB | undefined =>
  allSnippets
    .filter((snippet) => snippet.published)
    .find((snippet) => snippet.slug === slug);

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> => {
  const { slug } = await params;
  const snippet = findSnippetBySlug(slug);

  if (!snippet) return;

  const publishedDate = formatDate(snippet.date);

  return seo({
    title: snippet.title,
    description: snippet.description,
    keywords: [
      'note',
      'snippet',
      'code',
      'collection',
      'tricks',
      'shorthand',
      'scripts',
    ],
    url: `${ROUTES.snippets}/${snippet.slug}`,
    date: publishedDate,
    openGraph: {
      type: 'article',
      publishedTime: publishedDate,
    },
  });
};

const SnippetPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const snippet = findSnippetBySlug(slug);

  if (!snippet) return notFound();

  const { title, description, date } = snippet;
  const publishedDate = formatDate(date);

  return (
    <SnippetProvider snippet={snippet}>
      <Snippet />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildJsonLd({
            title,
            description,
            headline: title,
            datePublished: publishedDate,
            dateModified: publishedDate,
            url: `${BASE_URL}${ROUTES.snippets}/${slug}`,
          }),
        }}
        key="snippet-jsonld"
      />
    </SnippetProvider>
  );
};

export default SnippetPage;
