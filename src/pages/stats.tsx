import PageSeo from '@/components/PageSeo'
import { UnderDevelopment } from '@/components/UnderDevelopment'
import siteMetadata from '@/data/siteMetadata'

const Stats = () => {
  return (
    <>
      <PageSeo title='Stats' description={siteMetadata.description} />
      <UnderDevelopment />
    </>
  )
}

export default Stats
