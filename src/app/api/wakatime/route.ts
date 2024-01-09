import {
  getAllTimeSinceToday,
  getLastSevenDaysStats,
} from '@/app/dashboard/actions'
import { getErrorMessage, response } from '@/lib/api'

export const dynamic = 'force-dynamic'

export const GET = async () => {
  try {
    const lastSevenDaysStats = await getLastSevenDaysStats()
    const allTimeSinceToday = await getAllTimeSinceToday()

    return response({
      ...lastSevenDaysStats,
      all_time_since_today: allTimeSinceToday,
    })
  } catch (err) {
    return response({ message: getErrorMessage(err) }, 500)
  }
}
