import { useEffect, useRef, useState } from 'react'

export const useOutsideClick = (enabled?: boolean) => {
  const [isOpen, setIsOpen] = useState(enabled)
  const ref = useRef<HTMLDivElement>(null)

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') setIsOpen(false)
  }

  const onClick = (event: Event) => {
    const target = event.target
    if (ref?.current && !ref?.current.contains(target as Node)) setIsOpen(false)
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeydown, true)
    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('keydown', onKeydown, true)
      document.removeEventListener('click', onClick, true)
    }
  })

  return { ref, isOpen, setIsOpen }
}
