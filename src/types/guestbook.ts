import type { User } from './user'

export type GuestbookEntry = {
  id: string
  body: string
  createdAt: string
  user: User
}
