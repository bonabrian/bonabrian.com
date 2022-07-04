import styled from '@emotion/styled'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { RiMoonFill, RiSunFill } from 'react-icons/ri'

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
    background: 'var(--bg-secondary)',
  },
})

const ThemeToggle = () => {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [loaded, setLoaded] = useState(false)
  const isDark = (resolvedTheme || theme) === 'dark'

  useEffect(() => setLoaded(true), [setLoaded])

  return (
    <ToggleButton onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      {loaded && (isDark ? <RiSunFill /> : <RiMoonFill />)}
    </ToggleButton>
  )
}

export default ThemeToggle
