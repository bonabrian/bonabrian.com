import { RiLinkedinFill, RiTwitterFill } from 'react-icons/ri'
import { LinkedinShareButton, TwitterShareButton } from 'react-share'

interface ShareButtonsProps {
  url: string
  title: string
  description?: string
}

const ShareButtons = ({ url, title, description }: ShareButtonsProps) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <TwitterShareButton url={url} title={title} via="bonabrian_">
        <RiTwitterFill
          className="hover:fill-primary-500 transition-all ease-in-out duration-150"
          size={24}
        />
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={title} summary={description}>
        <RiLinkedinFill
          className="hover:fill-primary-500 transition-all ease-in-out duration-150"
          size={24}
        />
      </LinkedinShareButton>
    </div>
  )
}

export default ShareButtons
