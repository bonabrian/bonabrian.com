import { allNotes } from 'contentlayer/generated'
import type { Metadata } from 'next'

import PageHeader from '@/components/page-header'
import { Container, EmptyState, Link } from '@/components/ui'
import { ROUTES } from '@/config/links'
import { seo } from '@/lib/meta'
import cn from '@/utils/cn'
import { formatDate } from '@/utils/date'

const getNotes = () =>
  allNotes
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter((note) => note.published)

export const metadata: Metadata = seo({
  title: 'Notes',
  description:
    'A collection of my personal brief notes, tips, short form posts, or snippets I use throughout my projects.',
  keywords: [
    'notes',
    'snippets',
    'code',
    'collection',
    'tricks',
    'shorthand',
    'scripts',
  ],
  url: ROUTES.notes,
})

const NotesPage = () => {
  const notes = getNotes()

  return (
    <>
      <PageHeader
        title="Notes"
        description="A collection of my personal brief notes, tips, short form posts, or snippets I use throughout my projects."
      />
      <Container>
        {notes.length ? (
          <div
            className={cn(
              'grid grid-flow-row auto-rows-auto grid-cols-1 gap-4',
              'md:grid-cols-2',
              'lg:grid-cols-3',
            )}
          >
            {notes.map(({ _id, slug, title, description, date }) => {
              const timestamp = formatDate(date)

              return (
                <Link
                  key={_id}
                  href={`${ROUTES.notes}/${slug}`}
                  className={cn(
                    'group flex flex-col justify-between rounded-xl bg-card p-4 shadow-border',
                  )}
                >
                  <div className={cn('mb-4 flex flex-col')}>
                    <h2
                      className={cn(
                        'font-cal text-lg font-bold text-card-foreground transition-transform duration-200 ease-out',
                        'group-hover:translate-x-0.5',
                        'md:text-xl',
                      )}
                    >
                      {title}
                    </h2>
                    <p className={cn('mt-2 text-muted-foreground')}>
                      {description}
                    </p>
                  </div>
                  <p
                    className={cn('text-sm text-muted-foreground')}
                    title={timestamp}
                  >
                    {timestamp}
                  </p>
                </Link>
              )
            })}
          </div>
        ) : (
          <EmptyState message="Empty notes." />
        )}
      </Container>
    </>
  )
}

export default NotesPage
