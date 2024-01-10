'use client'

import { allProjects, type Project } from 'contentlayer/generated'
import { m } from 'framer-motion'

import { ChevronRight } from '@/components/icons'
import ProjectCard from '@/components/project-card'
import { Button, EmptyState, Link } from '@/components/ui'
import { ROUTES } from '@/data/app'
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
    <Section title="Projects" subtitle="What I've been working on">
      {projects.length ? (
        <>
          <m.div
            initial="hide"
            animate="show"
            transition={{ delayChildren: 0.5, staggerChildren: 0.015 }}
            className={cn(
              'my-4 grid auto-cols-fr grid-cols-1 gap-8',
              'md:my-8 md:grid-cols-2',
            )}
          >
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </m.div>
          <div className={cn('my-4 flex items-center justify-center')}>
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
