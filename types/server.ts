export interface APISingleResponse<D extends unknown> {
  data: D;
  meta?: Record<string, unknown>;
}

export interface APIListResponse<D extends unknown> {
  data: D[];
  meta?: Record<string, unknown>;
}

export interface APIErrorResponse {
  message: string;
  meta?: Record<string, unknown>;
}
