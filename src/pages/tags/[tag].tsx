// import { getAllPosts } from '@/services/posts'

import { motion } from 'framer-motion'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import { useMemo, useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'

import { PageSeo } from '@/components/PageSeo'
import PageTitle from '@/components/PageTitle'
import { PostCard } from '@/components/PostCard'
import { filterPosts, getAllPosts } from '@/services/posts'
import { getAllTags } from '@/services/tags'
import { kebabCase } from '@/utils'

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = getAllTags()

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'excerpt',
    'tags',
    'readingTime',
    'draft',
    'image',
    'imageMeta',
  ])

  const tag = params?.tag as string

  const filteredPosts = allPosts.filter((post) =>
    post.tags?.map((t) => kebabCase(t)?.includes(tag)),
  )

  return { props: { posts: filteredPosts, tag } }
}

const Tag = ({
  posts,
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [search, setSearch] = useState('')
  const filteredPosts = useMemo(() => {
    return filterPosts(posts, search)
  }, [posts, search])

  const renderSearchComponent = () => {
    return (
      <>
        <div className="relative w-full">
          <input
            aria-label="Search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="block w-full px-10 py-2 text-gray-800 dark:text-gray-200 bg-transparent border border-gray-200 dark:border-gray-600 focus:border-primary-400 dark:focus:border-primary-600 focus:ring-primary-400 dark:focus:ring-primary-600 rounded-md transition ease-in-out duration-200"
          />
          <RiSearch2Line className="absolute w-5 h-5 text-gray-400 dark:text-gray-700 fill-current top-3 left-3" />
        </div>
        {(filteredPosts?.length || 0) <= 0 ? (
          <div className="flex items-center justify-center py-3">
            <h3 className="text-gray-400 dark:text-gray-300">
              No posts found.
            </h3>
          </div>
        ) : null}
      </>
    )
  }

  return (
    <>
      <PageSeo
        title={tag}
        description={`${tag} tags`}
        keywords={[
          'blog',
          'articles',
          'contents',
          'tags',
          'tag',
          'hashtags',
          'keyword',
        ]}
      />
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <PageTitle>{`#${tag}`}</PageTitle>
        {renderSearchComponent()}
      </div>
      <div className="flex flex-col">
        <div className="space-y-1 flex flex-col">
          {filteredPosts.map((post, index) => {
            return (
              <motion.div
                key={post.slug}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: index / 10 }}
              >
                <PostCard post={post} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Tag
