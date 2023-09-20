import { response } from '@/lib/api'
import { getAvailableDevices } from '@/lib/spotify'

export const dynamic = 'force-dynamic'

export const GET = async () => {
  try {
    const devices = await getAvailableDevices()

    return response(devices)
  } catch {
    return response({ isPlaying: false })
  }
}
