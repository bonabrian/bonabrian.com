import type { InferGetStaticPropsType } from 'next'

import Link from '@/components/link'
import { Metadata } from '@/components/metadata'
import PageHeader from '@/components/page-header'
import { routePaths } from '@/data'
import { getSnippets } from '@/lib/contentlayer'
import { formatDate } from '@/lib/utils'

export const getStaticProps = async () => {
  const allSnippets = getSnippets(['title', 'description', 'slug', 'date'])

  return {
    props: { snippets: allSnippets },
  }
}

const Snippets = ({
  snippets,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Metadata
        title="Snippets"
        description="A collection of code snippets"
        keywords={[
          'snippet',
          'code',
          'collection',
          'tricks',
          'shorthand',
          'scripts',
        ]}
      />
      <div className="my-4 space-y-3 md:space-y-5">
        <PageHeader
          title="Snippets"
          description="A repository of previously utilized and saved code snippets which can be copied and pasted."
        />
      </div>
      {snippets.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row auto-rows-auto gap-4">
          {snippets.map(({ slug, title, description, date }) => {
            const lastUpdated = formatDate({ timestamp: date, month: 'short' })
            return (
              <Link
                key={slug}
                href={`${routePaths.SNIPPETS}/${slug}`}
                className="flex flex-col justify-between border-2 border-solid border-gray-900 dark:border-slate-100 rounded-2xl p-4 w-full hover:border-primary-500 dark:hover:border-primary-500 transition-all"
              >
                <h3 className="font-bold mb-1 text-base sm:text-lg">{title}</h3>
                <p className="text-base">{description}</p>
                <p
                  className="mt-4 text-sm text-gray-900/50 dark:text-white/60 text-right"
                  title={lastUpdated.raw}
                >
                  {lastUpdated.formatted}
                </p>
              </Link>
            )
          })}
        </div>
      ) : (
        <p className="text-center">No snippets.</p>
      )}
    </>
  )
}

export default Snippets
