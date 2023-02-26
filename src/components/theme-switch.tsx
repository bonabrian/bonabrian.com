import { Switch } from '@headlessui/react'
import { RiMoonFill, RiSunFill } from 'react-icons/ri'

import { useDarkTheme } from '@/hooks'

const ThemeSwitch = () => {
  const { isDark, mounted, setTheme } = useDarkTheme()

  return (
    <div className="flex items-center w-12 h-6 ml-4">
      {mounted && (
        <Switch
          checked={isDark}
          onChange={() => setTheme(isDark ? 'light' : 'dark')}
          className={`${
            isDark ? 'bg-gray-700' : 'bg-gray-300'
          } relative inline-flex shrink-0 h-6 w-12 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use settings</span>
          <div className="flex items-center border-4 h-6 w-6 border-transparent absolute text-gray-900 dark:text-gray-100 transition ease-in-out duration-200">
            {isDark ? (
              <RiSunFill className="translate-x-6" />
            ) : (
              <RiMoonFill className="translate-x-0" />
            )}
          </div>
          <span
            aria-hidden="true"
            className={`${
              isDark ? 'translate-x-0 ' : 'translate-x-6'
            } bg-gray-100 pointer-events-none inline-block h-6 w-6 rounded-full shadow-lg transform ring-0 transition ease-in-out duration-200`}
          />
        </Switch>
      )}
    </div>
  )
}

export default ThemeSwitch
