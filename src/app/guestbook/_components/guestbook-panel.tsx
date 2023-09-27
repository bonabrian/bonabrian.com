'use client'

import type { FormEvent } from 'react'
import { useRef, useState } from 'react'

import { PaperPlane } from '@/components/icons'
import { Button, Input } from '@/components/ui'
import cn from '@/lib/cn'

import GuestbookUserInfo from './guestbook-user-info'

interface GuestbookPanelProps {
  isWidget?: boolean
  onSendMessage: (message: string) => Promise<void>
}

const GuestbookPanel = ({
  isWidget = false,
  onSendMessage,
}: GuestbookPanelProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault()

    if (isSending) return

    setIsSending(true)

    try {
      await onSendMessage(message)
      setMessage('')
    } catch (err) {
      console.error('Error sending message ', err)
    } finally {
      setIsSending(false)
      setTimeout(() => {
        inputRef.current?.focus
      }, 0)
    }
  }

  return (
    <>
      <form
        className={cn('flex items-center p-4 border-t border-muted gap-x-1')}
        onSubmit={handleSendMessage}
      >
        <Input
          type="text"
          placeholder="Type a message..."
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn('flex-grow')}
          autoFocus
        />
        <Button htmlType="submit" disabled={isSending || !message.trim()}>
          <PaperPlane className={cn('rotate-90')} />
        </Button>
      </form>
      <GuestbookUserInfo isWidget={isWidget} />
    </>
  )
}

export default GuestbookPanel
