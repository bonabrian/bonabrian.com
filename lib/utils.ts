import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...classes: ClassValue[]): string => twMerge(clsx(classes));

export const calculateDuration = (
  startDate: Date | string,
  endDate: Date | string | null,
): { years: number; months: number } => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  let durationInYears = end.getFullYear() - start.getFullYear();
  let durationInMonths = end.getMonth() - start.getMonth();

  // Adjust for cases where the end month is before the start month
  if (durationInMonths < 0) {
    durationInYears--;
    durationInMonths += 12;
  }

  return {
    years: durationInYears,
    months: durationInMonths,
  };
};

export const formatDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' },
): string => {
  return new Intl.DateTimeFormat('en-US', options).format(date);
};
