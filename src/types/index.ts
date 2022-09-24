export type ConvertUndefined<T> = OrUndefined<{
  [K in keyof T as undefined extends T[K] ? K : never]-?: T[K]
}>
export type OrUndefined<T> = { [K in keyof T]: T[K] | undefined }
export type PickRequired<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K]
}
export type ConvertPick<T> = ConvertUndefined<T> & PickRequired<T>

export * from './content'
export * from './form'
export * from './post'
export * from './project'
export * from './skill'
export * from './snippet'
export * from './user'
