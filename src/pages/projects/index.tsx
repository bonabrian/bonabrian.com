import { motion } from 'framer-motion'
import type { InferGetStaticPropsType } from 'next'
import { useMemo, useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'

import PageSeo from '@/components/PageSeo'
import PageTitle from '@/components/PageTitle'
import ProjectCard from '@/components/ProjectCard'
import RenderIf from '@/components/RenderIf'
import { filterProjects, getAllProjects } from '@/services/projects'

export const getStaticProps = async () => {
  const allProjects = getAllProjects([
    'title',
    'description',
    'slug',
    'hero',
    'heroMeta',
    'url',
  ])

  return {
    props: { projects: allProjects },
  }
}

const Projects = ({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [search, setSearch] = useState('')
  const filteredProjects = useMemo(() => {
    return filterProjects(projects, search)
  }, [projects, search])

  const renderSearchComponent = () => {
    return (
      <>
        <div className='relative w-full'>
          <input
            aria-label='Search'
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search'
            className='block w-full px-10 py-2 text-gray-800 dark:text-gray-200 bg-transparent border border-gray-200 dark:border-gray-600 focus:border-primary-400 dark:focus:border-primary-600 focus:ring-primary-400 dark:focus:ring-primary-600 rounded-md transition ease-in-out duration-200'
          />
          <RiSearch2Line className='absolute w-5 h-5 text-gray-400 dark:text-gray-700 fill-current top-3 left-3' />
        </div>
        <RenderIf isTrue={(filteredProjects?.length || 0) <= 0}>
          <div className='flex items-center justify-center py-3'>
            <h3 className='text-gray-400 dark:text-gray-300'>
              No projects found.
            </h3>
          </div>
        </RenderIf>
      </>
    )
  }

  return (
    <>
      <PageSeo
        title='Projects'
        description='A collection of finest projects that I have built.'
        keywords={[
          'project',
          'development',
          'app',
          'portfolio',
          'programming',
          'tech',
          'software',
        ]}
      />
      <div className='pt-6 pb-8 space-y-2 md:space-y-5'>
        <PageTitle>Projects</PageTitle>
        <p className='text-gray-600 dark:text-gray-400'>
          A collection of finest projects that I have built.
        </p>
        {renderSearchComponent()}
      </div>
      <div className='grid w-full grid-cols-1 gap-10 my-2 mt-4 sm:grid-cols-2'>
        {filteredProjects.map((project, index) => {
          return (
            <motion.div
              key={project.slug}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: index / 10 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          )
        })}
      </div>
    </>
  )
}

export default Projects
