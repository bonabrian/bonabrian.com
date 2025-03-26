import type { User } from '@/types/user';

export interface Guestbook {
  id: string;
  body: string;
  createdAt: string;
  user: User;
}
