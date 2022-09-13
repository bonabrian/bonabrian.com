import PageSeo from '@/components/PageSeo'
import { UnderDevelopment } from '@/components/UnderDevelopment'
import siteMetadata from '@/data/siteMetadata'

const Projects = () => {
  return (
    <>
      <PageSeo title='Projects' description={siteMetadata.description} />
      <UnderDevelopment />
    </>
  )
}

export default Projects
