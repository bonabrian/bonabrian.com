'use client'

import type { Post } from 'contentlayer/generated'
import { useMemo, useState } from 'react'

import cn from '@/lib/cn'

import { Search } from './icons'
import PostCard from './post-card'
import { Container, EmptyState, Input } from './ui'

interface PostsProps {
  posts: Array<Post>
}

const filterPosts = (
  posts: Array<Post> | undefined,
  query: string | undefined | null = null,
): Array<Post> => {
  if (!posts) return []

  const filteredPosts = !query
    ? posts
    : posts?.filter((post) => {
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
      <div className={cn('relative')}>
        <Input
          aria-label="Search posts"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts"
          className="pl-12"
        />
        <Search
          className={cn('absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5')}
        />
      </div>
    )
  }

  return (
    <Container>
      {renderSearchComponent()}
      {filteredPosts.length ? (
        <div className={cn('flex flex-col gap-8 my-8', 'md:my-12')}>
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState
          message={`No posts for "${search}". Try searching another keyword.`}
        />
      )}
    </Container>
  )
}

export default Posts
