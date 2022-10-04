import { RiCheckboxCircleFill, RiErrorWarningFill } from 'react-icons/ri'

import type { AlertProps } from './types'

const Alert = ({ message, type = 'success' }: AlertProps) => {
  const isError = type === 'error'
  const classes = isError
    ? 'text-danger-500 dark:text-danger-400'
    : 'text-success-600 dark:text-success-400'

  return (
    <p
      className={`flex items-center text-sm font-bold my-1 sm:my-2 ${classes}`}
    >
      {isError ? (
        <RiErrorWarningFill className='mr-2 h-4 w-4' />
      ) : (
        <RiCheckboxCircleFill className='mr-2 h-4 w-4' />
      )}
      {message}
    </p>
  )
}

export default Alert
