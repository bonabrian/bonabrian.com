import { useTheme as useNextThemes } from 'next-themes'

import { useMounted } from './use-mounted'

export const useTheme = () => {
  const mounted = useMounted()
  const { resolvedTheme, setTheme } = useNextThemes()

  return {
    theme: mounted ? resolvedTheme : undefined,
    mounted,
    setTheme,
  }
}
