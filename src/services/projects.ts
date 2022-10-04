import type { Project } from 'contentlayer/generated'
import { allProjects } from 'contentlayer/generated'

import { pick } from '@/utils'

export const getAllProjects = (
  fields: (keyof Project)[] = [],
): Array<Project> => {
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
  category: string | undefined | null = null,
): Array<Project> => {
  if (!projects) return []

  const filteredProjects = !category
    ? projects
    : projects?.filter((it: Project) => it.category === category)

  return filteredProjects
}

export const getFeaturedProjects = (maxDisplay: number = 2): Array<Project> => {
  const projects = getAllProjects([
    'title',
    'description',
    'slug',
    'hero',
    'heroMeta',
    'url',
    'category',
  ])

  if (!projects) return []

  const featured = ['yummybros', 'transaxi']

  return projects
    ?.filter((it: Project) => featured.includes(it.slug))
    .slice(0, maxDisplay)
}
