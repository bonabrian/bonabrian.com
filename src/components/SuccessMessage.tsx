import { RiCheckboxCircleFill } from 'react-icons/ri'

type SuccessMessageProps = {
  children: React.ReactNode
}

const SuccessMessage = ({ children }: SuccessMessageProps) => {
  return (
    <p className='text-sm font-bold text-success-700 dark:text-success-400 my-1 sm:my-2'>
      <RiCheckboxCircleFill className='mr-2 h-4 w-4 inline-block' />
      {children}
    </p>
  )
}

export default SuccessMessage
