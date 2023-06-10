'use client'

import cx from 'classnames'
import { m, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

import { formatDate } from '@/lib/utils'

import Container from './container'
import {
  Document,
  JavaScript,
  Kotlin,
  Laravel,
  PHP,
  RabbitMq,
  ReactJs,
  Spring,
  VueJs,
} from './icons'
import Link from './link'

interface ResumeProps {
  isAvailableAnimationDuration?: number
}

interface Organization {
  name: string
  logo: string
  url: string
}

interface Stack {
  name: string
  backgroundColor: string
  color: string
  icon?: JSX.Element
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
        backgroundColor: 'rgba(109, 179, 63, 0.3)',
        color: '#6DB33F',
        icon: <Spring />,
      },
      {
        name: 'Kotlin',
        backgroundColor: 'rgba(127, 82, 255, 0.3)',
        color: '#7F52FF',
        icon: <Kotlin />,
      },
      {
        name: 'Vue',
        backgroundColor: 'rgba(79, 192, 141, 0.3)',
        color: '#4FC08D',
        icon: <VueJs />,
      },
      {
        name: 'Javascript',
        backgroundColor: 'rgba(247, 223, 30, 0.2)',
        color: '#F7DF1E',
        icon: <JavaScript />,
      },
      {
        name: 'Laravel',
        backgroundColor: 'rgba(255, 45, 32, 0.3)',
        color: '#FF2D20',
        icon: <Laravel />,
      },
      {
        name: 'PHP',
        backgroundColor: 'rgba(119, 123, 180, 0.3)',
        color: '#777BB4',
        icon: <PHP />,
      },
      {
        name: 'RabbitMQ',
        backgroundColor: 'rgba(255, 102, 0, 0.3)',
        color: '#FF6600',
        icon: <RabbitMq />,
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
        backgroundColor: 'rgba(255, 45, 32, 0.3)',
        color: '#FF2D20',
        icon: <Laravel />,
      },
      {
        name: 'PHP',
        backgroundColor: 'rgba(119, 123, 180, 0.3)',
        color: '#777BB4',
        icon: <PHP />,
      },
      {
        name: 'Vue',
        backgroundColor: 'rgba(79, 192, 141, 0.3)',
        color: '#4FC08D',
        icon: <VueJs />,
      },
      {
        name: 'React',
        backgroundColor: 'rgba(97, 218, 251, 0.3)',
        color: '#61DAFB',
        icon: <ReactJs />,
      },
      {
        name: 'Javascript',
        backgroundColor: 'rgba(247, 223, 30, 0.2)',
        color: '#F7DF1E',
        icon: <JavaScript />,
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

const Available = () => {
  return (
    <div className={cx('button pointer-events-none gap-3 px-3 uppercase')}>
      <span className={cx('relative flex h-2 w-2')}>
        <span
          className={cx(
            'bg-primary-600 absolute -top-1 -left-1 inline-flex h-4 w-4 animate-ping rounded-full opacity-75',
          )}
        />
        <span
          className={cx(
            'bg-primary-500 relative inline-flex h-2 w-2 rounded-full',
          )}
        />
      </span>
      Available for Hire
    </div>
  )
}

const DownloadResume = () => {
  return (
    <Link
      href="/resume/download"
      className={cx('button button--rounded button--shadow gap-x-1')}
    >
      <Document /> Download Resume
    </Link>
  )
}

const Resume = ({ isAvailableAnimationDuration = 5 }: ResumeProps) => {
  const isAvailable = process.env.NEXT_PUBLIC_AVAILABLE_FOR_HIRE === 'true'
  const shouldReduceMotion = useReducedMotion()

  const isAvailableVariants = {
    hide: { x: 0, opacity: 1 },
    show: { x: shouldReduceMotion ? 0 : -32, opacity: 0 },
  }

  const animation = {
    hide: { x: -16, opacity: 0 },
    show: { x: 0, opacity: 1 },
  }

  const lastUpdated = formatDate({
    timestamp: '2023-02-03T15:06:00.000Z',
    locale: 'en-ID',
  })

  return (
    <Container>
      <m.div
        initial="hide"
        animate="show"
        className={cx('relative mb-12', 'md:mb-16')}
      >
        {isAvailable ? (
          <m.div variants={animation} transition={{ delay: 2 }}>
            <m.div
              variants={isAvailableVariants}
              transition={{
                delay: isAvailableAnimationDuration + 1.5,
                duration: 0.4,
              }}
            >
              <Available />
            </m.div>
            <m.div
              initial={{ x: -32, opacity: 0, pointerEvents: 'none' }}
              animate={{ x: 0, opacity: 1, pointerEvents: 'auto' }}
              transition={{
                delay: isAvailableAnimationDuration + 1.6,
                duration: 0.4,
              }}
              className={cx('absolute top-0 left-0')}
            >
              <DownloadResume />
            </m.div>
          </m.div>
        ) : (
          <m.div variants={animation} transition={{ delay: 0.3 }}>
            <DownloadResume />
          </m.div>
        )}
      </m.div>

      <div className={cx('px-4 prose max-w-none', 'dark:prose-dark')}>
        <ol
          className={cx(
            'relative border-l border-slate-200 list-none',
            'dark:border-gray-700',
          )}
        >
          {experiences.map(
            ({ organization, role, date, stacks, accomplishments }) => (
              <li key={organization.name} className={cx('ml-3', 'sm:ml-6')}>
                <div
                  className={cx(
                    'absolute mt-0 -left-5 w-10 h-10 flex justify-center items-center rounded-ful',
                  )}
                >
                  <Image
                    src={organization.logo}
                    alt={organization.name}
                    fill
                    className={cx('rounded-full my-0')}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div
                  className={cx(
                    'flex flex-col items-start justify-between gap-2',
                    'md:flex-row md:items-center',
                  )}
                >
                  <h3 className={cx('text-lg my-0')}>
                    <Link
                      href={organization.url}
                      className={cx(
                        'no-underline font-bold text-gray-700 hover:text-gray-700',
                        'dark:text-slate-50 dark:hover:text-slate-50',
                      )}
                      showExternalLinkIcon={false}
                    >
                      {organization.name}
                    </Link>
                    <span
                      className={cx(
                        "before:content-['_|_'] font-normal text-gray-600",
                        'dark:text-slate-200',
                      )}
                    >
                      {role}
                    </span>
                  </h3>
                  <p
                    className={cx('my-0 text-gray-600', 'dark:text-slate-200')}
                  >
                    {date}
                  </p>
                </div>
                <div className={cx('flex flex-row flex-wrap gap-2 my-8')}>
                  {stacks.map(({ name, backgroundColor, color, icon }) => (
                    <span
                      key={name}
                      className={cx(
                        'rounded-full px-2 py-1 capitalize font-semibold text-xs flex gap-1',
                      )}
                      style={{ backgroundColor, color }}
                    >
                      {icon}
                      {name}
                    </span>
                  ))}
                </div>
                <ul>
                  {accomplishments.map((accomplishment) => (
                    <li key={accomplishment}>
                      <span
                        className={cx('text-gray-600', 'dark:text-slate-200')}
                      >
                        {accomplishment}
                      </span>
                    </li>
                  ))}
                </ul>
                <hr
                  className={cx(
                    'my-8 border-slate-200',
                    'dark:border-gray-700',
                  )}
                />
              </li>
            ),
          )}
        </ol>
        <div className={cx('mt-16')}>
          <p className={cx('text-gray-600', 'dark:text-slate-200')}>
            Last updated at{' '}
            <time dateTime={lastUpdated.raw}>{lastUpdated.formatted}</time>
          </p>
        </div>
      </div>
    </Container>
  )
}

export default Resume
