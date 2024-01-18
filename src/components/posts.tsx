'use client'

import type { Post } from 'contentlayer/generated'
import { useMemo, useState } from 'react'

import cn from '@/utils/cn'

import { Search } from './icons'
import PostCard from './post-card'
import { EmptyState, Input } from './ui'

interface PostsProps {
  posts: Post[]
}

const filterPosts = (
  posts: Post[] | undefined,
  query: string | undefined | null = null,
): Post[] => {
  if (!posts) return []

  const filteredPosts = !query
    ? posts
    : posts.filter((post) => {
        const searchContent =
          post?.title + post?.excerpt + post?.tags?.join(' ')

        return searchContent.toLocaleLowerCase().includes(query.toLowerCase())
      })

  return filteredPosts
}

const Posts = ({ posts }: PostsProps) => {
  const [search, setSearch] = useState('')

  const filteredPosts = useMemo(() => {
    return filterPosts(posts, search)
  }, [posts, search])

  const renderSearchComponent = () => {
    return (
      <div className={cn('relative flex-1')}>
        <Input
          aria-label="Search posts"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts"
          className="pl-12"
        />
        <Search
          className={cn('absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2')}
        />
      </div>
    )
  }

  return (
    <>
      {renderSearchComponent()}
      {filteredPosts.length ? (
        <div
          className={cn(
            'my-8 grid grid-cols-1 gap-8',
            'md:my-12 md:grid-cols-2',
          )}
        >
          {filteredPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState
          message={
            search
              ? `No posts for "${search}" Perhaps the little guy is too busy running in the wheel of code.`
              : "The posts are playing hide and seek – we just can't find them!"
          }
        />
      )}
    </>
  )
}

export default Posts
