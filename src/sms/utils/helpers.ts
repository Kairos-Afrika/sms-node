import { ApiResponse } from '../types/common.types';

/**
 * Builds a standardized API response
 * @param statusCode - HTTP status code
 * @param statusMessage - Response message
 * @param data - Response data
 * @param success - Whether the operation was successful
 * @returns Standardized API response
 */
export function buildSMSResponse<T>(
  statusCode: number,
  statusMessage: string,
  data: T,
  success: boolean,
): ApiResponse<T> {
  return {
    statusCode,
    statusMessage,
    success,
    data,
    timestamp: new Date().toISOString(),
  };
}
