import { RiErrorWarningFill } from 'react-icons/ri'

type ErrorMessageProps = {
  children: React.ReactNode
}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <p className='flex items-center text-sm font-bold text-danger-800 dark:text-danger-400 my-1 sm:my-2'>
      <RiErrorWarningFill className='mr-2 h-4 w-4' />
      {children}
    </p>
  )
}

export default ErrorMessage
