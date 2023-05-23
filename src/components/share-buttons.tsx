'use client'

import { usePathname } from 'next/navigation'
import {
  RiFacebookFill,
  RiLinkedinFill,
  RiTelegramFill,
  RiTwitterFill,
  RiWhatsappFill,
} from 'react-icons/ri'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'

interface ShareButtonsProps {
  title: string
  description?: string
}

const ShareButtons = ({ title, description }: ShareButtonsProps) => {
  const pathname = usePathname()
  const url = `https://bonabrian.com/${pathname}`

  const className =
    'hover:fill-primary-500 transition-all ease-in-out duration-150'

  return (
    <div className="flex items-center gap-3 my-4">
      <FacebookShareButton url={url} title={title}>
        <RiFacebookFill className={className} size={24} />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title} via="bonabrian_">
        <RiTwitterFill className={className} size={24} />
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={title} summary={description}>
        <RiLinkedinFill className={className} size={24} />
      </LinkedinShareButton>
      <TelegramShareButton url={url} title={title}>
        <RiTelegramFill className={className} size={24} />
      </TelegramShareButton>
      <WhatsappShareButton url={url} title={title} openShareDialogOnClick>
        <RiWhatsappFill className={className} size={24} />
      </WhatsappShareButton>
    </div>
  )
}

export default ShareButtons
