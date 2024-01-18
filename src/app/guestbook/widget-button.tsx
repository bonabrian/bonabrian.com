'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { BookOpenText } from '@/components/icons'
import { Button } from '@/components/ui'
import { ROUTES } from '@/config/links'
import cn from '@/utils/cn'

import Widget from './widget'

const WidgetButton = () => {
  const pathname = usePathname()
  const showWidgetButton = !pathname.startsWith(ROUTES.guestbook)
  const [showWidget, setShowWidget] = useState(false)

  return showWidgetButton ? (
    <div
      className={cn('fixed bottom-10 right-5 hidden items-center', 'md:flex')}
    >
      <Button
        variant="shadow"
        className={cn('h-10 w-10 rounded-full p-0', 'hover:scale-105')}
        onClick={() => setShowWidget(!showWidget)}
      >
        <BookOpenText />
      </Button>
      <Widget isOpen={showWidget} onClose={() => setShowWidget(false)} />
    </div>
  ) : null
}

export default WidgetButton
