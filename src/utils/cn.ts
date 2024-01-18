import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...classes: ClassValue[]): string => {
  return twMerge(clsx(classes))
}

export default cn
