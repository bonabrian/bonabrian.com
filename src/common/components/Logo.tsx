import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import TypewriterComponent from 'typewriter-effect'

import siteMetadata from '../data/siteMetadata'
import Link from './Link'

const Logo = () => {
  const router = useRouter()

  return (
    <Link href='/' aria-label={siteMetadata.title}>
      <div
        css={css({
          fontWeight: '600',
          fontSize: '1.25rem',
          lineHeight: '1.75rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          display: 'flex',
          color: 'var(--text-primary)',
        })}
      >
        {`~${router.asPath}`}{' '}
        <TypewriterComponent
          options={{
            strings: [],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
    </Link>
  )
}

export default Logo
