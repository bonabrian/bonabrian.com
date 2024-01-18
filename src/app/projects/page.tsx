import { allProjects } from 'contentlayer/generated'
import type { Metadata } from 'next'

import PageHeader from '@/components/page-header'
import Projects from '@/components/projects'
import { Container } from '@/components/ui'
import { ROUTES } from '@/config/links'
import { seo } from '@/lib/meta'

const getProjects = () =>
  allProjects
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter((project) => project.published)

export const metadata: Metadata = seo({
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
  url: ROUTES.projects,
})

const ProjectsPage = () => {
  const projects = getProjects()

  return (
    <>
      <PageHeader
        title="Projects"
        description="A collection of finest projects that I have built. ❤️️"
      />
      <Container>
        <Projects projects={projects} />
      </Container>
    </>
  )
}

export default ProjectsPage
