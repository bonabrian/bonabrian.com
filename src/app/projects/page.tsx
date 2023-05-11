import type { Metadata } from 'next'
import { Suspense } from 'react'

import ProjectList from '@/components/project-list'
import { getProjects } from '@/lib/contentlayer'
import { getMetadata } from '@/lib/metadata'

const projects = getProjects([
  'title',
  'description',
  'slug',
  'image',
  'imageMeta',
  'url',
  'category',
])

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

const Projects = async () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectList projects={projects} />
    </Suspense>
  )
}

export default Projects
