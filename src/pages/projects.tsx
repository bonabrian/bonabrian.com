import { PageMeta } from '@/components/Meta'
import { UnderDevelopment } from '@/components/UnderDevelopment'
import siteMetadata from '@/data/siteMetadata'

const Projects = () => {
  return (
    <>
      <PageMeta title='Projects' description={siteMetadata.description} />
      <UnderDevelopment />
    </>
  )
}

export default Projects
