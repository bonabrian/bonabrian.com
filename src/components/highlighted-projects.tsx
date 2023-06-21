'use client'

import { allProjects, type Project } from 'contentlayer/generated'
import { m } from 'framer-motion'

import cn from '@/lib/cn'
import { routes } from '@/lib/constants'

import Container from './container'
import { ChevronRight } from './icons'
import Link from './link'
import ProjectCard from './project-card'

const getHighlightedProjects = (maxDisplay: number = 4) =>
  allProjects
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter((project: Project) => project.published && project.highlight)
    ?.slice(0, maxDisplay)

const HighlightedProjects = () => {
  const projects = getHighlightedProjects()

  return (
    <div className={cn('mb-12')}>
      <Container>
        <h2 className={cn('text-primary-500 font-bold mb-2')}>Projects</h2>
        <p
          className={cn(
            'mb-4 font-bold text-gray-700 text-xl',
            'md:text-2xl',
            'dark:text-slate-50',
          )}
        >
          Some Things I’ve Built.
        </p>
        {projects.length ? (
          <>
            <m.div
              initial="hide"
              animate="show"
              transition={{ delayChildren: 0.5, staggerChildren: 0.015 }}
              className={cn(
                'grid grid-cols-1 auto-cols-fr gap-8 my-4',
                'md:grid-cols-2 md:my-8',
              )}
            >
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </m.div>
            <div className={cn('flex justify-center items-center my-4')}>
              <Link
                href={routes.PROJECTS}
                className={cn('button button--rounded button--shadow gap-1')}
              >
                See All Projects <ChevronRight />
              </Link>
            </div>
          </>
        ) : (
          <p className={cn('text-center')}>No highlighted projects found.</p>
        )}
      </Container>
    </div>
  )
}

export default HighlightedProjects
