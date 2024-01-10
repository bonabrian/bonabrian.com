interface ViewParams {
  slug: string
  sessionId: string
}

export interface CreateViewParams extends ViewParams {}
export interface CountUserViewsParams extends ViewParams {}
export type CountContentViewsParams = Pick<ViewParams, 'slug'>
