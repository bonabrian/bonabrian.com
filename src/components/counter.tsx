'use client'

import cx from 'classnames'
import { m, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'

interface CounterProps {
  count: number
}

const Counter = ({ count }: CounterProps) => {
  const controls = useAnimationControls()

  useEffect(() => {
    const startMotion = async () => {
      await controls.start({
        y: [-20, 0],
        transition: { duration: 0.15 },
      })
    }

    if (count !== 0) startMotion()
  }, [controls, count])

  return (
    <div
      className={cx(
        'relative flex items-center gap-1 h-6 overflow-hidden rounded-full py-1 px-2 bg-slate-100',
        'dark:bg-gray-700',
      )}
    >
      {count === 0 ? (
        <span
          className={cx(
            'flex flex-col font-mono text-sm font-bold text-gray-600',
            'dark:text-slate-200',
          )}
        >
          <span className={cx('flex h-5 items-center')}>0</span>
        </span>
      ) : (
        <m.span
          className={cx(
            'flex flex-col font-mono text-sm font-bold text-gray-600',
            'dark:text-slate-200',
          )}
          animate={controls}
        >
          <span className={cx('flex h-5 items-center')}>&nbsp;</span>
          <span className={cx('flex h-5 items-center')}>{count}</span>
          <span className={cx('flex h-5 items-center')}>{count - 1}</span>
        </m.span>
      )}
    </div>
  )
}

export default Counter
