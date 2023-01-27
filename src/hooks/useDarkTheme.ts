import { useTheme } from 'next-themes'

import { useMounted } from './useMounted'

export const useDarkTheme = () => {
  const mounted = useMounted()
  const { theme, resolvedTheme, setTheme } = useTheme()

  const isDark = mounted && (resolvedTheme || theme) === 'dark'
  return {
    isDark,
    mounted,
    setTheme,
  }
}
