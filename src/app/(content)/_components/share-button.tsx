'use client'

import { Menu } from '@headlessui/react'
import type { ShareType } from '@prisma/client'
import { m } from 'framer-motion'
import { usePathname } from 'next/navigation'
import type { PropsWithChildren, Ref } from 'react'
import { forwardRef } from 'react'

import { LinkSimple, Share, Twitter } from '@/components/icons'
import { Counter, Link } from '@/components/ui'
import { useShare } from '@/hooks'
import cn from '@/lib/cn'
import { getBaseUrl } from '@/lib/utils'

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
      className={cn(
        'flex items-center gap-3 px-4 py-2 text-sm',
        'hover:bg-accent hover:text-accent-foreground',
        active && 'bg-accent',
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
    <div className={cn('flex flex-col items-center gap-2')}>
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button
              title="Share"
              aria-label="Share"
              className={cn(
                'relative flex items-center h-10 w-10 justify-center',
              )}
            >
              <Share className={cn('w-5 h-5')} />
            </Menu.Button>
            {open && (
              <Menu.Items
                static
                as={m.div}
                variants={animation}
                initial="hide"
                animate="show"
                className={cn(
                  'absolute shadow flex w-56 flex-col overflow-hidden rounded-lg bg-card -top-16 right-2 z-10 border border-neutral-100',
                  'dark:border-neutral-800',
                )}
              >
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={cn(
                        'flex items-center gap-3 px-4 py-2 text-sm',
                        'hover:bg-accent hover:text-accent-foreground',
                        active && 'bg-accent',
                      )}
                      onClick={handleCopyLink}
                    >
                      <LinkSimple /> Copy link
                    </button>
                  )}
                </Menu.Item>
                <div
                  className={cn(
                    'border-t border-neutral-100',
                    'dark:border-neutral-800',
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
                      <Twitter className={cn('fill-[#1DA1F2]')} /> Share on
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
