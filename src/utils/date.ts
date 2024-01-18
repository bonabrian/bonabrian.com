import { format, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export const formatDate = (
  date: string,
  dateFormat: string = 'MMMM dd, yyyy',
) => {
  const formattedDate = format(
    utcToZonedTime(parseISO(date), 'Asia/Jakarta'),
    dateFormat,
  )

  return formattedDate
}
