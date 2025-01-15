import { ApiResponse } from './common.types';

/**
 * Base contact information
 */
export interface Contact {
  readonly id: number;
  readonly name: string;
  readonly phone: string;
  readonly dateOfBirth: string | null;
  readonly slug: string;
  readonly uuid: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly allowBirthdayNotifications: boolean;
}

/**
 * Input for creating or updating a contact
 */
export interface ContactCreateInput {
  readonly name: string;
  readonly phone: string;
  readonly dateOfBirth?: string | null;
}

/**
 * Pagination settings for contacts
 */
export interface ContactPaginationOptions {
  readonly page: number;
  readonly size: number;
}

/**
 * Options for contact operations
 */
export interface ContactsOptions {
  readonly body?: ContactCreateInput;
  readonly paginate?: ContactPaginationOptions;
}

/**
 * Paginated data structure for contacts
 */
export interface ContactPaginatedData {
  readonly docs: ReadonlyArray<Contact>;
  readonly limit: number;
  readonly total: number;
  readonly page: number;
  readonly pages: number;
}

/**
 * Metadata for paginated responses
 */
export interface ContactPaginationMeta {
  readonly itemCount: number | null;
  readonly limit: number | null;
}

/**
 * Full paginated response structure
 */
export interface ContactPaginatedResponse {
  readonly paginateObj: ContactPaginatedData;
  readonly meta: ContactPaginationMeta;
}

/**
 * API response types for contacts
 */
export type ContactResponse = ApiResponse<Contact>;
export type ContactsListResponse = ApiResponse<ContactPaginatedResponse>;
