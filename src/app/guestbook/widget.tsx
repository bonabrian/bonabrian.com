'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

import cn from '@/utils/cn'

import Guestbook from './guestbook'
import WidgetHeader from './widget-header'

interface WidgetProps {
  isOpen: boolean
  onClose: () => void
}

const Widget = ({ isOpen, onClose }: WidgetProps) => {
  return (
    <Transition
      appear
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog
        as="div"
        className={cn('fixed bottom-10 right-5 z-50 shadow-lg')}
        onClose={onClose}
        open={isOpen}
      >
        <div
          className={cn(
            'rounded-md border-muted bg-card shadow-2xl backdrop-blur-2xl',
            'max-w-md',
          )}
        >
          <WidgetHeader onClose={onClose} />
          <Guestbook isWidget={true} />
        </div>
      </Dialog>
    </Transition>
  )
}

export default Widget
