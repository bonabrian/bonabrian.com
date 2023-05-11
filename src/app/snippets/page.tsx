import type { Metadata } from 'next'
import { Suspense } from 'react'

import Link from '@/components/link'
import PageHeader from '@/components/page-header'
import { routes } from '@/lib/constants'
import { getSnippets } from '@/lib/contentlayer'
import { getMetadata } from '@/lib/metadata'
import { formatDate } from '@/lib/utils'

const snippets = getSnippets(['title', 'description', 'slug', 'date'])

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
      <div className="my-4 space-y-3 md:space-y-5">
        <PageHeader
          title="Snippets"
          description="A repository of previously utilized and saved code snippets which can be copied and pasted."
        />
        {snippets.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row auto-rows-auto gap-4">
            {snippets.map(({ slug, title, description, date }) => {
              const timestamp = formatDate({ timestamp: date, month: 'short' })
              return (
                <Link
                  key={slug}
                  href={`${routes.SNIPPETS}/${slug}`}
                  className="flex flex-col justify-between border-2 border-solid border-gray-900 dark:border-slate-100 rounded-2xl p-4 w-full hover:border-primary-500 dark:hover:border-primary-500 transition-all"
                >
                  <h3 className="font-bold mb-1 text-base sm:text-lg">
                    {title}
                  </h3>
                  <p className="text-base">{description}</p>
                  <p
                    className="mt-4 text-sm text-gray-900/50 dark:text-white/60 text-right"
                    title={timestamp.raw}
                  >
                    {timestamp.formatted}
                  </p>
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="text-center">No snippets.</p>
        )}
      </div>
    </Suspense>
  )
}

export default SnippetsPage
