import cx from 'classnames'

const Divider = () => {
  return (
    <hr
      className={cx(
        'w-full h-8 my-2 text-2xl border-none text-center font-bold animate-pulse before:content-["∿∿∿"] before:text-primary-500',
      )}
    />
  )
}

export default Divider
