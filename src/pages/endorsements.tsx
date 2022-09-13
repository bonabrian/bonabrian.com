import type { InferGetStaticPropsType } from 'next'

import PageSeo from '@/components/PageSeo'
import PageTitle from '@/components/PageTitle'
import Skills from '@/components/Skills'
import { getGroupedSkillsByCategory } from '@/services/skills'

export const getStaticProps = async () => {
  const skills = await getGroupedSkillsByCategory()

  return {
    props: {
      fallbackData: skills,
    },
    revalidate: 60,
  }
}

const Endorsements = ({
  fallbackData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <PageSeo
        title={'Endorsements'}
        description={"Endorse bonabrian's skill"}
        keywords={['skills', 'endorsements', 'programming']}
      />
      <div className='flex flex-col items-start justify-center max-w-2xl pt-6 pb-8 space-y-2 md:space-y-5'>
        <PageTitle>Endorsements</PageTitle>
        <p className='text-lg leading-7 text-gray-500 dark:text-gray-400 xl:text-xl'>
          Since you&apos;re here, I invite you to give me endorsement(s) based
          on the experience you had with me in tech.
        </p>
      </div>
      <Skills fallbackData={fallbackData} />
    </>
  )
}

export default Endorsements
