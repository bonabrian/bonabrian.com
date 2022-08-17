import { PageSeo } from '@/components/Seo'
import { UnderDevelopment } from '@/components/UnderDevelopment'

const Blog = () => {
  return (
    <>
      <PageSeo
        title={'Blog'}
        description={
          'Blog posts by Bona Brian Siagian. Here I share some thoughts, stories, information, and more about software development'
        }
        keywords={[
          'blog',
          'story',
          'articles',
          'moments',
          'contents',
          'thoughts',
          'tech',
          'software',
          'development',
        ]}
      />
      <UnderDevelopment />
    </>
  )
}

export default Blog
