export type ReactionResponse = {
  loves: number
  likes: number
  stars: number
}

export type ReactionState = {
  loved: boolean
  liked: boolean
  starred: boolean
}

export type ReactionType = keyof ReactionState
export type ReactionModifier = 'increment' | 'decrement'
