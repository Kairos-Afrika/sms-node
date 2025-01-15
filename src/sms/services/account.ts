import { Observable, catchError, map, of } from 'rxjs';
import { KairosSMSConfig } from '../types/config.types';
import { AccountBalanceResponse, Balance } from '../types/account.types';
import { Api } from '../api';
import { APIEndpoints } from '../constants/api-endpoints.constants';
import { buildSMSResponse } from '../utils/helpers';
import { HttpStatusCode } from '../constants/http-status-code.constants';

/**
 * Service for managing account-related operations
 */
export class Account {
  /**
   * Creates an instance of Account service
   * @param config - Configuration for API authentication
   */
  constructor(private readonly config: KairosSMSConfig) {}

  /**
   * Retrieves the current account balance
   * @returns Observable with account balance information
   */
  public getBalance(): Observable<AccountBalanceResponse> {
    return Api(this.config)
      .get(APIEndpoints.GET_ACCOUNT_BALANCE)
      .pipe(
        map((response) =>
          buildSMSResponse<Balance>(
            HttpStatusCode.OK,
            'Current customer account balance',
            response?.data,
            true,
          ),
        ),
        catchError((error) =>
          of(
            buildSMSResponse<Balance>(
              error?.response?.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
              error?.response?.data?.message ?? 'Failed to get balance',
              error,
              false,
            ),
          ),
        ),
      );
  }
}
