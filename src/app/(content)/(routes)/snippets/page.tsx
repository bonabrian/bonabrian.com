import type { Snippet } from 'contentlayer/generated'
import { allSnippets } from 'contentlayer/generated'
import type { Metadata } from 'next'

import PageHeader from '@/components/page-header'
import { Container, EmptyState, Link } from '@/components/ui'
import { ROUTES } from '@/data/app'
import cn from '@/lib/cn'
import { getMetadata } from '@/lib/metadata'
import { formatDate } from '@/lib/utils'

const snippets = allSnippets
  .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
  .filter((snippet: Snippet) => snippet.published)

export const metadata: Metadata = getMetadata({
  title: 'Snippets',
  description: 'A collection of code snippets',
  keywords: [
    'snippets',
    'code',
    'collection',
    'tricks',
    'shorthand',
    'scripts',
  ],
})

const SnippetsPage = async () => {
  return (
    <>
      <PageHeader
        title="Snippets"
        description="A repository of previously utilized and saved code snippets which can be copied and pasted."
      />
      <div id="content">
        <Container>
          {snippets.length ? (
            <div
              className={cn(
                'grid grid-flow-row auto-rows-auto grid-cols-1 gap-4',
                'md:grid-cols-2',
                'lg:grid-cols-3',
              )}
            >
              {snippets.map(({ slug, title, description, date }) => {
                const timestamp = formatDate(date)

                return (
                  <Link
                    key={slug}
                    href={`${ROUTES.snippets}/${slug}`}
                    className={cn(
                      'flex flex-col justify-between rounded-md bg-card p-6',
                    )}
                  >
                    <div className={cn('flex flex-col')}>
                      <h2
                        className={cn(
                          'mb-2 text-lg font-semibold text-card-foreground',
                        )}
                      >
                        {title}
                      </h2>
                      <p className={cn('mb-4 text-muted-foreground')}>
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
            <EmptyState message="No snippets." />
          )}
        </Container>
      </div>
    </>
  )
}

export default SnippetsPage
