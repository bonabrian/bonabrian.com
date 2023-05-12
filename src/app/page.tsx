import type { Metadata } from 'next'

import Divider from '@/components/divider'
import FeaturedProjects from '@/components/featured-projects'
import Introduction from '@/components/introduction'
import RecentPosts from '@/components/recent-posts'
import { getFeaturedProjects, getRecentPosts } from '@/lib/contentlayer'
import { getMetadata } from '@/lib/metadata'

export const metadata: Metadata = getMetadata()

const Home = async () => {
  const featuredProjects = getFeaturedProjects()
  const recentPosts = getRecentPosts()

  return (
    <>
      <Introduction />

      <Divider />

      <FeaturedProjects projects={featuredProjects} />

      <Divider />

      <RecentPosts posts={recentPosts} />
    </>
  )
}

export default Home
