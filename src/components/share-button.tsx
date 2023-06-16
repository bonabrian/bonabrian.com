'use client'

import { Menu } from '@headlessui/react'
import type { ShareType } from '@prisma/client'
import cx from 'classnames'
import { m } from 'framer-motion'
import { usePathname } from 'next/navigation'
import type { PropsWithChildren, Ref } from 'react'
import { forwardRef } from 'react'

import { useShare } from '@/hooks'
import { getBaseUrl } from '@/lib/utils'

import Counter from './counter'
import { Link as LinkIcon, Share, Twitter } from './icons'
import Link from './link'

interface ShareItemLinkProps extends PropsWithChildren {
  href: string
  onClick: () => void
  active: boolean
}

const ShareItemLink = forwardRef(
  (
    { href, onClick, active, children }: ShareItemLinkProps,
    ref: Ref<HTMLButtonElement>,
  ) => (
    <Link
      href={href}
      ref={ref}
      className={cx(
        'flex items-center gap-3 px-4 py-2 text-sm',
        'hover:bg-slate-100 hover:dark:bg-gray-700',
        active && 'bg-slate-100 dark:bg-gray-700',
      )}
      onClick={onClick}
      showExternalLinkIcon={false}
    >
      {children}
    </Link>
  ),
)

const animation = {
  hide: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.15 } },
}

interface ShareButtonProps {
  slug: string
}

const ShareButton = ({ slug }: ShareButtonProps) => {
  const pathname = usePathname()
  const currentUrl = `${getBaseUrl()}${pathname}`

  const { shares, addShare } = useShare(slug)

  const handleItemClick = (type: ShareType) => {
    addShare(type)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
    } catch (err) {
      //
    }

    addShare('CLIPBOARD')
  }

  return (
    <div className={cx('flex flex-col items-center gap-2')}>
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button
              title="Share"
              aria-label="Share"
              className={cx(
                'relative flex items-center h-10 w-10 justify-center',
              )}
            >
              <Share className={cx('w-5 h-5')} />
            </Menu.Button>
            {open && (
              <Menu.Items
                static
                as={m.div}
                variants={animation}
                initial="hide"
                animate="show"
                className={cx(
                  'border border-slate-100 absolute shadow flex w-56 flex-col overflow-hidden rounded-lg bg-white -top-16 right-2 z-10',
                  'dark:border-gray-700 dark:bg-gray-800/80',
                )}
              >
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={cx(
                        'flex items-center gap-3 px-4 py-2 text-sm',
                        'hover:bg-slate-100 hover:dark:bg-gray-700',
                        active && 'bg-slate-100 dark:bg-gray-700',
                      )}
                      onClick={handleCopyLink}
                    >
                      <LinkIcon /> Copy link
                    </button>
                  )}
                </Menu.Item>
                <div
                  className={cx(
                    'border-t border-slate-100',
                    'dark:border-gray-700',
                  )}
                />
                <Menu.Item>
                  {({ active }) => (
                    <ShareItemLink
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        currentUrl,
                      )}&via=bonabrian_`}
                      active={active}
                      onClick={() => handleItemClick('TWITTER')}
                    >
                      <Twitter className={cx('fill-[#1DA1F2]')} /> Share on
                      Twitter
                    </ShareItemLink>
                  )}
                </Menu.Item>
              </Menu.Items>
            )}
          </>
        )}
      </Menu>
      <Counter count={shares?.total ?? 0} />
    </div>
  )
}

export default ShareButton
