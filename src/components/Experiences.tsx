import { experiences } from '@/data/experiences'
import siteMetadata from '@/data/siteMetadata'

import Link from './Link'

const Experiences = () => {
  return (
    <>
      {experiences.map((experience) => (
        <div key={experience.organization}>
          <h3>
            {experience.role}{' '}
            {experience.url && (
              <>
                {'@'}
                <Link href={experience.url}>{experience.organization}</Link>
              </>
            )}
          </h3>
          <p className='text-gray-400 dark:text-gray-600'>{experience.date}</p>
          <ul>
            {experience.accomplishments.map((accomplishment) => (
              <li key={accomplishment} className='text-base'>
                {accomplishment}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className='mt-14'>
        <p className='text-gray-400 dark:text-gray-600'>
          Last updated at{' '}
          <time dateTime='2022-08-13 22:00:00'>
            {new Date('2022-08-13 22:00:00').toLocaleDateString(
              siteMetadata.locale,
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              },
            )}
          </time>
        </p>
      </div>
    </>
  )
}

export default Experiences
