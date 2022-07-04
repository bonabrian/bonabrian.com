import styled from '@emotion/styled'
import Image from 'next/image'

type SkillProps = {
  name: string
  icon: string
}

const Wrapper = styled.div({
  padding: '0.5rem',
  backgroundColor: 'var(--box-bg)',
  borderRadius: '0.25rem',
  cursor: 'pointer',
  userSelect: 'none',
})

const Content = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
})

const Skill = ({ icon, name }: SkillProps) => {
  return (
    <Wrapper>
      <Content>
        <Image src={icon} alt={name} width={26} height={26} />
        <p css={{ color: 'var(--text-primary)' }}>{name}</p>
      </Content>
    </Wrapper>
  )
}

export default Skill
