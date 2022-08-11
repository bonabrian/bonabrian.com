import { HiOutlineExternalLink } from 'react-icons/hi'

import Link from './Link'

type TextLinkProps = {
  href: string
  label: string
}

const TextLink = ({ href, label }: TextLinkProps) => {
  return (
    <Link href={href}>
      <span>{label}</span>
      <HiOutlineExternalLink className='inline-block ml-0.5' />
    </Link>
  )
}

export default TextLink
