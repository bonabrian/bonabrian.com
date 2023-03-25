import Image from 'next/image'
import { RiFileTextLine } from 'react-icons/ri'

import CallToAction from '@/components/call-to-action'
import Divider from '@/components/divider'
import Link from '@/components/link'
import { Metadata } from '@/components/metadata'
import PageHeader from '@/components/page-header'
import { formatDate } from '@/lib/utils'

interface Organization {
  name: string
  logo: string
  url: string
}

interface Stack {
  name: string
  backgroundColor: string
  color: string
}

interface Experience {
  organization: Organization
  role: string
  date: string
  stacks: Array<Stack>
  accomplishments: Array<string>
}

const experiences: Experience[] = [
  {
    organization: {
      name: 'Investree',
      logo: '/static/images/resume/investree.png',
      url: 'https://investree.id',
    },
    role: 'Full-stack Engineer',
    date: 'November 2020 - Present',
    stacks: [
      {
        name: 'Spring',
        backgroundColor: 'rgb(109, 179, 63)',
        color: 'rgb(38, 103, 20)',
      },
      {
        name: 'Kotlin',
        backgroundColor: 'rgb(178, 37, 234)',
        color: 'rgb(74, 11, 135)',
      },
      {
        name: 'Laravel',
        backgroundColor: 'rgb(240, 83, 64)',
        color: 'rgb(115, 12, 34)',
      },
      {
        name: 'PHP',
        backgroundColor: 'rgb(137, 147, 190)',
        color: 'rgb(35, 37, 49)',
      },
      {
        name: 'Vue',
        backgroundColor: 'rgb(65, 184, 130)',
        color: 'rgb(14, 78, 69)',
      },
      {
        name: 'Javascript',
        backgroundColor: 'rgb(240, 219, 79)',
        color: 'rgb(86, 73, 15)',
      },
    ],
    accomplishments: [
      'Collaborated closely with cross-functional teams, including designers, product managers, and stakeholders to ensure seamless integration and implementation of new features.',
      'Developed a flexible and configurable automation process to streamline business operations.',
      'Developed and maintaining robust and scalable server-side applications.',
      'Contributed to the development of technical standards, best practices, and design patterns.',
      'Resolved technical issues in a timely and efficient manner.',
      'Conducted thorough unit testing on all new features and enhancements.',
      'Responsible for performing code reviews.',
      'Deliver delightful UX and performant front-end software.',
      'Adhered to an agile methodology for the software development process.',
      'Integrated with various third-party services and APIs, including digital signature, document generation, and payment systems to add additional functionality to applications.',
      'Maintained and updated documentation for the software development process.',
    ],
  },
  {
    organization: {
      name: 'Varnion',
      logo: '/static/images/resume/varnion.png',
      url: 'https://www.varnion.com',
    },
    role: 'Full-stack Engineer',
    date: 'June 2018 - August 2020',
    stacks: [
      {
        name: 'Laravel',
        backgroundColor: 'rgb(240, 83, 64)',
        color: 'rgb(115, 12, 34)',
      },
      {
        name: 'PHP',
        backgroundColor: 'rgb(137, 147, 190)',
        color: 'rgb(35, 37, 49)',
      },
      {
        name: 'Vue',
        backgroundColor: 'rgb(65, 184, 130)',
        color: 'rgb(14, 78, 69)',
      },
      {
        name: 'React',
        backgroundColor: 'rgb(97, 219, 251)',
        color: 'rgb(30, 95, 145)',
      },
      {
        name: 'Javascript',
        backgroundColor: 'rgb(240, 219, 79)',
        color: 'rgb(86, 73, 15)',
      },
    ],
    accomplishments: [
      'Refactored legacy code to adhere to modern design patterns, ensuring maintainability and longevity of software systems.',
      'Optimized database structure to improve performance and scalability, reducing latency and downtime.',
      'Integrated Elasticsearch for advanced network monitoring, resulting in improved load times and real-time data visualization.',
      "Conceptualized and designed innovative features to enhance the company's products, providing a competitive advantage and improved user experience.",
      'Mentored and provided guidance to junior developers on best practices, coding standards, and software development methodologies.',
      'Stayed current with emerging technologies and industry trends to continuously improve software systems and capabilities.',
    ],
  },
]

const Resume = () => {
  const lastUpdated = formatDate({
    timestamp: '2023-02-03T15:06:00.000Z',
    locale: 'en-ID',
  })

  return (
    <>
      <Metadata
        title="Resume"
        description="Check out how my journey have been like over the years"
        keywords={['resume', 'biography', 'cv']}
        robots={{ index: false, follow: false }}
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
