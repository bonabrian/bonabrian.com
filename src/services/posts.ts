import type { Post } from 'contentlayer/generated'
import { allPosts } from 'contentlayer/generated'

import { pick } from '@/utils'

export const getAllPosts = (fields: (keyof Post)[] = []): Array<Post> => {
  const filteredPosts = allPosts
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter(
      (it: Post) => it.title?.length > 0 && it.slug?.length > 0 && !it.draft,
    )

  return fields && fields.length
    ? filteredPosts.map((it: Post) => pick(it, fields))
    : filteredPosts
}

export const filterPosts = (
  posts: Array<Post> | undefined,
  query: string | undefined | null = null,
): Array<Post> => {
  if (!posts) return []

  const filteredPosts = !query
    ? posts
    : posts?.filter((post) => {
        const searchContent =
          // eslint-disable-next-line no-unsafe-optional-chaining
          post?.title + post?.excerpt + post?.tags?.join(' ')
        return searchContent.toLocaleLowerCase().includes(query.toLowerCase())
      })

  return filteredPosts
}

export const getRecentPosts = (maxDisplay: number = 2): Array<Post> => {
  const posts = getAllPosts([
    'title',
    'date',
    'slug',
    'excerpt',
    'tags',
    'readingTime',
    'draft',
    'hero',
    'heroMeta',
  ])

  if (!posts) return []

  return posts.slice(0, maxDisplay)
}
