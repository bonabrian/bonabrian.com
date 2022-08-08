import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { RiMoonFill, RiSunFill } from 'react-icons/ri'

const SwitchButton = styled(motion.button)({
  margin: 'auto 0.25rem',
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
  height: '2rem',
  minWidth: '2rem',
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

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme, setTheme } = useTheme()
  const isDark = (resolvedTheme || theme) === 'dark'

  useEffect(() => setMounted(true), [])

  const switchTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <SwitchButton
      whileTap={{ scale: 0.7, rotate: 360 }}
      whileHover={mounted ? { scale: 1.1 } : {}}
      transition={{ duration: 0.2, ease: 'easeIn' }}
      type='button'
      onClick={() => switchTheme()}
    >
      {mounted && (isDark ? <RiSunFill /> : <RiMoonFill />)}
    </SwitchButton>
  )
}

export default ThemeSwitch
