// Icons taken from: https://simpleicons.org/
import Link from '../Link'
import Github from './github.svg'
import Linkedin from './linkedin.svg'
import Mail from './mail.svg'

interface ComponentProps {
  [kind: string]: any
}

const components: { [kind: string]: any } = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
}

interface SocialIconProps {
  kind: keyof ComponentProps
  href: string
  size?: number
}

const SocialIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
  if (!href) return null

  const SocialSvg = components[kind]

  return (
    <Link
      className='text-sm text-gray-500 transition hover:text-gray-600'
      href={href}
      showExternalLinkIcon={false}
    >
      <span className='sr-only'>{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 h-${size} w-${size}`}
      />
    </Link>
  )
}

export default SocialIcon
