import cx from 'classnames'

interface ContainerProps {
  children: React.ReactNode
  wide?: boolean
}

const Container = ({ children, wide }: ContainerProps) => {
  return (
    <div
      className={cx(
        'flex mx-auto w-full px-4',
        'sm:px-12 md:px-10 lg:px-16 xl:px-6',
        wide ? 'max-w-12xl' : 'max-w-6xl',
      )}
    >
      {children}
    </div>
  )
}

export default Container
