import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { RiMoonFill, RiSunFill } from 'react-icons/ri'

import { useTheme } from '@/common/hooks'

const ToggleButton = styled.button({
  display: 'inline-flex',
  appearance: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  position: 'relative',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  outline: '2px solid transparent',
  outlineOffset: '2px',
  width: 'auto',
  lineHeight: '1.2',
  borderRadius: '1rem',
  fontWeight: 600,
  transitionProperty:
    'background-color,border-color,color,fill,stroke,opacity,box-shadow,transform',
  transitionDuration: '200ms',
  height: '2.5rem',
  minWidth: '2.5rem',
  fontSize: '1rem',
  paddingInlineStart: '1rem',
  paddingInlineEnd: '1rem',
  background: 'rgba(255, 255, 255, 0.08)',
  padding: '0px',
  backgroundColor: 'transparent',
  ':hover': {
    background: 'var(--toggle-hover-background)',
  },
})

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

  return (
    <ToggleButton onClick={handleThemeSwitch}>
      {darkTheme ? <RiSunFill /> : <RiMoonFill />}
    </ToggleButton>
  )
}

export default ThemeToggle
