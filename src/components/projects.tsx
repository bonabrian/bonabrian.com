'use client'

import type { Project } from 'contentlayer/generated'
import { m } from 'framer-motion'
import { useMemo, useState } from 'react'

import cn from '@/lib/cn'

import ProjectCard from './project-card'
import { Container, EmptyState } from './ui'

interface ProjectsProps {
  projects: Array<Project>
}

const filterProjects = (
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

const animation = {
  hide: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
}

const Projects = ({ projects }: ProjectsProps) => {
  const [category, setCategory] = useState('')
  const filteredProjects = useMemo(() => {
    return filterProjects(projects, 'category', category)
  }, [projects, category])

  const categories = [
    { key: '', label: 'All' },
    { key: 'product', label: 'Products' },
    { key: 'personal', label: 'Personal' },
  ]

  const filter = (key: string) => {
    if (key === category) return
    setCategory(key)
  }

  const renderFilterComponent = () => {
    return (
      <div className={cn('flex justify-center items-center gap-4')}>
        {categories.map((it) => {
          return (
            <div
              key={it.key}
              className={cn(
                'px-4 py-1.5 rounded-md transition-all ease-in-out duration-150',
                it.key === category
                  ? 'cursor-default pointer-events-none bg-primary text-primary-foreground font-medium'
                  : 'cursor-pointer',
              )}
              onClick={() => filter(it.key)}
              role="button"
              tabIndex={-1}
            >
              {it.label}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Container>
      <div>{renderFilterComponent()}</div>
      {filteredProjects.length ? (
        <div
          className={cn(
            'grid grid-cols-1 auto-cols-fr gap-x-16 gap-y-8 w-full my-8',
            'md:grid-cols-2 md:my-12',
          )}
        >
          {filteredProjects.map((project, index) => {
            return (
              <m.div
                key={`${project.slug}.${category}}`}
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
