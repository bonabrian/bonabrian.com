import { AnimatePresence, motion } from 'framer-motion'
import type { InferGetStaticPropsType } from 'next'
import { useMemo, useState } from 'react'

import PageSeo from '@/components/PageSeo'
import PageTitle from '@/components/PageTitle'
import { ProjectCard } from '@/components/ProjectCard'
import RenderIf from '@/components/RenderIf'
import { filterProjects, getAllProjects } from '@/services/projects'

export const getStaticProps = async () => {
  const allProjects = getAllProjects([
    'title',
    'description',
    'slug',
    'image',
    'imageMeta',
    'url',
    'category',
  ])

  return {
    props: { projects: allProjects },
  }
}

const Projects = ({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [category, setCategory] = useState('')

  const filteredProjects = useMemo(() => {
    return filterProjects(projects, category)
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
      <>
        <div className="flex justify-center items-center space-x-4">
          {categories.map((it) => {
            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <div
                className={`px-5 py-2 rounded-full select-none ${
                  it.key === category
                    ? 'cursor-default text-white bg-primary-400 dark:bg-primary-600'
                    : 'cursor-pointer'
                }`}
                key={it.key}
                onClick={() => filter(it.key)}
                role="button"
                tabIndex={-1}
              >
                {it.label}
              </div>
            )
          })}
        </div>
        <RenderIf isTrue={(filteredProjects?.length || 0) <= 0}>
          <div className="flex items-center justify-center py-3">
            <h3 className="text-gray-400 dark:text-gray-300">
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
        title="Projects"
        description="A collection of finest projects that I have built."
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
      <div className="pt-6 pb-8 space-y-3 md:space-y-5">
        <PageTitle>Projects</PageTitle>
        <p className="text-gray-600 dark:text-gray-400">
          A collection of finest projects that I have built.
        </p>
        {renderFilterComponent()}
      </div>
      <motion.div
        className="grid w-full grid-cols-1 gap-4 my-2 mt-4 sm:grid-cols-2"
        layout
      >
        <AnimatePresence>
          {filteredProjects.map((project) => {
            return <ProjectCard key={project.slug} project={project} />
          })}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

export default Projects
