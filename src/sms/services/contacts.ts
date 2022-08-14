import {
  IContacts,
  IContactsOptions,
  IItemsPerPage,
  IKairosSMSOptions,
  IPagination,
  IResponse,
  SORT_ITEMS,
} from '../types/interfaces';
import { catchError, map, Observable, of } from 'rxjs';
import { APIEndpoints } from '../constants/api-endpoints.constants';
import { Api } from '../api';
import { buildSMSResponse } from '../utils/helpers';
import { HttpStatusCode } from '../constants/http-status-code.constants';

export default class Contacts {
  private readonly config: IKairosSMSOptions;
  private page: number = 1;
  private size: number = 15;
  private sort: string = 'DESC';
  private readonly payload: Pick<IContacts, 'name' | 'phone' | 'dateOfBirth'> = {
    name: '',
    phone: '',
    dateOfBirth: null,
  };

  constructor(config: IKairosSMSOptions, options?: IContactsOptions) {
    this.config = config;
    if (options) {
      if (options.paginate) {
        this.page = options.paginate?.page;
        this.size = options.paginate?.size;
      }
      if (options.body) {
        this.payload = options.body;
      }
    }
  }

  /**
   * Set the current page to show for the list of contacts
   * @param page
   */
  setPage(page: number): this {
    this.page = page;
    return this;
  }

  /**
   * Set the total items to show per page for the list of contacts
   * @param size
   */
  setSize(size: number): this {
    this.size = size;
    return this;
  }

  /**
   * Get the current page of the paginated items
   */
  get currentPage(): number {
    return this.page;
  }

  /**
   * Get the current size of the paginated items
   */
  get currentSize(): number {
    return this.size;
  }
  /**
   * Set the sort order
   * @param sort [ASC, DESC]
   */
  setSort(sort: SORT_ITEMS): this {
    this.sort = sort?.toUpperCase();
    return this;
  }

  /**
   * Get the list of all contacts paginated by perPage and size
   */
  asList(): Observable<IResponse<IPagination<IContacts>>> {
    return Api(this.config)
      .get(
        APIEndpoints.GET_CONTACT_LIST.replace('{page}', this.page?.toString())
          .replace('{size}', this.size?.toString())
          .replace('{sort}', this.sort),
      )
      .pipe(
        map((response) => buildSMSResponse(HttpStatusCode.OK, `Paginated list of contacts`, response?.data, true)),
        catchError((err) =>
          of(
            buildSMSResponse(
              err.response?.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
              err?.response?.data?.message,
              err,
              false,
            ),
          ),
        ),
      );
  }

  /**
   * Add new contact to your list of contacts on kairos afrika's portal
   * @param body is optional if passed already in the contacts() constructor
   * @param body - {name: "", phone: "", dateOfBirth: ""}
   */
  create(body?: Pick<IContacts, 'name' | 'phone' | 'dateOfBirth'>): Observable<IResponse<IContacts>> {
    if (!body && !this.payload) {
      return of(
        buildSMSResponse(
          HttpStatusCode.BAD_REQUEST,
          'Invalid request body passed',
          { message: 'Request body must be an object' },
          false,
        ),
      );
    }
    return Api(this.config)
      .post(APIEndpoints.CREATE_CONTACT_DETAILS, {
        ...(body ? body : this.payload),
      })
      .pipe(
        map((response) => buildSMSResponse(HttpStatusCode.OK, `Contact created successfully`, response?.data, true)),
        catchError((err) =>
          of(
            buildSMSResponse(
              err.response?.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
              err?.response?.data?.message,
              err,
              false,
            ),
          ),
        ),
      );
  }

  /**
   * Get the details of a particular contact
   * @param contactId id of the contact to get the details
   * @returns an observable or promise of the contact details
   */
  details(contactId: number): Observable<IResponse<IContacts>> {
    return Api(this.config)
      .get(APIEndpoints.GET_CONTACT_DETAILS.replace('{id}', contactId as unknown as string))
      .pipe(
        map((response) => buildSMSResponse(HttpStatusCode.OK, `Contact details`, response?.data, true)),
        catchError((err) =>
          of(
            buildSMSResponse(
              err.response?.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
              err?.response?.data?.message,
              err,
              false,
            ),
          ),
        ),
      );
  }

  /**
   * Update the contact details
   * @param contactId - id of the contact to be updated
   * @param body - payload of the contact to be updated
   * @returns an observable or promise of the updated contact details
   */
  update(
    contactId: number,
    body?: Pick<IContacts, 'name' | 'phone' | 'dateOfBirth'>,
  ): Observable<IResponse<IContacts>> {
    if (!body && !this.payload) {
      return of(
        buildSMSResponse(
          HttpStatusCode.BAD_REQUEST,
          'Invalid request body passed',
          { message: 'Request body must be an object' },
          false,
        ),
      );
    }

    return Api(this.config)
      .put(APIEndpoints.UPDATE_CONTACT_DETAILS.replace('{id}', contactId as unknown as string), {
        ...(body ? body : this.payload),
      })
      .pipe(
        map((response) =>
          buildSMSResponse(HttpStatusCode.OK, `Contact details updated successfully`, response?.data, true),
        ),
        catchError((err) =>
          of(
            buildSMSResponse(
              err.response?.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
              err?.response?.data?.message,
              err,
              false,
            ),
          ),
        ),
      );
  }

  /**
   * Delete a contact details
   * @param contactId - id of the contact to be deleted
   * @returns an observable or a promise of the deleted contact
   */
  delete(contactId: number): Observable<IResponse<IContacts>> {
    return Api(this.config)
      .delete(APIEndpoints.DELETE_CONTACT_DETAILS.replace('{id}', contactId as unknown as string))
      .pipe(
        map((response) => buildSMSResponse(HttpStatusCode.OK, `Contact deleted successfully`, response?.data, true)),
        catchError((err) =>
          of(
            buildSMSResponse(
              err.response?.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
              err?.response?.data?.message,
              err,
              false,
            ),
          ),
        ),
      );
  }
}
