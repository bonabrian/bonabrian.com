import type { Metadata } from 'next'

import { Divider } from '@/components/common'
import HighlightedProjects from '@/components/highlighted-projects'
import Introductory from '@/components/introductory'
import RecentPosts from '@/components/recent-posts'
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
