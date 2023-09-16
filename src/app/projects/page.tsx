import type { Project } from 'contentlayer/generated'
import { allProjects } from 'contentlayer/generated'
import type { Metadata } from 'next'

import PageHeader from '@/components/page-header'
import Projects from '@/components/projects'
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
    <>
      <PageHeader
        title="Projects"
        description="A collection of finest projects that I have built. ❤️️"
      />

      <div id="content">
        <Projects projects={projects} />
      </div>
    </>
  )
}

export default ProjectsPage
