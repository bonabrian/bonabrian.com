import type { Project } from 'contentlayer/generated'
import { allProjects } from 'contentlayer/generated'

import { pick } from '@/utils/object'

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
