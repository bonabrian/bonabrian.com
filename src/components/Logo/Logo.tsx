import { siteMetaData } from '@/data'
import { useDarkTheme } from '@/hooks'

import Link from '../Link'
import LogoDark from './logo-dark.svg'
import LogoLight from './logo-light.svg'

const Logo = () => {
  const { isDark } = useDarkTheme()

  const LogoSvg = isDark ? LogoDark : LogoLight

  return (
    <Link href="/" aria-label={siteMetaData.author}>
      <LogoSvg className="fill-current h-8" />
    </Link>
  )
}

export default Logo
