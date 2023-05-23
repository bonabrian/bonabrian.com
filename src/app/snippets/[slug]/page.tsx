import type { Snippet } from 'contentlayer/generated'
import { allSnippets } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

import ContentHeader from '@/components/content-header'
import Divider from '@/components/divider'
import Mdx from '@/components/mdx'
import Reactions from '@/components/reactions'
import ScrollProgressBar from '@/components/scroll-progress-bar'
import { getJsonLd, getMetadata } from '@/lib/metadata'
import { getBaseUrl } from '@/lib/utils'

const findSnippetBySlug = (slug: string): Snippet | undefined =>
  allSnippets
    .filter((post: Snippet) => post.published)
    .find((post: Snippet) => post.slug === slug)

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const snippet = findSnippetBySlug(params.slug)

  if (!snippet) return

  return getMetadata({
    title: snippet.title,
    description: snippet.description,
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

const SnippetPage = ({ params }: { params: { slug: string } }) => {
  const snippet = findSnippetBySlug(params.slug)

  if (!snippet) return notFound()

  const { title, slug, description, date, readingTime } = snippet

  return (
    <>
      <ScrollProgressBar />
      <div className="flex flex-col">
        <article className="article">
          <ContentHeader
            title={title}
            slug={slug}
            description={description}
            date={date}
            readingTime={readingTime}
          />
          <div className="prose dark:prose-dark max-w-none">
            <Mdx code={snippet?.body?.code} />
          </div>
          <div className="flex justify-between items-center my-4">
            <Reactions slug={slug} />
          </div>
          <Divider />
        </article>
      </div>
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
