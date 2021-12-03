export type ApiStandardErrorCode =
  | 'FORBIDDEN'
  | 'BAD_REQUEST'
  | 'NOT_FOUND'
  | 'INTERNAL_SERVER_ERROR';

export type ApiSuccessResponse<S extends unknown> = S;

export type ApiErrorResponse<C extends string = ApiStandardErrorCode> = {
  code: C;
  message?: string;
};

export type ApiResponse<S, E extends string = ApiStandardErrorCode> =
  | ApiSuccessResponse<S>
  | ApiErrorResponse<E>;
