'use client'

import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import { useRef, useState } from 'react'

import cn from '@/lib/cn'

import { Clipboard } from '../icons'

type PreProps = DetailedHTMLProps<
  HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
> & {
  'data-theme'?: string
}

const Pre = ({ children, 'data-theme': dataTheme = '' }: PreProps) => {
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
    <div className={cn('mdx-code')} data-theme={dataTheme}>
      <button
        aria-label="Copy to Clipboard"
        onClick={copyToClipboard}
        type="button"
        title="Copy to Clipboard"
        className={cn('mdx-code__copy-clipboard')}
      >
        <div
          className={cn(
            'mdx-code__copy-clipboard__message',
            copied ? 'copied' : '',
          )}
        >
          Copied!
        </div>
        <Clipboard />
      </button>
      <pre ref={textInput}>{children}</pre>
    </div>
  )
}

export default Pre
