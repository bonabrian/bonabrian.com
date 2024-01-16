'use client'

import { Dialog, Transition } from '@headlessui/react'
import { m, useInView } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import type { BuiltInProviderType } from 'next-auth/providers'
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import { Fragment, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui'
import cn from '@/utils/cn'

import ProviderButton from './provider-button'

const variants = {
  initial: {
    y: 40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
}

const SignInCard = ({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const searchParams = useSearchParams()
  const signInCardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(signInCardRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (searchParams?.get('error')) {
      setIsOpen(true)
    }
  }, [searchParams])

  return (
    <>
      <m.div
        initial="initial"
        animate={isInView ? 'animate' : 'initial'}
        variants={variants}
        ref={signInCardRef}
        transition={{ duration: 0.5 }}
        className={cn(
          'flex flex-col items-center justify-items-center space-y-2 will-change-[transform,opacity]',
          'xl:space-y-0',
        )}
      >
        <div className={cn('flex flex-col items-center justify-between gap-4')}>
          {providers &&
            Object.values(providers).map((provider) => (
              <ProviderButton key={provider.id} provider={provider} />
            ))}
        </div>
      </m.div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          role="dialog"
          className={cn('fixed inset-0 z-[999] overflow-y-auto')}
          onClose={() => setIsOpen(false)}
        >
          <div className={cn('min-h-screen px-4 text-center')}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className={cn('fixed inset-0')} />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={cn(
                  'my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-card p-6 text-left align-middle shadow-xl transition-all',
                )}
              >
                <Dialog.Title
                  as="h3"
                  className={cn('font-cal text-lg text-card-foreground')}
                >
                  Problem signin in
                </Dialog.Title>
                <div className={cn('mt-2')}>
                  <p className={cn('text-sm text-muted-foreground')}>
                    An unexpected problem occurred while I&apos;m trying to log
                    you in. Please try with another providers.
                  </p>
                  <code className={cn('text-sm text-red-500')}>
                    Error: {searchParams?.get('error')}
                  </code>
                </div>

                <div className={cn('mt-4')}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default SignInCard
