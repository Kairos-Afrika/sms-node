import { Observable, catchError, map, of } from 'rxjs';
import { KairosSMSConfig } from '../types/config.types';
import {
  Contact,
  ContactCreateInput,
  ContactResponse,
  ContactsListResponse,
  ContactsOptions,
  ContactPaginatedResponse,
} from '../types/contacts.types';
import { Api } from '../api';
import { APIEndpoints } from '../constants/api-endpoints.constants';
import { buildSMSResponse } from '../utils/helpers';
import { HttpStatusCode } from '../constants/http-status-code.constants';
import { ApiResponse } from '../types/common.types';

/**
 * Service for managing contacts
 */
export class Contacts {
  private readonly defaultPage = 1;
  private readonly defaultSize = 15;
  private readonly defaultSort = 'DESC';
  private readonly defaultPayload: ContactCreateInput = {
    name: '',
    phone: '',
    dateOfBirth: null,
  };

  private readonly page: number;
  private readonly size: number;
  private readonly sort: string;
  private readonly payload: ContactCreateInput;

  /**
   * Creates an instance of Contacts service
   * @param config - Configuration for API authentication
   * @param options - Optional settings for pagination and contact data
   */
  constructor(
    private readonly config: KairosSMSConfig,
    options?: ContactsOptions,
  ) {
    this.page = options?.paginate?.page ?? this.defaultPage;
    this.size = options?.paginate?.size ?? this.defaultSize;
    this.sort = this.defaultSort;
    this.payload = options?.body ?? this.defaultPayload;
  }

  /**
   * Creates a new contact
   * @returns Observable with the created contact
   */
  public createContact(): Observable<ContactResponse> {
    return Api(this.config)
      .post(APIEndpoints.CREATE_CONTACT, this.payload)
      .pipe(
        map((response) =>
          buildSMSResponse<Contact>(
            HttpStatusCode.CREATED,
            'Contact created successfully',
            response?.data,
            true,
          ),
        ),
        catchError((error) => this.handleError<Contact>(error)),
      );
  }

  /**
   * Retrieves all contacts with pagination
   * @returns Observable with paginated contacts
   */
  public getContacts(): Observable<ContactsListResponse> {
    const params = new URLSearchParams({
      page: this.page.toString(),
      size: this.size.toString(),
      sort: this.sort,
    });

    return Api(this.config)
      .get(`${APIEndpoints.GET_CONTACTS}?${params.toString()}`)
      .pipe(
        map((response) =>
          buildSMSResponse<ContactPaginatedResponse>(
            HttpStatusCode.OK,
            'Contacts retrieved successfully',
            response?.data,
            true,
          ),
        ),
        catchError((error) => this.handleError<ContactPaginatedResponse>(error)),
      );
  }

  /**
   * Updates an existing contact
   * @param contactId - ID of the contact to update
   * @returns Observable with the updated contact
   */
  public updateContact(contactId: string): Observable<ContactResponse> {
    return Api(this.config)
      .patch(APIEndpoints.UPDATE_CONTACT.replace('{id}', contactId), this.payload)
      .pipe(
        map((response) =>
          buildSMSResponse<Contact>(
            HttpStatusCode.OK,
            'Contact updated successfully',
            response?.data,
            true,
          ),
        ),
        catchError((error) => this.handleError<Contact>(error)),
      );
  }

  /**
   * Deletes a contact
   * @param contactId - ID of the contact to delete
   * @returns Observable with the deletion result
   */
  public deleteContact(contactId: string): Observable<ContactResponse> {
    return Api(this.config)
      .delete(APIEndpoints.DELETE_CONTACT.replace('{id}', contactId))
      .pipe(
        map((response) =>
          buildSMSResponse<Contact>(
            HttpStatusCode.OK,
            'Contact deleted successfully',
            response?.data,
            true,
          ),
        ),
        catchError((error) => this.handleError<Contact>(error)),
      );
  }

  /**
   * Handles API errors
   * @param error - Error from the API
   * @returns Observable with error response
   */
  private handleError<T>(error: any): Observable<ApiResponse<T>> {
    return of(
      buildSMSResponse<T>(
        error?.response?.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
        error?.response?.data?.message ?? 'Operation failed',
        error,
        false,
      ),
    );
  }
}