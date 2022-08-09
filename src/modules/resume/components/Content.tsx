import styled from '@emotion/styled'
import Link from 'next/link'

import Divider from '@/common/components/Divider'
import TechStack from '@/common/components/techstack'

import { Experience } from './experience'
import { Summary } from './Summary'

const ResumeContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

export const Content = () => {
  return (
    <ResumeContent>
      <Summary />
      <Divider />
      <Experience />
      <Divider />
      <TechStack />
      <Divider />
      <h1
        css={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '1rem',
        }}
      >
        Projects
      </h1>
      <p>
        Links to some of my work can be found on{' '}
        <Link href='/work' passHref>
          <span
            css={{
              fontWeight: 500,
              color: 'var(--color-primary)',
              cursor: 'pointer',
            }}
          >
            bonabrian.com/work
          </span>
        </Link>
      </p>
    </ResumeContent>
  )
}
