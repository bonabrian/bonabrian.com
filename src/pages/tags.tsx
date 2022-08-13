import { PageMeta } from '@/components/Meta'
import { UnderDevelopment } from '@/components/UnderDevelopment'
import siteMetadata from '@/data/siteMetadata'

const Tags = () => {
  return (
    <>
      <PageMeta title='Tags' description={siteMetadata.description} />
      <UnderDevelopment />
    </>
  )
}

export default Tags
