import type { User } from './users'

export type Skill = {
  id: string
  name: string
  users: User[]
}

export type SkillCategory = {
  name: string
  skills: Skill[]
}
