import type { Metadata } from 'next'

import { Divider } from '@/components/common'
import { getMetadata } from '@/lib/metadata'

import HighlightedProjects from './highlighted-projects'
import Introductory from './introductory'
import RecentPosts from './recent-posts'

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
