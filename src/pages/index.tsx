import type { NextPage } from 'next'

import Meta from '@/common/components/Meta'
import { Hero } from '@/modules/home/components'

const Home: NextPage = () => {
  return (
    <>
      <Meta />
      <Hero />
    </>
  )
}

export default Home
