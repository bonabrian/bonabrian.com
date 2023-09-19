import type { Snippet } from 'contentlayer/generated'
import { allSnippets } from 'contentlayer/generated'
import type { Metadata } from 'next'

import { Container, EmptyState, Link } from '@/components/common'
import PageHeader from '@/components/page-header'
import { ROUTES } from '@/constants/links'
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
                'grid grid-cols-1 grid-flow-row auto-rows-auto gap-4',
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
                      'flex flex-col justify-between rounded-md p-6 bg-card',
                    )}
                  >
                    <div className={cn('flex flex-col')}>
                      <h2
                        className={cn(
                          'font-semibold text-lg text-card-foreground mb-2',
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
