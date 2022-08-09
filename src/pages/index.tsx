import type { NextPage } from 'next'

import { PageMeta } from '@/common/components/Meta'
import { Hero } from '@/modules/home/components'

const Home: NextPage = () => {
  return (
    <>
      <PageMeta title='Home' />
      <Hero />
    </>
  )
}

export default Home
