'use client'

import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import { useRef, useState } from 'react'

import cn from '@/lib/cn'

import { Copy } from '../icons'
import { Button } from '../ui'

type PreProps = DetailedHTMLProps<
  HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>

const Pre = ({ children }: PreProps) => {
  const textInput = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      const content = textInput.current?.textContent ?? ''
      await navigator.clipboard.writeText(content)
      setCopied(true)

      setTimeout(() => setCopied(false), 1000)
    } catch (err) {
      setCopied(false)
    }
  }

  return (
    <>
      <pre ref={textInput}>{children}</pre>
      <Button
        aria-label="Copy to Clipboard"
        onClick={copyToClipboard}
        htmlType="button"
        title="Copy to Clipboard"
        variant="ghost"
        className={cn(
          'absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-md border border-neutral-600 p-1 text-neutral-400',
          'hover:bg-inherit hover:text-white',
        )}
      >
        <div
          className={cn(
            'pointer-events-none absolute right-10 -mr-1 w-16 translate-x-2 rounded-md px-2 py-1 text-xs font-bold opacity-0 transition',
            copied ? 'translate-x-0 opacity-100' : '',
          )}
        >
          Copied!
        </div>
        <Copy />
      </Button>
    </>
  )
}

export default Pre
