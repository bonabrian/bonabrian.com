import { PageMeta } from '@/components/Meta'
import { UnderDevelopment } from '@/components/UnderDevelopment'
import siteMetadata from '@/data/siteMetadata'

const Guestbook = () => {
  return (
    <>
      <PageMeta title='Guestbook' description={siteMetadata.description} />
      <UnderDevelopment />
    </>
  )
}

export default Guestbook
