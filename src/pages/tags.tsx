import { PageSeo } from '@/components/Seo'
import { UnderDevelopment } from '@/components/UnderDevelopment'
import siteMetadata from '@/data/siteMetadata'

const Tags = () => {
  return (
    <>
      <PageSeo title='Tags' description={siteMetadata.description} />
      <UnderDevelopment />
    </>
  )
}

export default Tags
