import type { Metadata } from 'next'

import { Divider } from '@/components/ui'
import { getMetadata } from '@/lib/metadata'

import HighlightedProjects from './_components/highlighted-projects'
import Introductory from './_components/introductory'
import RecentPosts from './_components/recent-posts'

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
