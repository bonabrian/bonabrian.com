export interface APISingleResponse<D> {
  data: D;
  meta?: Record<string, unknown>;
}

export interface APIListResponse<D> {
  data: D[];
  meta?: Record<string, unknown>;
}

export interface APIErrorResponse {
  message: string;
  meta?: Record<string, unknown>;
}
