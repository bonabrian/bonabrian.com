import clsx, { type ClassValue } from 'clsx';
import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { twMerge } from 'tailwind-merge';

export const cn = (...classes: ClassValue[]): string => twMerge(clsx(classes));

export const formatDate = (
  date: string,
  dateFormat: string = 'MMMM dd, yyyy',
) => format(toZonedTime(parseISO(date), 'Asia/Jakarta'), dateFormat);

export const trim = (text?: string, maxLength: number = 20): string =>
  (text && text.slice(0, maxLength) + (text.length > maxLength ? '...' : '')) ??
  '';

export const getContentImagePath = (path: string, image?: string): string => {
  if (image)
    return image.startsWith('http') ? image : `/media/${path}/${image}`;

  return '';
};

export const randomBetween = (min: number, max: number): number =>
  Math.random() * (max - min) + min;
