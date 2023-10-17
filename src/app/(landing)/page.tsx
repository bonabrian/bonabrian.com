import type { Metadata } from 'next'

import { Divider } from '@/components/ui'
import { seo } from '@/data/meta'

import HighlightedProjects from './components/highlighted-projects'
import Introductory from './components/introductory'
import RecentPosts from './components/recent-posts'

export const metadata: Metadata = seo({
  title: 'Full-stack Engineer',
  url: '/',
})

const HomePage = async () => {
  return (
    <>
      <Introductory />

      <HighlightedProjects />

      <Divider />

      <RecentPosts />
    </>
  )
}

export default HomePage
