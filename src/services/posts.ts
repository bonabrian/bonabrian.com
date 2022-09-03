import type { Post } from 'contentlayer/generated'
import { allPosts } from 'contentlayer/generated'

import { pick } from '@/utils/object'

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
          post?.title + post?.excerpt + post?.tags?.join(' ')
        return searchContent.toLocaleLowerCase().includes(query.toLowerCase())
      })

  return filteredPosts
}
