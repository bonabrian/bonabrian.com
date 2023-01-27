import { pick } from 'contentlayer/client'
import type { Post, Project } from 'contentlayer/generated'
import { allPosts, allProjects } from 'contentlayer/generated'

export const getProjects = (fields: (keyof Project)[] = []): Array<Project> => {
  const filteredProjects = allProjects
    .sort((a, b) => a.order - b.order)
    .filter(
      (it: Project) => it.title.length > 0 && it.slug.length > 0 && !it.draft,
    )

  return fields && fields.length
    ? filteredProjects.map((it: Project) => pick(it, fields))
    : filteredProjects
}

export const filterProjects = (
  projects: Array<Project> | undefined,
  filterKey: keyof Project,
  filterValue: string = '',
): Array<Project> => {
  if (!projects) return []

  const filteredProjects = !filterValue
    ? projects
    : projects?.filter((it: Project) => it[filterKey] === filterValue)

  return filteredProjects
}

export const getFeaturedProjects = (maxDisplay: number = 2): Array<Project> => {
  const projects = getProjects([
    'title',
    'description',
    'slug',
    'image',
    'imageMeta',
    'url',
    'category',
  ])

  if (!projects) return []

  const defaultFeaturedProjects = ['bonabrian', 'yummybros']

  return projects
    ?.filter((it: Project) => defaultFeaturedProjects.includes(it.slug))
    .slice(0, maxDisplay)
}

export const getPosts = (fields: (keyof Post)[] = []): Array<Post> => {
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
  const posts = getPosts([
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

  if (!posts) return []

  return posts.slice(0, maxDisplay)
}
