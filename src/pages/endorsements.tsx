import type { InferGetStaticPropsType } from 'next'
import { useSession } from 'next-auth/react'

import EndorsementsBadge from '@/components/EndorsementsBadge'
import LoginView from '@/components/LoginView'
import PageHeader from '@/components/PageHeader'
import PageSeo from '@/components/PageSeo'
import { useSkillCategories } from '@/hooks'
import getSkillCategories from '@/lib/getSkillCategories'

export const getStaticProps = async () => {
  const skillCategories = await getSkillCategories()

  return {
    props: {
      fallbackData: skillCategories,
    },
    revalidate: 60,
  }
}

const Endorsements = ({
  fallbackData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: session } = useSession()

  const { categories, error } = useSkillCategories({ fallbackData })

  return (
    <>
      <PageSeo
        title="Endorsements"
        description={"Endorse bonabrian's skill"}
        keywords={['skills', 'endorsements', 'programming']}
      />
      <div className="my-8 space-y-3 md:space-y-5">
        <PageHeader
          title="Endorsements"
          description="Since you're here, I invite you to give me endorsement(s) based on the experience you had with me in tech."
        />
      </div>
      <LoginView message="Login to give endorsements." />

      <div className="my-12">
        {categories && !error && (
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold leading-8 tracking-tight">
              Skills
            </h3>
            <div className="mt-8 space-y-8 divide-y divide-slate-200 dark:divide-gray-800">
              {categories.map((category) => (
                <div key={category.name}>
                  <h4 className="my-4 font-semibold leading-5 text-lg md:text-xl">
                    {category.name}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row auto-rows-auto gap-4">
                    {category?.skills?.map((skill) => (
                      <EndorsementsBadge
                        key={skill.id}
                        skill={skill}
                        user={session?.user}
                        currentUserId={session?.id}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Endorsements
