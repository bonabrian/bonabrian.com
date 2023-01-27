import { pick } from 'contentlayer/client'
import type { Project } from 'contentlayer/generated'
import { allProjects } from 'contentlayer/generated'

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
