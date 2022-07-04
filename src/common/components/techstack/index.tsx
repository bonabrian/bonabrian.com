import styled from '@emotion/styled'

import { skills, SkillType } from '@/common/config'
import { breakpoints } from '@/common/utils'

import Skill from './Skill'

const Stack = styled.div({
  marginInlineStart: '0.75rem',
  marginInlineEnd: '0.75rem',
  marginTop: '1.25rem',
  marginBottom: '1.25rem',
})

const Heading = styled.h2({
  fontSize: '1rem',
  marginBottom: '0.5rem',
  color: '#808080',
})

const StackGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (min-width: ${breakpoints.sm}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (min-width: ${breakpoints.md}) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`

const TechStack = () => {
  return (
    <>
      <h1
        css={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '1rem',
        }}
      >
        Tech Stack
      </h1>
      <Stack>
        <Heading>Languages</Heading>
        <StackGrid>
          {skills.map(
            (skill) =>
              skill.type === SkillType.Language && (
                <Skill key={skill.name} name={skill.name} icon={skill.icon} />
              ),
          )}
        </StackGrid>
      </Stack>

      <Stack>
        <Heading>Tools & Technologies</Heading>
        <StackGrid>
          {skills.map(
            (skill) =>
              skill.type === SkillType.Technology && (
                <Skill key={skill.name} name={skill.name} icon={skill.icon} />
              ),
          )}
        </StackGrid>
      </Stack>

      <Stack>
        <Heading>Platforms</Heading>
        <StackGrid>
          {skills.map(
            (skill) =>
              skill.type === SkillType.Platform && (
                <Skill key={skill.name} name={skill.name} icon={skill.icon} />
              ),
          )}
        </StackGrid>
      </Stack>
    </>
  )
}

export default TechStack
