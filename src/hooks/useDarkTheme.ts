import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const useDarkTheme = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const isDark = mounted && (resolvedTheme || theme) === 'dark'
  return {
    isDark,
    mounted,
    setTheme,
  }
}
