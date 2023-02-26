import type { InferGetStaticPropsType } from 'next'

import Divider from '@/components/divider'
import FeaturedProjects from '@/components/featured-projects'
import Introduction from '@/components/introduction'
import PageSeo from '@/components/page-seo'
import RecentPosts from '@/components/recent-posts'
import { getFeaturedProjects, getRecentPosts } from '@/lib/contentlayer'

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

      <Introduction />

      <Divider />

      <FeaturedProjects projects={featuredProjects} />

      <Divider />

      <RecentPosts posts={recentPosts} />
    </>
  )
}

export default Home
