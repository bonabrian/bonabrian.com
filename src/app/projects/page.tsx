import { allProjects } from 'contentlayer/generated'

import PageHeader from '@/components/page-header'
import Projects from '@/components/projects'
import { Container } from '@/components/ui'

const getProjects = () =>
  allProjects
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter((project) => project.published)

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
