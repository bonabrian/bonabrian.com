import type { InferGetStaticPropsType } from 'next'

import Link from '@/components/Link'
import PageSeo from '@/components/PageSeo'
import PageTitle from '@/components/PageTitle'
import RenderIf from '@/components/RenderIf'
import { getAllSnippets } from '@/services/snippets'

export const getStaticProps = async () => {
  const allSnippets = getAllSnippets(['title', 'description', 'slug'])

  return {
    props: { snippets: allSnippets },
  }
}

const Snippets = ({
  snippets,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <PageSeo
        title='Snippets'
        description='A collection of code snippets'
        keywords={[
          'snippet',
          'code',
          'collection',
          'tricks',
          'shorthand',
          'scripts',
        ]}
      />
      <div className='pt-6 pb-8 space-y-2 md:space-y-5'>
        <PageTitle>Code Snippets</PageTitle>
        <p className='text-gray-600 dark:text-gray-400'>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          These are a collection of code snippets I've used in the past and
          saved.
        </p>
        <RenderIf isTrue={(snippets?.length || 0) <= 0}>
          <div className='flex items-center justify-center py-3'>
            <h3 className='text-gray-400 dark:text-gray-300'>
              No snippets found.
            </h3>
          </div>
        </RenderIf>
      </div>
      <div className='grid w-full grid-cols-1 gap-4 my-2 mt-4 sm:grid-cols-2'>
        {snippets.map(({ slug, title, description }) => {
          return (
            <Link
              key={slug}
              href={`/snippets/${slug}`}
              className='border border-grey-200 dark:border-gray-800 rounded p-4 w-full hover:border-primary-400 dark:hover:border-primary-500 hover:scale-105 transition-all'
            >
              <h3 className='text-lg font-bold text-left'>{title}</h3>
              <p className='mt-1 text-gray-500 dark:text-gray-400'>
                {description}
              </p>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default Snippets
