import { IKairosSMSOptions } from '../types/interfaces';
import { Api } from '../api';
import { APIEndpoints } from '../constants/api-endpoints.constants';
import { catchError, map, of } from 'rxjs';
import { buildSMSResponse } from '../utils/helpers';
import { HttpStatusCode } from '../constants/http-status-code.constants';

class Account {
  /**
   * API call x-access-token and x-access-secret configurations here
   * @private
   */
  private readonly options;
  constructor(options: IKairosSMSOptions) {
    this.options = options;
  }

  balance() {
    return Api(this.options)
      .get(APIEndpoints.GET_ACCOUNT_BALANCE)
      .pipe(
        map((response) =>
          buildSMSResponse(HttpStatusCode.OK, `Current customer account balance`, response?.data, true),
        ),
        catchError((err) =>
          of(
            buildSMSResponse(
              err?.response?.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
              err?.response?.data?.message,
              err,
              false,
            ),
          ),
        ),
      );
  }
}

export { Account };
