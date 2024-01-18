import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

import { ariaAttr } from '@/utils/aria'
import cn from '@/utils/cn'

export type HTMLButtonType = 'button' | 'submit' | 'reset'

const buttonVariants = cva(
  'duration-normal relative inline-flex select-none appearance-none items-center justify-center whitespace-nowrap rounded-md align-middle text-sm font-medium outline-none outline-offset-2 transition-all disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        shadow:
          'border border-secondary-foreground bg-background shadow-[3px_3px_rgb(0_0_0_/_20%)] hover:bg-primary hover:text-primary-foreground dark:shadow-[3px_3px_rgb(255_255_255_/_40%)]',
        outline:
          'border border-input hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  disabled?: boolean
  htmlType?: HTMLButtonType
}

type ButtonContentProps = Pick<ButtonProps, 'children'>

const ButtonContent = ({ children }: ButtonContentProps) => children

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      className,
      children,
      disabled,
      htmlType = 'button',
      ...rest
    }: ButtonProps,
    ref,
  ) => {
    const contentProps = { children }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled}
        type={htmlType}
        aria-disabled={ariaAttr(disabled)}
        {...rest}
      >
        <ButtonContent {...contentProps} />
      </button>
    )
  },
)

export default Button
