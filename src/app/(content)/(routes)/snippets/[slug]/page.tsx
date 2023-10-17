import type { Snippet } from 'contentlayer/generated'
import { allSnippets } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

import ContentMeta from '@/app/(content)/components/content-meta'
import Engagement from '@/app/(content)/components/engagement'
import Mdx from '@/components/mdx'
import { Container } from '@/components/ui'
import { BASE_URL, ROUTES } from '@/data/app'
import { buildJsonLd, seo } from '@/data/meta'
import cn from '@/lib/cn'
import { formatDate } from '@/lib/utils'
import type { RequestContext } from '@/types/request'

interface SnippetPageProps extends RequestContext<{ slug?: string }> {}

const findSnippetBySlug = (slug?: string): Snippet | undefined =>
  allSnippets
    .filter((post: Snippet) => post.published)
    .find((post: Snippet) => post.slug === slug)

export const generateMetadata = async ({ params }: SnippetPageProps) => {
  const snippet = findSnippetBySlug(params?.slug)

  if (!snippet) return

  const { title, description, date } = snippet
  const publishedDate = formatDate(date)

  return seo({
    title,
    description,
    keywords: [
      'snippet',
      'code',
      'collection',
      'tricks',
      'shorthand',
      'scripts',
    ],
    openGraph: {
      type: 'article',
      publishedTime: publishedDate,
    },
    url: `${ROUTES.snippets}/${snippet.slug}`,
  })
}

const SnippetPage = async ({ params }: SnippetPageProps) => {
  const snippet = findSnippetBySlug(params?.slug)

  if (!snippet) return notFound()

  const { title, slug, description, date, readingTime } = snippet

  return (
    <>
      <ContentMeta
        title={title}
        description={description}
        timestamp={date}
        readingTime={readingTime}
        slug={slug}
      />
      <Container>
        <div className={cn('prose max-w-full', 'dark:prose-dark')}>
          <Mdx code={snippet?.body?.code} />
        </div>
        <Engagement slug={slug} />
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildJsonLd({
            title,
            description,
            headline: title,
            datePublished: date,
            dateModified: date,
            url: `${BASE_URL}/snippet/${snippet.slug}`,
          }),
        }}
        key="post-jsonld"
      />
    </>
  )
}

export default SnippetPage
