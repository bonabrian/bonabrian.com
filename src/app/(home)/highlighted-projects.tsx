'use client'

import { allProjects, type Project } from 'contentlayer/generated'
import { m } from 'framer-motion'

import { Button, EmptyState } from '@/components/common'
import { ChevronRight } from '@/components/icons'
import Link from '@/components/link'
import ProjectCard from '@/components/project-card'
import { ROUTES } from '@/constants/links'
import cn from '@/lib/cn'

import Section from './section'

const getHighlightedProjects = (maxDisplay: number = 4) =>
  allProjects
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter((project: Project) => project.published && project.highlight)
    ?.slice(0, maxDisplay)

const HighlightedProjects = () => {
  const projects = getHighlightedProjects()

  return (
    <Section title="Projects" subtitle="Some Things I’ve Built.">
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
            <Link href={ROUTES.projects}>
              <Button variant="outline">
                See All Projects <ChevronRight />
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <EmptyState message="No highlighted projects found." />
      )}
    </Section>
  )
}

export default HighlightedProjects
