import { response } from '@/lib/api'
import { getAvailableDevices } from '@/lib/spotify'
import type { Device } from '@/types/spotify'

export const dynamic = 'force-dynamic'

export const GET = async () => {
  try {
    const devices = await getAvailableDevices()

    return response<Device[]>(devices)
  } catch {
    return response<{ isPlaying: boolean }>({ isPlaying: false })
  }
}
