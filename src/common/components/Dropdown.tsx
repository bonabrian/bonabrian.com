import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import React from 'react'
// import { useSession } from 'next-auth/react'
import { RiMenuFill } from 'react-icons/ri'

import menuItems from '../data/menuItems'
import { useOutsideClick } from '../hooks'
import Divider from './Divider'
import Link from './Link'

const DropdownToggle = styled(motion.button)({
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

const DropdownMenu = styled.div({
  position: 'absolute',
  right: 0,
  marginTop: '0.25rem',
  width: '14rem',
  transformOrigin: 'top right',
  borderRadius: '0.375rem',
  backgroundColor: 'var(--bg-secondary)',
})

const MenuItem = styled.div({
  padding: '0.5rem 1rem',
  display: 'flex',
  alignItems: 'center',
  color: 'var(--text-primary)',
  ':hover': {
    backgroundColor: 'var(--menu-hover)',
  },
})

const Dropdown = () => {
  const { ref, isOpen, setIsOpen } = useOutsideClick(false)
  // const { data: session } = useSession()

  return (
    <div
      css={css({ position: 'relative', zIndex: 10, margin: 'auto 0.5rem' })}
      ref={ref}
    >
      <DropdownToggle
        whileTap={{ scale: 0.5 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2, ease: 'easeIn' }}
        type='button'
        onClick={() => setIsOpen(!isOpen)}
      >
        <RiMenuFill />
      </DropdownToggle>
      {isOpen && (
        <DropdownMenu>
          <div css={css({ paddingTop: '0.25rem', paddingBottom: '0.25rem' })}>
            {menuItems.map(({ icon: Icon, href, label }) => {
              const showDivider = href === '/login'
              return (
                <React.Fragment key={href}>
                  <Link href={href}>
                    <MenuItem onClick={() => setIsOpen(!isOpen)}>
                      <Icon />
                      <span style={{ marginLeft: '0.5rem' }}>{label}</span>
                    </MenuItem>
                  </Link>
                  {showDivider && <Divider />}
                </React.Fragment>
              )
            })}
          </div>
        </DropdownMenu>
      )}
    </div>
  )
}

export default Dropdown
