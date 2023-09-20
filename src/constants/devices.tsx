import { Laptop, Smartphone } from '@/components/icons'
import type { DeviceInfo } from '@/types/spotify'

export const PAIR_DEVICES: Record<string, DeviceInfo> = {
  Computer: {
    icon: <Laptop />,
    model: 'MacBook Air M1',
    id: 'bonabrian-mac',
  },
  Smartphone: {
    icon: <Smartphone />,
    model: 'Iphone 11',
    id: 'bonabrian-iphone',
  },
}
