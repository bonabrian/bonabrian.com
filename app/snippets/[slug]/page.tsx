import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import type { Snippet } from '@/.contentlayer/generated';
import { allSnippets } from '@/.contentlayer/generated';
import ContentEngagements from '@/components/content-engagements';
import SnippetProvider from '@/components/providers/snippet-provider';
import Container from '@/components/shared/container';
import Mdx from '@/components/shared/mdx';
import { BASE_URL, ROUTES } from '@/constants';
import { buildJsonLd, seo } from '@/lib/meta';
import { cn, formatDate } from '@/lib/utils';

import Header from './header';

const findSnippetBySlug = (slug?: string): Snippet | undefined =>
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

  const { title, description, date, body } = snippet;
  const publishedDate = formatDate(date);

  return (
    <SnippetProvider snippet={snippet}>
      <Header />
      <Container>
        <Mdx className={cn('mt-8')} code={body.code} />
        <ContentEngagements slug={slug} />
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildJsonLd({
            title,
            description,
            headline: title,
            datePublished: publishedDate,
            // TODO: add dateModified
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
