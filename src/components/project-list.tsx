'use client'

import cx from 'classnames'
import type { Project } from 'contentlayer/generated'
import { useMemo, useState } from 'react'

import Container from './container'
import ProjectCard from './project-card'

interface ProjectListProps {
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

const ProjectList = ({ projects }: ProjectListProps) => {
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
      <div className={cx('flex justify-center items-center gap-x-4')}>
        {categories.map((it) => {
          return (
            <div
              key={it.key}
              className={cx(
                'px-5 py-2 rounded-full hover:font-medium transition-all ease-in-out duration-100',
                it.key === category
                  ? 'cursor-default text-white bg-primary-500 pointer-events-none'
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
          className={cx(
            'grid grid-cols-1 auto-cols-fr gap-x-16 gap-y-8 w-full my-8',
            'md:grid-cols-2 md:my-12',
          )}
        >
          {filteredProjects.map((project) => {
            return <ProjectCard key={project.slug} project={project} />
          })}
        </div>
      ) : (
        <p className={cx('text-center py-8')}>No projects found.</p>
      )}
    </Container>
  )
}

export default ProjectList
