import { IBulkSMSBody, IKairosSMSOptions, IResponse, ISingleSMSBody } from '../types/interfaces';
import { Api } from '../api';
import { APIEndpoints } from '../constants/api-endpoints.constants';
import { catchError, map, Observable, of } from 'rxjs';
import { buildSMSResponse } from '../utils/helpers';
import { HttpStatusCode } from '../constants/http-status-code.constants';

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
  constructor(options: IKairosSMSOptions, data: ISingleSMSBody | IBulkSMSBody | string) {
    this.options = options;
    this.data = data;
  }

  /**
   * Send the sms as a quick one
   */
  asQuick(): Observable<IResponse<any>> {
    if (typeof this.data !== 'object') {
      of(
        buildSMSResponse(
          HttpStatusCode.BAD_REQUEST,
          'Invalid request body passed',
          { message: 'Request body must be an object' },
          false,
        ),
      );
    }
    return Api(this.options)
      .post(APIEndpoints.SEND_QUICK_SMS, this.data as ISingleSMSBody)
      .pipe(
        map((response) => buildSMSResponse(HttpStatusCode.OK, `SMS successfully scheduled`, response?.data, true)),
        catchError((err) =>
          of(
            buildSMSResponse(
              err?.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
              err?.response?.data?.message,
              err,
              false,
            ),
          ),
        ),
      );
  }

  asQuickMultipleMSISDN() {
    return Api(this.options)
      .post(APIEndpoints.SEND_QUICK_MULTIPLE_MSISDN, this.data as ISingleSMSBody)
      .pipe(
        map((response) => buildSMSResponse(HttpStatusCode.OK, `SMS successfully scheduled`, response?.data, true)),
        catchError((err) =>
          of(
            buildSMSResponse(
              err?.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
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
    if (
      !Object(this.data as IBulkSMSBody).hasOwnProperty('messages') ||
      !Array.isArray((this.data as IBulkSMSBody)?.messages)
    ) {
      return of(
        buildSMSResponse(
          HttpStatusCode.BAD_REQUEST,
          'Invalid request body passed',
          { message: `Request body must be an array` },
          false,
        ),
      );
    }
    return Api(this.options)
      .post(APIEndpoints.SEND_BULK_SMS, this.data as IBulkSMSBody)
      .pipe(
        map((response) => buildSMSResponse(HttpStatusCode.OK, `Bulk SMS successfully scheduled`, response?.data, true)),
        catchError((err) =>
          of(
            buildSMSResponse(
              err?.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
              err?.response?.data?.message,
              err,
              false,
            ),
          ),
        ),
      );
  }

  /**
   * Ping the status of a sent sms
   */
  asPing(): Observable<IResponse<any>> {
    if (typeof this.data !== 'string') {
      return of(
        buildSMSResponse(
          HttpStatusCode.BAD_REQUEST,
          'Invalid path params passed',
          { message: 'URl accept the id of sent message' },
          false,
        ),
      );
    }
    return Api(this.options)
      .get(APIEndpoints.PING_SMS_STATUS.replace('{sms_id}', this.data as string))
      .pipe(
        map((response) => buildSMSResponse(HttpStatusCode.OK, `SMS response details`, response?.data, true)),
        catchError((err) =>
          of(
            buildSMSResponse(
              err?.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
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
