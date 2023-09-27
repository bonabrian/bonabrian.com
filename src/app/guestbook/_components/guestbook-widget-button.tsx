'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { BookOpenText } from '@/components/icons'
import { Button } from '@/components/ui'
import { ROUTES } from '@/constants/links'
import cn from '@/lib/cn'

import GuestbookWidget from './guestbook-widget'

const GuestbookWidgetButton = () => {
  const pathname = usePathname()
  const showWidgetButton = !pathname.startsWith(ROUTES.guestbook)
  const [showWidget, setShowWidget] = useState(false)

  return showWidgetButton ? (
    <div
      className={cn('hidden fixed items-center bottom-10 right-5', 'lg:flex')}
    >
      <Button
        variant="outline"
        className={cn('rounded-full w-10 h-10 p-0', 'hover:scale-105')}
        onClick={() => setShowWidget(!showWidget)}
      >
        <BookOpenText />
      </Button>
      <GuestbookWidget
        isOpen={showWidget}
        onClose={() => setShowWidget(false)}
      />
    </div>
  ) : null
}

export default GuestbookWidgetButton
