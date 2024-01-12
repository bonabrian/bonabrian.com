import type { Project } from 'contentlayer/generated'

import cn from '@/utils/cn'

import ProjectCard from './project-card'
import { EmptyState } from './ui'

interface ProjectsProps {
  projects: Project[]
}

const Projects = ({ projects }: ProjectsProps) => {
  return (
    <>
      {projects.length ? (
        <div
          className={cn(
            'my-8 grid w-full auto-cols-fr grid-cols-1 gap-8',
            'md:my-12 md:grid-cols-2',
          )}
        >
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState message="The projects are probably off having a party somewhere without us!" />
      )}
    </>
  )
}

export default Projects
