declare global {
  interface BigInt {
    toJSON: () => string
  }
}

export * from './content'
export * from './post'
export * from './project'
export * from './reaction'
export * from './skill'
export * from './snippet'
export * from './user'
