import type { Note } from 'contentlayer/generated'
import { allNotes } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

import ContentMeta from '@/app/(collections)/components/content-meta'
import Engagement from '@/app/(collections)/components/engagement'
import Mdx from '@/components/mdx'
import { Container } from '@/components/ui'
import { BASE_URL, ROUTES } from '@/data/app'
import { buildJsonLd, seo } from '@/data/meta'
import cn from '@/lib/cn'
import { formatDate } from '@/lib/utils'
import type { RequestContext } from '@/types/request'

interface NotePageProps extends RequestContext<{ slug?: string }> {}

const findNoteBySlug = (slug?: string): Note | undefined =>
  allNotes
    .filter((post: Note) => post.published)
    .find((post: Note) => post.slug === slug)

export const generateMetadata = async ({ params }: NotePageProps) => {
  const note = findNoteBySlug(params?.slug)

  if (!note) return

  const { title, description, date } = note
  const publishedDate = formatDate(date)

  return seo({
    title,
    description,
    keywords: [
      'note',
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
    url: `${ROUTES.notes}/${note.slug}`,
  })
}

const NotePage = async ({ params }: NotePageProps) => {
  const note = findNoteBySlug(params?.slug)

  if (!note) return notFound()

  const { title, slug, description, date, readingTime } = note

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
          <Mdx code={note?.body?.code} />
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
            url: `${BASE_URL}${ROUTES.notes}/${note.slug}`,
          }),
        }}
        key="post-jsonld"
      />
    </>
  )
}

export default NotePage
