import type { IconType } from 'react-icons'

export interface MetricCardProps {
  link: string
  text: string
  value: string
  icon?: IconType
  loading?: boolean
}
