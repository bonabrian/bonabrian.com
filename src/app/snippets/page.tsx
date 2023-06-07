import cx from 'classnames'
import type { Snippet } from 'contentlayer/generated'
import { allSnippets } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { Suspense } from 'react'

import Container from '@/components/container'
import Link from '@/components/link'
import PageHeader from '@/components/page-header'
import { routes } from '@/lib/constants'
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
    <Suspense fallback={<div>Loading...</div>}>
      <PageHeader
        title="Snippets"
        description="A repository of previously utilized and saved code snippets which can be copied and pasted."
      />
      <div id="content">
        <Container>
          {snippets.length ? (
            <div
              className={cx(
                'grid grid-cols-1 grid-flow-row auto-rows-auto gap-4',
                'md:grid-cols-2',
                'lg:grid-cols-3',
              )}
            >
              {snippets.map(({ slug, title, description, date }) => {
                const timestamp = formatDate({
                  timestamp: date,
                })

                return (
                  <Link
                    key={slug}
                    href={`${routes.SNIPPETS}/${slug}`}
                    className={cx(
                      'flex flex-col justify-between border border-slate-100 rounded-2xl p-6',
                      'dark:border-gray-800',
                    )}
                  >
                    <h2
                      className={cx(
                        'font-semibold text-xl text-gray-700 mb-2',
                        'dark:text-slate-50',
                      )}
                    >
                      {title}
                    </h2>
                    <p
                      className={cx(
                        'mb-4 text-gray-600',
                        'dark:text-slate-200',
                      )}
                    >
                      {description}
                    </p>
                    <p
                      className={cx(
                        'text-xs text-gray-900/60',
                        'dark:text-slate-100/70',
                      )}
                      title={timestamp.raw}
                    >
                      {timestamp.formatted}
                    </p>
                  </Link>
                )
              })}
            </div>
          ) : (
            <p className={cx('text-center')}>No snippets.</p>
          )}
        </Container>
      </div>
    </Suspense>
  )
}

export default SnippetsPage
