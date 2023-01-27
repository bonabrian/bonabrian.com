import { useRef, useState } from 'react'
import { BsClipboard, BsClipboardCheck } from 'react-icons/bs'

type PreProps = {
  children: React.ReactNode
}

export const Pre = ({ children }: PreProps) => {
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
          className={`absolute flex items-center justify-center right-2 top-2 w-8 h-8 p-1 rounded border-2 bg-gray-200 dark:bg-gray-800 ${
            copied
              ? 'focus:outline-none focus:border-green-600 border-green-600 dark:focus:border-green-400 dark:border-green-400'
              : 'border-gray-300'
          }`}
        >
          {copied ? (
            <BsClipboardCheck className="text-green-600 dark:text-green-400" />
          ) : (
            <BsClipboard />
          )}
        </button>
      )}
      <pre>{children}</pre>
    </div>
  )
}
