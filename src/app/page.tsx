import type { Post, Project } from 'contentlayer/generated'
import { allProjects } from 'contentlayer/generated'
import { allPosts } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { RiArrowRightSLine } from 'react-icons/ri'

import CallToAction from '@/components/call-to-action'
import Divider from '@/components/divider'
import Introduction from '@/components/introduction'
import PostCard from '@/components/post-card'
import ProjectCard from '@/components/project-card'
import Section from '@/components/section'
import { routes } from '@/lib/constants'
import { getMetadata } from '@/lib/metadata'

export const metadata: Metadata = getMetadata()

const getRecentPosts = (maxDisplay: number = 2) =>
  allPosts
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter((post: Post) => post.published)
    ?.slice(0, maxDisplay)

const getHighlightedProjects = (maxDisplay: number = 4) =>
  allProjects
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter((project: Project) => project.published && project.highlight)
    ?.slice(0, maxDisplay)

const HomePage = async () => {
  const projects = getHighlightedProjects()
  const posts = getRecentPosts()

  return (
    <>
      <Introduction />

      <Divider />

      <Section title="Projects" subtitle="Some Things I’ve Built">
        {projects.length ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 auto-cols-fr gap-x-16 gap-y-8 w-full py-8">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>

            <div className="flex justify-center items-center my-6">
              <CallToAction href={routes.PROJECTS}>
                All Projects <RiArrowRightSLine className="ml-1" />
              </CallToAction>
            </div>
          </>
        ) : (
          <p className="text-center">No featured projects found.</p>
        )}
      </Section>

      <Divider />

      <Section title="Writing" subtitle="Recent Posts">
        {posts.length ? (
          <>
            <div className="flex flex-col gap-8 py-8">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>

            <div className="flex justify-center items-center my-6">
              <CallToAction href={routes.BLOG}>
                All Posts <RiArrowRightSLine className="ml-1" />
              </CallToAction>
            </div>
          </>
        ) : (
          <p className="text-center">No recent posts.</p>
        )}
      </Section>
    </>
  )
}

export default HomePage
