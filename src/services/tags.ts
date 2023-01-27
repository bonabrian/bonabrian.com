import { kebabCase } from '@/utils'

import { getAllPosts } from './posts'

export const getAllTags = () => {
  const allPosts = getAllPosts(['tags'])

  const tagsCount: Record<string, number> = {}

  allPosts.forEach((post) => {
    const { tags } = post
    if (tags) {
      tags.forEach((tag: string) => {
        const formattedTag = kebabCase(tag)
        if (formattedTag) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          formattedTag in tagsCount
            ? (tagsCount[formattedTag] += 1)
            : (tagsCount[formattedTag] = 1)
        }
      })
    }
  })

  return tagsCount
}
