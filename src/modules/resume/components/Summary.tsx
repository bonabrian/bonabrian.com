import styled from '@emotion/styled'

const Heading = styled.header({
  display: 'flex',
  justifyContent: 'center',
  flex: 1,
  flexDirection: 'column',
})

export const Summary = () => {
  return (
    <Heading>
      <h1
        css={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '1rem',
          textAlign: 'center',
        }}
      >
        Bona Brian Siagian
      </h1>
      <p css={{ color: 'var(--text-secondary)' }}>
        Full-stack engineer with 4+ years of experience using a range of
        Frontend and Backend technologies like Java/Kotlin (Spring), PHP
        (Laravel), Javascript/Typescript (Vue, React). Developed scalable
        applications with specifications and business requirements. Perform
        technical analysis and testing to deliver business value through quality
        software.
      </p>
    </Heading>
  )
}
