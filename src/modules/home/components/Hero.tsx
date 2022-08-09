import styled from '@emotion/styled'
import Link from 'next/link'

import { breakpoints } from '@/common/utils'

const Container = styled.div({
  userSelect: 'none',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
})

const Box = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  flexDirection: 'column',
})

const Heading = styled.h1`
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: var(--text-secondary);
  text-align: center;
  @media (min-width: ${breakpoints.md}) {
    font-size: 2.25rem;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
`

const Intro = styled.p`
  text-align: center;
  color: var(--text-secondary);
  font-weight: 600;
  @media (min-width: ${breakpoints.sm}) {
    font-size: 1.25rem;
  }
`

export const Hero = () => {
  return (
    <Container>
      <Box>
        <Heading>
          Hi, I&apos;m{' '}
          <span css={{ color: 'var(--text-primary)' }}>Bona Brian Siagian</span>
        </Heading>
        <Intro>
          Fullstack developer enthusiast based in{' '}
          <Link
            title='Jakarta on Google Maps'
            href='https://www.google.com/maps/place/Jakarta,+Daerah+Khusus+Ibukota+Jakarta/@-6.2293867,106.6894298,11z'
            passHref
          >
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
            <a
              target='_blank'
              css={{ color: 'var(--text-primary)', cursor: 'pointer' }}
            >
              Jakarta, Indonesia 🇮🇩
            </a>
          </Link>
        </Intro>
      </Box>
    </Container>
  )
}
