import { RiLinkedinFill, RiTwitterFill } from 'react-icons/ri'
import { LinkedinShareButton, TwitterShareButton } from 'react-share'

import { routePaths, siteMetaData } from '@/data'

interface ShareArticleProps {
  slug: string
  title: string
  description?: string
}

const getArticlePublicUrl = (slug: string) => {
  return `${siteMetaData.siteUrl}${routePaths.BLOG}/${slug}`
}

const ShareArticle = ({ slug, title, description }: ShareArticleProps) => {
  const publicUrl = getArticlePublicUrl(slug)

  return (
    <div className="flex items-center justify-center gap-3">
      <TwitterShareButton url={publicUrl} title={title} via="bonabrian_">
        <RiTwitterFill
          className="hover:fill-primary-500 transition-all ease-in-out duration-150"
          size={24}
        />
      </TwitterShareButton>
      <LinkedinShareButton url={publicUrl} title={title} summary={description}>
        <RiLinkedinFill
          className="hover:fill-primary-500 transition-all ease-in-out duration-150"
          size={24}
        />
      </LinkedinShareButton>
    </div>
  )
}

export default ShareArticle
