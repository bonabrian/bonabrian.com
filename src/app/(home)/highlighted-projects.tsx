'use client'

import { allProjects } from 'contentlayer/generated'
import { m, useInView } from 'framer-motion'
import { useRef } from 'react'

import { ChevronRight } from '@/components/icons'
import ProjectCard from '@/components/project-card'
import { Button, EmptyState, Link } from '@/components/ui'
import { ROUTES } from '@/config/links'
import cn from '@/utils/cn'

const MAX_DISPLAY = 4

const getHighlightedProjects = (maxDisplay: number = MAX_DISPLAY) =>
  allProjects
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter((project) => project.published && project.highlight)
    ?.slice(0, maxDisplay)

const variants = {
  initial: {
    y: 40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
}

const HighlightedProjects = () => {
  const projectsRef = useRef<HTMLDivElement>(null)
  const projects = getHighlightedProjects()
  const isInView = useInView(projectsRef, { once: true, margin: '-100px' })

  return (
    <m.div
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={projectsRef}
      transition={{ duration: 0.5 }}
      className={cn('will-change-[transform, opacity]')}
    >
      <m.div
        className={cn('mb-4 flex flex-col')}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className={cn('font-cal font-bold text-primary')}>
          Highlighted Projects
        </h2>
        <p
          className={cn(
            'font-cal text-xl text-secondary-foreground',
            'md:text-2xl',
          )}
        >
          What I've been working on
        </p>
      </m.div>
      {projects.length ? (
        <>
          <m.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
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
        <EmptyState message="The projects are probably off having a party somewhere without us!." />
      )}
    </m.div>
  )
}

export default HighlightedProjects
