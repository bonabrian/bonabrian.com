import { AnimatePresence, motion } from 'framer-motion'
import type { InferGetStaticPropsType } from 'next'

import DiscoverMore from '@/components/DiscoverMore'
import Divider from '@/components/Divider'
import Link from '@/components/Link'
import PageSeo from '@/components/PageSeo'
import PostCard from '@/components/PostCard'
import ProjectCard from '@/components/ProjectCard'
import { getRecentPosts } from '@/services/posts'
import { getFeaturedProjects } from '@/services/projects'

const MAX_DISPLAY = 2

export const getStaticProps = async () => {
  const featuredProjects = getFeaturedProjects(MAX_DISPLAY)
  const recentPosts = getRecentPosts(MAX_DISPLAY)

  return {
    props: { featuredProjects, recentPosts },
  }
}

const Home = ({
  featuredProjects,
  recentPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <PageSeo
        keywords={[
          'bona',
          'bonabrian',
          'bonabriansiagian',
          'Bona Brian Siagian',
          'full-stack',
          'back-end',
          'front-end',
          'portfolio',
          'developer',
          'development',
        ]}
      />
      <div className='flex flex-col justify-evenly items-center w-full h-content sm:h-content-sm'>
        <div className='flex flex-col'>
          <h1 className='my-5 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            Hi, I&apos;m{' '}
            <span className='text-primary-500 dark:text-primary-500'>
              Bona Brian Siagian
            </span>{' '}
            <span className='block'>Full Stack Developer</span>
          </h1>
          <div className='text-base sm:text-xl'>
            <p>
              I like to build interactive things with code. I also talk and
              write about those things.
            </p>
          </div>
        </div>
        <DiscoverMore label='know more about me' href='/about' />
      </div>

      <div className='flex justify-between items-center my-4 sm:my-8'>
        <h2 className='text-xl font-extrabold leading-5 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-7 md:text-3xl md:leading-9'>
          Featured Projects
        </h2>
        <Link
          href='/projects'
          className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold'
        >
          All Projects →
        </Link>
      </div>
      {featuredProjects.length === 0 ? (
        <div className='flex items-center justify-center py-3'>
          <p className='text-gray-400 dark:text-gray-300'>
            No featured projects found.
          </p>
        </div>
      ) : (
        <motion.div className='grid w-full grid-cols-1 gap-4 py-8 sm:grid-cols-2'>
          <AnimatePresence>
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <Divider />

      <div className='flex justify-between items-center my-4 sm:my-8'>
        <h2 className='text-xl font-extrabold leading-5 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-7 md:text-3xl md:leading-9'>
          Recent Posts
        </h2>
        <Link
          href='/blog'
          className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold'
        >
          All Posts →
        </Link>
      </div>
      {recentPosts.length === 0 ? (
        <div className='flex items-center justify-center py-3'>
          <p className='text-gray-400 dark:text-gray-300'>No posts found.</p>
        </div>
      ) : (
        <div className='flex flex-col'>
          <div className='space-y-1 flex flex-col'>
            {recentPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: index / 10 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Home
