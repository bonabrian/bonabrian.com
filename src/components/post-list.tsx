'use client'

import type { Post } from 'contentlayer/generated'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'

import { filterPosts } from '@/lib/contentlayer'

import PageHeader from './page-header'
import PostCard from './post-card'

interface PostListProps {
  title: string
  description?: string
  posts: Array<Post>
}

const PostList = ({ title, description, posts }: PostListProps) => {
  const [search, setSearch] = useState('')
  const filteredPosts = useMemo(() => {
    return filterPosts(posts, search)
  }, [posts, search])

  const renderSearchComponent = () => {
    return (
      <div className="relative w-full flex items-center md:max-w-md">
        <input
          aria-label="Search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts"
          className="block w-full px-10 py-2 bg-slate-200 dark:bg-gray-800 border border-transparent focus:border-primary-500 focus:ring-primary-500 rounded-full transition ease-in-out duration-200"
        />
        <RiSearch2Line className="absolute w-5 h-5 text-gray-400 dark:text-gray-500 fill-current top-3 left-3" />
      </div>
    )
  }

  return (
    <>
      <div className="my-4 space-y-3 md:space-y-5">
        <PageHeader title={title} description={description} />
        {renderSearchComponent()}
      </div>
      {filteredPosts.length ? (
        <div className="flex flex-col gap-8 py-8">
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
      ) : (
        <p className="text-center">No posts.</p>
      )}
    </>
  )
}

export default PostList
