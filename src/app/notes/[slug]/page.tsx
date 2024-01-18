import type { Note } from 'contentlayer/generated'
import { allNotes } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

import Engagements from '@/components/engagements'
import Mdx from '@/components/mdx'
import { Container } from '@/components/ui'
import { ROUTES } from '@/config/links'
import { BASE_URL } from '@/config/site'
import { buildJsonLd, seo } from '@/lib/meta'
import type { RequestContext } from '@/types/request'
import cn from '@/utils/cn'
import { formatDate } from '@/utils/date'

import Header from './header'

interface NotePageProps extends RequestContext<{ slug?: string }> {}

const findNoteBySlug = (slug?: string): Note | undefined =>
  allNotes.filter((note) => note.published).find((note) => note.slug === slug)

export const generateMetadata = async ({ params }: NotePageProps) => {
  const note = findNoteBySlug(params?.slug)

  if (!note) return

  const { title, slug, description, date } = note
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
    date: publishedDate,
    openGraph: {
      type: 'article',
      publishedTime: publishedDate,
    },
    url: `${ROUTES.notes}/${slug}`,
  })
}

const NotePage = async ({ params }: NotePageProps) => {
  const note = findNoteBySlug(params?.slug)

  if (!note) return notFound()

  const { title, slug, description, date, body } = note

  const publishedDate = formatDate(date)

  return (
    <>
      <Header
        title={title}
        slug={slug}
        description={description}
        date={publishedDate}
      />
      <Container>
        <div className={cn('my-4', 'md:my-8')}>
          <Mdx code={body?.code} />
        </div>
        <Engagements slug={slug} />
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
            url: `${BASE_URL}${ROUTES.notes}/${slug}`,
          }),
        }}
        key="note-jsonld"
      />
    </>
  )
}

export default NotePage
