import { PageMeta } from '@/components/Meta'
import { UnderDevelopment } from '@/components/UnderDevelopment'
import siteMetadata from '@/data/siteMetadata'

const Stats = () => {
  return (
    <>
      <PageMeta title='Stats' description={siteMetadata.description} />
      <UnderDevelopment />
    </>
  )
}

export default Stats
