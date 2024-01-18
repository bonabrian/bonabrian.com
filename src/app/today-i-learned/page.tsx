import { allTILs } from 'contentlayer/generated'
import type { Metadata } from 'next'

import PageHeader from '@/components/page-header'
import { Container } from '@/components/ui'
import { ROUTES } from '@/config/links'
import { seo } from '@/lib/meta'

import TodayILearned from './today-i-learned'

export const metadata: Metadata = seo({
  title: 'Today I Learned',
  description: 'Unleashing knowledge, one day at a time',
  url: ROUTES.todayILearned,
})

const learns = allTILs.sort(
  (a, b) => Number(new Date(b.date)) - Number(new Date(a.date)),
)

const TodayILearnedPage = () => {
  return (
    <>
      <PageHeader
        title="Today I Learned"
        description="Learn something new, every yay"
      />
      <Container>
        <TodayILearned learns={learns} />
      </Container>
    </>
  )
}

export default TodayILearnedPage
