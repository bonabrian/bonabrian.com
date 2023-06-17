'use client'

import cx from 'classnames'
import { m } from 'framer-motion'

import Container from './container'

interface PageHeaderProps {
  title: string
  description?: string
}

const animation = {
  hide: { x: -32, opacity: 0 },
  show: { x: 0, opacity: 1 },
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div
      className={cx('bg-pattern pt-16 pb-12', 'md:pb-16 md:pt-24', 'lg:pt-32')}
    >
      <Container
        className={cx('pointer-events-none select-none overflow-hidden')}
      >
        <m.div
          initial={animation.hide}
          animate={animation.show}
          transition={{ delay: 0.1 }}
        >
          <h1
            className={cx(
              'font-extrabold text-4xl leading-tight',
              'md:text-5xl md:leading-tight',
              'lg:text-6xl lg:leading-tight',
            )}
          >
            {title}
          </h1>
        </m.div>
        {description && (
          <m.div
            initial={animation.hide}
            animate={animation.show}
            transition={{ delay: 0.2 }}
          >
            <p className={cx('mt-4 text-lg', 'md:text-xl')}>{description}</p>
          </m.div>
        )}
      </Container>
    </div>
  )
}

export default PageHeader
