import { useEffect, useState } from 'react'

import { useTheme } from '@/common/hooks'

const ThemeToggle = () => {
  const [darkTheme, setDarkTheme] = useState<boolean | undefined>(undefined)
  const { theme } = useTheme()

  useEffect(() => {
    setDarkTheme(theme === 'dark')
  }, [])

  useEffect(() => {
    if (darkTheme !== undefined) {
      const activeTheme = darkTheme ? 'dark' : 'light'
      document.body.dataset.theme = activeTheme
      window.localStorage.setItem('theme', activeTheme)
    }
  }, [darkTheme])

  useEffect(() => {
    if (theme) setDarkTheme(theme === 'dark')
  }, [theme])

  const handleThemeSwitch = () => setDarkTheme(!darkTheme)

  return <button onClick={handleThemeSwitch}>Toggle theme</button>
}

export default ThemeToggle
