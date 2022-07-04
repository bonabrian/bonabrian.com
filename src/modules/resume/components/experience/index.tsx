import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'

import { experiences } from '@/common/config'
import { breakpoints } from '@/common/utils'

import { Detail } from './Detail'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 20px;
  margin: 40px auto;
  min-width: 100%;
  min-height: 700px;
  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const Organization = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

const TabContainer = styled.div`
  background-color: transparent;
  cursor: pointer;
  padding: 1rem 0.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-left: 2px solid transparent;
  transition: all 0.5s ease-in-out;
  font-weight: 600;
  color: var(--text-primary);
  :hover {
    color: var(--color-primary);
  }
  @media (max-width: ${breakpoints.sm}) {
    justify-content: center;
    margin-bottom: 0;
  }
`

export const Experience = () => {
  const [experience, setExperience] = useState(experiences[0])

  return (
    <>
      <h1
        css={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '1rem',
        }}
      >
        Work Experience
      </h1>
      <Wrapper>
        <Organization>
          {experiences.map((item) => (
            <TabContainer
              css={
                item.organization === experience.organization
                  ? css({
                      color: 'var(--color-primary)',
                      borderLeft: '2px solid var(--color-primary)',
                    })
                  : {}
              }
              id={item.organization}
              key={item.organization}
              onClick={() => setExperience(item)}
            >
              <h1>{item.organization}</h1>
            </TabContainer>
          ))}
        </Organization>
        <div>
          <Detail
            role={experience.role}
            organization={experience.organization}
            link={experience.link}
            date={experience.date}
            content={experience.content}
          />
        </div>
      </Wrapper>
    </>
  )
}
