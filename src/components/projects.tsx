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
            'grid grid-cols-1 auto-cols-fr gap-x-16 gap-y-8 w-full my-8',
            'md:grid-cols-2 md:my-12',
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
