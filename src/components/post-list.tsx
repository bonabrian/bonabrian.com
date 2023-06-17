'use client'

import cx from 'classnames'
import type { Post } from 'contentlayer/generated'
import { useMemo, useState } from 'react'

import Container from './container'
import { Search } from './icons'
import PostCard from './post-card'

interface PostListProps {
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

const PostList = ({ posts }: PostListProps) => {
  const [search, setSearch] = useState('')
  const filteredPosts = useMemo(() => {
    return filterPosts(posts, search)
  }, [posts, search])

  const renderSearchComponent = () => {
    return (
      <div className={cx('relative w-full flex items-center', 'md:max-w-lg')}>
        <input
          aria-label="Search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts"
          className={cx(
            'block w-full px-12 py-4 border bg-white text-sm border-slate-100 focus:border-primary-500 focus:ring-primary-500 rounded-full transition ease-in-out duration-200',
            'dark:border-gray-800 dark:bg-gray-900',
          )}
        />
        <Search className={cx('absolute text-gray-400 left-4 w-5 h-5')} />
      </div>
    )
  }

  return (
    <Container>
      <div>{renderSearchComponent()}</div>

      {filteredPosts.length ? (
        <div className={cx('flex flex-col gap-8 my-8', 'md:my-12')}>
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className={cx('text-center my-4', 'md:my-8')}>No posts.</p>
      )}
    </Container>
  )
}

export default PostList
