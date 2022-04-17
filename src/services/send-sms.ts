import { IBulkSMSBody, IKairosSMSOptions, IResponse, ISingleSMSBody } from '../types/interfaces';
import { Api } from '../api';
import { APIEndpoints } from '../constants/api-endpoints.constants';
import { catchError, map, Observable, of } from 'rxjs';
import { buildSMSResponse } from '../utils/helpers';
import { HttpStatusCode } from '../constants/http-status-code.constants';
import * as Http from 'http';

class SendSms {
  /**
   * API call x-access-token and x-access-secret configurations here
   * @private
   */
  private readonly options;
  /**
   * Request body to be passed for sending the sms
   * @private
   */
  private readonly data;

  /**
   * A constructor definition for setting Kairos SMS API credentials and request body
   * @param options
   * @param data
   */
  constructor(options: IKairosSMSOptions, data: ISingleSMSBody | IBulkSMSBody) {
    this.options = options;
    this.data = data;
  }

  /**
   * Send the sms as a quick one
   */
  asQuick(): Observable<IResponse<any>> {
    return Api(this.options)
      .post(APIEndpoints.SEND_QUICK_SMS, this.data as ISingleSMSBody)
      .pipe(
        map((response) => buildSMSResponse(HttpStatusCode.OK, `SMS successfully scheduled`, response?.data, true)),
        catchError((err) =>
          of(
            buildSMSResponse(
              err?.statusCode ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
              err?.response?.data?.message,
              err,
              false,
            ),
          ),
        ),
      );
  }

  /**
   * Send sms as bulk sms
   */
  asBulk(): Observable<IResponse<any>> {
    return Api(this.options)
      .post(APIEndpoints.SEND_BULK_SMS, this.data as IBulkSMSBody)
      .pipe(
        map((response) => buildSMSResponse(HttpStatusCode.OK, `Bulk SMS successfully scheduled`, response?.data, true)),
        catchError((err) =>
          of(
            buildSMSResponse(
              err?.statusCode ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
              err?.response?.data?.message,
              err,
              false,
            ),
          ),
        ),
      );
  }
}

export { SendSms };
