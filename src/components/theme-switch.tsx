'use client'

import { Switch } from '@headlessui/react'
import cx from 'classnames'

import { useTheme } from '@/hooks'

import { Moon, Sun } from './icons'

const ThemeSwitch = () => {
  const { theme, mounted, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={cx('flex items-center w-12 h-6 ml-4')}>
      {mounted && (
        <Switch
          checked={isDark}
          onChange={() => setTheme(isDark ? 'light' : 'dark')}
          className={cx(
            'relative inline-flex shrink-0 h-6 w-12 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 bg-slate-200',
            'dark:bg-gray-600',
          )}
        >
          <span className="sr-only">Use settings</span>
          <div
            className={cx(
              'flex items-center border-4 h-6 w-6 border-transparent absolute text-gray-900 transition ease-in-out duration-200',
              'dark:text-gray-100',
            )}
          >
            {isDark ? (
              <Sun className={cx('translate-x-6')} />
            ) : (
              <Moon className={cx('translate-x-0')} />
            )}
          </div>
          <span
            aria-hidden="true"
            className={cx(
              'bg-gray-100 pointer-events-none inline-block h-6 w-6 rounded-full shadow-lg transform ring-0 transition ease-in-out duration-200 translate-x-6',
              'dark:translate-x-0',
            )}
          />
        </Switch>
      )}
    </div>
  )
}

export default ThemeSwitch
