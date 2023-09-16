import type { Metadata } from 'next'

import HighlightedProjects from '@/components/highlighted-projects'
import Introductory from '@/components/introductory'
import RecentPosts from '@/components/recent-posts'
import { Divider } from '@/components/ui'
import { getMetadata } from '@/lib/metadata'

export const metadata: Metadata = getMetadata()

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
