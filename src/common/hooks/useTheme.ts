import { useEffect, useState } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState('')
  const setMode = (mode: string) => {
    setTheme(mode)
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    const matches = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (matches && !localTheme) {
      setMode('dark')
    }

    if (localTheme) {
      setTheme(localTheme)
    } else {
      setMode('dark')
    }
  }, [])

  return { theme }
}
