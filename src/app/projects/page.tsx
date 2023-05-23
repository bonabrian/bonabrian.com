import type { Project } from 'contentlayer/generated'
import { allProjects } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { Suspense } from 'react'

import ProjectList from '@/components/project-list'
import { getMetadata } from '@/lib/metadata'

const projects = allProjects
  .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
  .filter((project: Project) => project.published)

export const metadata: Metadata = getMetadata({
  title: 'Projects',
  description: 'A collection of finest projects that I have built.',
  keywords: [
    'projects',
    'development',
    'app',
    'portfolio',
    'programming',
    'tech',
    'software',
  ],
})

const ProjectsPage = async () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectList projects={projects} />
    </Suspense>
  )
}

export default ProjectsPage
