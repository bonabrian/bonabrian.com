import Image from 'next/image'
import { RiFileTextLine } from 'react-icons/ri'

import CallToAction from '@/components/call-to-action'
import Divider from '@/components/divider'
import Link from '@/components/link'
import PageHeader from '@/components/PageHeader'
import PageSeo from '@/components/PageSeo'
import { experiences, siteMetadata } from '@/data'
import { formatDate } from '@/lib/utils'

const Resume = () => {
  const lastUpdated = formatDate({
    timestamp: '2023-02-03T15:06:00.000Z',
    locale: siteMetadata.locale,
  })

  return (
    <>
      <PageSeo
        title="Resume"
        description="Check out how my journey have been like over the years"
        keywords={['resume', 'biography', 'cv']}
      />
      <div className="my-4 flex flex-col items-start sm:flex-row sm:items-center justify-between">
        <PageHeader
          title="Resume"
          description="A brief overview of my professional journey and career milestones."
        />
        <CallToAction href="/resume/download">
          <RiFileTextLine className="mr-1" /> Download Resume
        </CallToAction>
      </div>
      <div className="py-8 px-4 prose dark:prose-dark max-w-none">
        <ol className="relative border-l-2 border-primary-500 list-none">
          {experiences.map(
            ({ organization, role, date, stacks, accomplishments }) => (
              <li key={organization.name} className="ml-3 sm:ml-6">
                <div className="absolute mt-0 -left-4 w-8 h-8 flex justify-center items-center rounded-full ring-4 ring-primary-500">
                  <Image
                    src={organization.logo}
                    alt={organization.name}
                    fill
                    className="rounded-full my-0"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-1 gap-2">
                  <h3 className="text-lg my-0">
                    <Link
                      href={organization.url}
                      className="no-underline font-bold tracking-tight"
                      showExternalLinkIcon={false}
                    >
                      {organization.name}
                    </Link>
                    <span className="before:content-['_-_'] font-normal text-gray-900/60 dark:text-white/60">
                      {role}
                    </span>
                  </h3>
                  <p className="my-0 text-gray-900/60 dark:text-white/60 text-sm">
                    {date}
                  </p>
                </div>
                <div className="flex flex-row flex-wrap gap-2 my-4">
                  {stacks.map(({ name, backgroundColor }) => (
                    <span
                      key={name}
                      className="text-sm font-medium px-2 py-0.5 rounded-xl text-gray-800"
                      style={{ backgroundColor }}
                    >
                      {name}
                    </span>
                  ))}
                </div>
                <ul>
                  {accomplishments.map((accomplishment) => (
                    <li key={accomplishment} className="my-1">
                      <span className="text-base">{accomplishment}</span>
                    </li>
                  ))}
                </ul>
                <Divider />
              </li>
            ),
          )}
        </ol>
        <div className="mt-16">
          <p className="text-gray-900/60 dark:text-white/60">
            Last updated at{' '}
            <time dateTime={lastUpdated.raw}>{lastUpdated.formatted}</time>
          </p>
        </div>
      </div>
    </>
  )
}

export default Resume
