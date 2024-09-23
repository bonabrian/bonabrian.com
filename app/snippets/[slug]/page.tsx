import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import type { Snippet } from '@/.contentlayer/generated';
import { allSnippets } from '@/.contentlayer/generated';
import Container from '@/components/shared/container';
import Engagements from '@/components/shared/engagements';
import Mdx from '@/components/shared/mdx';
import SnippetHeader from '@/components/snippets/snippet-header';
import { BASE_URL, ROUTES } from '@/constants';
import { buildJsonLd, seo } from '@/lib/meta';
import { cn, formatDate } from '@/lib/utils';

const findSnippetBySlug = (slug?: string): Snippet | undefined =>
  allSnippets
    .filter((snippet) => snippet.published)
    .find((snippet) => snippet.slug === slug);

export const generateMetadata = async ({
  params,
}: {
  params: { slug?: string };
}): Promise<Metadata | undefined> => {
  const snippet = findSnippetBySlug(params?.slug);

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

const SnippetPage = ({ params }: { params: { slug?: string } }) => {
  const snippet = findSnippetBySlug(params?.slug);

  if (!snippet) return notFound();

  const { title, slug, description, date, body, readingTime } = snippet;
  const publishedDate = formatDate(date);

  return (
    <>
      <SnippetHeader
        title={title}
        description={description}
        readingTime={readingTime}
        date={publishedDate}
        slug={slug}
      />
      <Container>
        <Mdx className={cn('mt-8')} code={body.code} />
        <Engagements />
      </Container>
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
    </>
  );
};

export default SnippetPage;