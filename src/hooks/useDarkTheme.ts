import { useTheme } from 'next-themes'

import { useHasMounted } from './useHasMounted'

export const useDarkTheme = () => {
  const hasMounted = useHasMounted()
  const { theme, resolvedTheme, setTheme } = useTheme()

  const isDark = hasMounted && (resolvedTheme || theme) === 'dark'
  return {
    isDark,
    hasMounted,
    setTheme,
  }
}
