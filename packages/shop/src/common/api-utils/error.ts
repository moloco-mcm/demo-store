import { ApiErrorResponse, ApiStandardErrorCode } from '../types/api-response';

const STANDARD_ERROR_CODE_TO_MESSAGE_MAP: Record<ApiStandardErrorCode, string> =
  {
    FORBIDDEN: 'Not authorized',
    BAD_REQUEST: 'Invalid request',
    NOT_FOUND: 'Resource not found',
    INTERNAL_SERVER_ERROR: 'Internal error',
  };

export const apiStandardError = (
  code: ApiStandardErrorCode,
  option?: { message?: string }
): ApiErrorResponse<ApiStandardErrorCode> => ({
  code,
  message: option?.message || STANDARD_ERROR_CODE_TO_MESSAGE_MAP[code],
});
