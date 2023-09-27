import type { User } from '@/types/user'

export type GuestbookEntry = {
  id: string
  body: string
  createdAt: string
  user: User
}
