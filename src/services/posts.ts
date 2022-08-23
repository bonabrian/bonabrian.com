import type { Post } from 'contentlayer/generated'
import { allPosts } from 'contentlayer/generated'

type ConvertUndefined<T> = OrUndefined<{
  [K in keyof T as undefined extends T[K] ? K : never]-?: T[K]
}>
type OrUndefined<T> = { [K in keyof T]: T[K] | undefined }
type PickRequired<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K]
}
type ConvertPick<T> = ConvertUndefined<T> & PickRequired<T>

export const pick = <Obj, Keys extends keyof Obj>(
  obj: Obj,
  keys: Keys[],
): ConvertPick<{ [K in Keys]: Obj[K] }> => {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key] || null
    return acc
  }, {} as any)
}

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
