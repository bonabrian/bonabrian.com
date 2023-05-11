'use client'

import classnames from 'classnames'
import { useRef, useState } from 'react'
import { HiOutlineClipboard, HiOutlineClipboardCheck } from 'react-icons/hi'

type PreProps = {
  children: React.ReactNode
}

const Pre = ({ children }: PreProps) => {
  const textInput = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const onMouseEnter = () => {
    setHovered(true)
  }

  const onMouseLeave = () => {
    setHovered(false)
    setCopied(false)
  }

  const onCopy = () => {
    if (textInput.current?.textContent) {
      setCopied(true)
      navigator.clipboard.writeText(textInput.current.textContent)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }

  return (
    <div
      ref={textInput}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative"
    >
      {hovered && (
        <button
          aria-label="Copy"
          onClick={onCopy}
          type="button"
          className={classnames(
            'absolute flex items-center justify-center right-2 top-2 w-8 h-8 text-white',
          )}
        >
          {copied ? (
            <HiOutlineClipboardCheck className="text-primary-500" size={24} />
          ) : (
            <HiOutlineClipboard size={24} />
          )}
        </button>
      )}
      <pre className="bg-[#23283d]">{children}</pre>
    </div>
  )
}

export default Pre
