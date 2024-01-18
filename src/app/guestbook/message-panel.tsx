'use client'

import type { FormEvent } from 'react'
import { useRef, useState } from 'react'

import { PaperPlane } from '@/components/icons'
import { Button, Input } from '@/components/ui'
import cn from '@/utils/cn'

import UserInfo from './user-info'

interface MessagePanelProps {
  onSendMessage: (message: string) => Promise<void>
  isWidget?: boolean
}

const MessagePanel = ({
  onSendMessage,
  isWidget = false,
}: MessagePanelProps) => {
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
      console.error('Error sending message', err)
    } finally {
      setIsSending(false)
      setTimeout(() => {
        inputRef?.current?.focus()
      })
    }
  }

  return (
    <>
      <form
        className={cn('flex items-center gap-x-1 border-t border-muted p-4')}
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
          <PaperPlane className={cn('h-5 w-5')} />
        </Button>
      </form>
      <UserInfo isWidget={isWidget} />
    </>
  )
}
export default MessagePanel
