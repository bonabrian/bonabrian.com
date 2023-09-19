import type { Snippet } from 'contentlayer/generated'
import { allSnippets } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

import { Container } from '@/components/common'
import Mdx from '@/components/mdx'
import Reactions from '@/components/reactions'
import ShareButton from '@/components/share-button'
import cn from '@/lib/cn'
import { getJsonLd, getMetadata } from '@/lib/metadata'
import { getBaseUrl } from '@/lib/utils'
import type { RequestContext } from '@/types/request'

import MetaHeader from './meta-header'

interface SnippetPageProps extends RequestContext<{ slug?: string }> {}

const findSnippetBySlug = (slug?: string): Snippet | undefined =>
  allSnippets
    .filter((post: Snippet) => post.published)
    .find((post: Snippet) => post.slug === slug)

export const generateMetadata = async ({ params }: SnippetPageProps) => {
  const snippet = findSnippetBySlug(params?.slug)

  if (!snippet) return

  const { title, description } = snippet

  return getMetadata({
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
  })
}

const SnippetPage = ({ params }: SnippetPageProps) => {
  const snippet = findSnippetBySlug(params?.slug)

  if (!snippet) return notFound()

  const { title, slug, description, date, readingTime } = snippet

  return (
    <>
      <MetaHeader
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
        <div
          className={cn('mt-16 flex mx-auto w-full max-w-sm', 'sm:max-w-md')}
        >
          <div
            className={cn(
              'relative flex justify-between items-center w-full gap-4 border p-4 rounded-lg border-accent',
            )}
          >
            <Reactions slug={slug} />
            <ShareButton slug={slug} />
          </div>
        </div>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getJsonLd({
            title,
            description,
            headline: title,
            datePublished: date,
            dateModified: date,
            url: `${getBaseUrl()}/snippet/${snippet.slug}`,
          }),
        }}
        key="post-jsonld"
      />
    </>
  )
}

export default SnippetPage
