import styled from '@emotion/styled'
import Link from 'next/link'
import { GoPrimitiveDot } from 'react-icons/go'

import type { Experience } from '@/common/config'
import { breakpoints } from '@/common/utils'

type ExperienceProps = Experience

const Container = styled.div({
  userSelect: 'none',
})

const Organization = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.25rem;
  font-size: 1.125rem;
  @media (max-width: ${breakpoints.lg}) {
    font-size: 1rem;
  }
`

const Role = styled.h2`
  font-weight: 600;
  text-align: start;
`

const Company = styled.a({
  fontWeight: 500,
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  marginLeft: '0.25rem',
  transition: 'all ease-in-out 200ms',
  ':hover': {
    color: 'var(--color-primary)',
  },
})

const ContentList = styled.ul({
  listStyleType: 'none',
  marginTop: '0.75rem',
  color: 'var(--text-secondary)',
  lineHeight: 1.5,
})

export const Detail = ({ ...experience }: ExperienceProps) => {
  return (
    <Container>
      <Organization>
        <Role>{experience.role}</Role>
        {experience.link && (
          <Link href={experience.link} passHref>
            <Company target='_blank'>{`@${experience.organization}`}</Company>
          </Link>
        )}
      </Organization>
      <p
        css={{
          fontSize: '0.875rem',
          fontWeight: 500,
          color: 'var(--text-secondary)',
        }}
      >
        {experience.date}
      </p>
      <ContentList>
        {experience.content.map((item) => (
          <li key={item}>
            <GoPrimitiveDot
              css={{
                width: '1em',
                height: '1em',
                display: 'inline',
                verticalAlign: 'text-top',
                flexShrink: 0,
                marginInlineEnd: '0.125rem',
                color: 'var(--color-primary)',
                fontWeight: 600,
              }}
            />{' '}
            {item}
          </li>
        ))}
      </ContentList>
    </Container>
  )
}
