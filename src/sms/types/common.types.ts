/**
 * Common types used across the application
 */

export type SortOrder = 'DESC' | 'ASC';

export interface ApiResponse<T> {
  readonly statusCode: number;
  readonly statusMessage: string;
  readonly timestamp: string;
  readonly success: boolean;
  readonly data: T;
}

export interface PaginationOptions {
  readonly page: number;
  readonly size: number;
}

export interface PaginationMeta {
  readonly itemCount: number | null;
  readonly limit: number | null;
}

export interface PaginatedResponse<T> {
  readonly docs: ReadonlyArray<T>;
  readonly limit: number;
  readonly total: number;
  readonly page: number;
  readonly pages: number;
}

export interface PaginatedData<T> {
  readonly paginateObj: PaginatedResponse<T>;
  readonly meta: PaginationMeta;
}
