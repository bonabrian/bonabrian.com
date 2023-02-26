import type { InferGetStaticPropsType } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

import EndorsementsBadge from '@/components/endorsements-badge'
import Link from '@/components/link'
import { Metadata } from '@/components/metadata'
import PageHeader from '@/components/page-header'
import Spinner from '@/components/spinner'
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
  const [isLoading, setIsLoading] = useState(false)

  const onSignIn = async () => {
    setIsLoading(true)
    await signIn()
    setIsLoading(false)
  }

  return (
    <>
      <Metadata
        title="Endorsements"
        description="Endorse my technical skills and abilities based on your personal experience working with me."
        keywords={['skills', 'endorsements', 'programming']}
      />
      <div className="my-4 space-y-3 md:space-y-5">
        <PageHeader
          title="Endorsements"
          description="Please consider endorsing my technical skills and abilities based on your personal experience working with me. Your endorsement will be greatly appreciated."
        />
        {session?.user ? (
          <div className="mb-10 border-2 border-primary-500 rounded-md p-6 inline-flex flex-col items-start">
            <p>
              You are currently logged in as{' '}
              <strong>{session.user.name}</strong>
            </p>
            {isLoading ? (
              <Spinner />
            ) : (
              <Link
                href="/api/auth/signout"
                className="font-medium underline"
                onClick={async (e) => {
                  e.preventDefault()
                  setIsLoading(true)
                  await signOut()
                  setIsLoading(false)
                }}
              >
                Logout
              </Link>
            )}
          </div>
        ) : (
          <div className="mb-10 border-2 border-primary-500 rounded-md p-6 inline-flex flex-col items-start max-w-2xl">
            <h2 className="text-base font-bold mb-4">
              Please log in to provide your valuable endorsement.
            </h2>
            <button
              className="relative px-8 text-xs sm:text-sm overflow-hidden inline-flex uppercase font-semibold -tracking-tighter h-12 justify-center items-center outline-none transition duration-300 ease-in-out bg-transparent hover:[&:not(:disabled)]:bg-primary-500 hover:text-white disabled:cursor-not-allowed border-2 border-solid border-gray-900 dark:border-slate-100 rounded-full shadow-[4px_4px_rgb(0_0_0_/_20%)] dark:shadow-[4px_4px_rgb(163_163_163_/_20%)]"
              onClick={onSignIn}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : 'Login'}
            </button>
            <p className="text-sm mt-4 text-gray-900/50 dark:text-white/60">
              Your information, including your name and profile picture, will
              only be utilized for he purpose of properly displaying your
              identity as an endorser.
            </p>
          </div>
        )}
      </div>

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
                  <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row auto-rows-auto gap-4">
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
