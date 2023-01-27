import { RiArrowRightSLine } from 'react-icons/ri'

import type { Project } from '@/types'

import CtaButton from './CtaButton'
import { ProjectCard } from './ProjectCard'

interface FeaturedProjectsProps {
  projects: Array<Project>
  title?: string
  subtitle?: string
  noDataText?: string
}

const FeaturedProjects = ({
  projects,
  title = 'Projects',
  subtitle = 'Some Things I’ve Built',
  noDataText = 'No featured projects found.',
}: FeaturedProjectsProps) => {
  return (
    <>
      <div className="flex flex-col">
        {title && (
          <span className="text-sm md:text-lg font-medium text-primary-500 md:mb-2">
            {title}
          </span>
        )}
        {subtitle && (
          <h2 className="text-lg sm:text-xl md:text-2xl tracking-tighter">
            {subtitle}
          </h2>
        )}
      </div>
      {projects.length ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 auto-cols-fr gap-x-16 gap-y-8 w-full py-8">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>

          <div className="flex justify-center items-center my-6">
            <CtaButton href="/projects">
              All Projects <RiArrowRightSLine className="ml-1" />
            </CtaButton>
          </div>
        </>
      ) : (
        <p className="text-center">{noDataText}</p>
      )}
    </>
  )
}

export default FeaturedProjects
