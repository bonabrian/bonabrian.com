import clsx, { type ClassValue } from 'clsx';
import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { twMerge } from 'tailwind-merge';

export const cn = (...classes: ClassValue[]): string => twMerge(clsx(classes));

export const formatDate = (
  date: string,
  dateFormat: string = 'MMMM dd, yyyy',
) => format(toZonedTime(parseISO(date), 'Asia/Jakarta'), dateFormat);
