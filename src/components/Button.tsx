interface ButtonProps
  extends Omit<React.LinkHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: 'button' | 'submit' | 'reset'
  children?: React.ReactNode
}

const Button = ({ type = 'button', children, ...rest }: ButtonProps) => {
  return (
    <button
      className='px-4 py-2 w-24 h-12 flex items-center justify-center my-4 font-semibold text-lg text-white bg-primary-400 dark:bg-primary-600 hover:bg-primary-500 dark:hover:bg-primary-500 rounded'
      type={type}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
