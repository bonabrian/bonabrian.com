import { css } from '@emotion/react'
import styled from '@emotion/styled'
import type { NextPage } from 'next'

import { PageMeta } from '@/common/components/Meta'
import { breakpoints } from '@/common/utils'

const Intro = styled.div({
  display: 'flex',
  padding: '1rem 0',
  flexDirection: 'column',
})

const Heading = styled.div`
  margin: 1.5rem 0;
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  @media (min-width: ${breakpoints.md}) {
    font-size: 2.5rem;
    line-height: 2.75rem;
  }
  @media (min-width: ${breakpoints.lg}) {
    font-size: 3.5rem;
    line-height: 3.75rem;
  }
`

const Home: NextPage = () => {
  return (
    <>
      <PageMeta title='Home' />
      <Intro>
        <Heading>
          Hi, I&apos;m{' '}
          <span css={css({ color: 'var(--color-primary)' })}>
            Bona Brian Siagian
          </span>
          <span
            css={css({
              display: 'block',
              WebkitTextStroke: '1px var(--text-primary)',
              color: 'transparent',
            })}
          >
            Full Stack Developer
          </span>
        </Heading>
        <p
          css={css`
            font-family: 'Courier New';
            font-size: 1rem;
            @media (min-width: ${breakpoints.sm}) {
              font-size: 1.25rem;
            }
          `}
        >
          I like making interactive things with code. I also talk and write
          about those things.
        </p>
      </Intro>
    </>
  )
}

export default Home
