'use client'

import type { Project } from 'contentlayer/generated'
import { m } from 'framer-motion'

import { Container, EmptyState } from '@/components/ui'
import cn from '@/lib/cn'

import ProjectCard from './project-card'

interface ProjectsProps {
  projects: Array<Project>
}

const animation = {
  hide: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
}

const Projects = ({ projects }: ProjectsProps) => {
  return (
    <Container>
      {projects.length ? (
        <div
          className={cn(
            'my-8 grid w-full auto-cols-fr grid-cols-1 gap-x-16 gap-y-8',
            'md:my-12 md:grid-cols-2',
          )}
        >
          {projects.map((project, index) => {
            return (
              <m.div
                key={project.slug}
                initial={animation.hide}
                animate={animation.show}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </m.div>
            )
          })}
        </div>
      ) : (
        <EmptyState message="No projects found." />
      )}
    </Container>
  )
}

export default Projects
