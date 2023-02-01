import classnames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import type { InferGetStaticPropsType } from 'next'
import { useMemo, useState } from 'react'

import PageHeader from '@/components/PageHeader'
import PageSeo from '@/components/PageSeo'
import { ProjectCard } from '@/components/ProjectCard'
import { filterProjects, getProjects } from '@/lib/contentlayer'

export const getStaticProps = async () => {
  const allProjects = getProjects([
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
      <div className="flex justify-center items-center gap-x-4">
        {categories.map((it) => {
          return (
            <div
              key={it.key}
              className={classnames(
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
      <div className="my-4 space-y-3 md:space-y-5">
        <PageHeader
          title="Projects"
          description="A collection of finest projects that I have built. ❤️️"
        />
        {renderFilterComponent()}
      </div>
      {filteredProjects.length ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 auto-cols-fr gap-x-16 gap-y-8 w-full py-8"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project) => {
              return <ProjectCard key={project.slug} project={project} />
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
        <p className="text-center">No projects found.</p>
      )}
    </>
  )
}

export default Projects
