import styled from '@emotion/styled'
import Link from 'next/link'
import type { IconType } from 'react-icons'
import { AiOutlineCloudDownload } from 'react-icons/ai'
import { FaLinkedin } from 'react-icons/fa'

import { linkedinUrl } from '@/common/utils'

const MetaWrapper = styled.aside({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '100%',
  marginBottom: '1rem',
})

const MetaLink = styled.a({
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.25rem',
  transition: 'all ease-in-out 200ms',
  ':first-of-type': {
    marginRight: '1rem',
  },
  ':hover': {
    color: 'var(--color-primary)',
  },
})

type MetaItem = {
  url: string
  icon: IconType
}

const metaItems: Array<MetaItem> = [
  {
    url: linkedinUrl,
    icon: FaLinkedin,
  },
  {
    url: '/resume.pdf',
    icon: AiOutlineCloudDownload,
  },
]

export const Meta = () => {
  return (
    <MetaWrapper>
      {metaItems.map((item) => (
        <Link href={item.url} passHref key={item.url}>
          <MetaLink href={item.url} target='_blank'>
            <item.icon />
          </MetaLink>
        </Link>
      ))}
    </MetaWrapper>
  )
}
