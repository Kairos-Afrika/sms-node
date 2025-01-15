import { Observable, catchError, map, of } from 'rxjs';
import { KairosSMSConfig } from '../types/config.types';
import { BulkSMSBody, SingleSMSBody } from '../types/sms.types';
import { ApiResponse } from '../types/common.types';
import { Api } from '../api';
import { APIEndpoints } from '../constants/api-endpoints.constants';
import { buildSMSResponse } from '../utils/helpers';
import { HttpStatusCode } from '../constants/http-status-code.constants';

type SMSInput = SingleSMSBody | BulkSMSBody | string;
type SMSResponse = ApiResponse<unknown>;

/**
 * Service for sending SMS messages
 */
export class SendSms {
  /**
   * Creates an instance of SendSms service
   * @param config - Configuration for API authentication
   * @param messageData - SMS message data to be sent
   */
  constructor(
    private readonly config: KairosSMSConfig,
    private readonly messageData: SMSInput,
  ) {}

  /**
   * Sends a quick SMS message
   * @returns Observable with the send operation result
   */
  public sendQuick(): Observable<SMSResponse> {
    const endpoint = this.determineQuickEndpoint();
    return this.sendMessage(endpoint);
  }

  /**
   * Sends a flash SMS message
   * @returns Observable with the send operation result
   */
  public sendFlash(): Observable<SMSResponse> {
    const endpoint = this.determineFlashEndpoint();
    return this.sendMessage(endpoint);
  }

  /**
   * Determines the appropriate endpoint for quick SMS
   * @private
   */
  private determineQuickEndpoint(): string {
    if (typeof this.messageData === 'string') {
      return APIEndpoints.SEND_QUICK_SMS_STRING;
    }
    return 'messages' in this.messageData
      ? APIEndpoints.SEND_BULK_QUICK_SMS
      : APIEndpoints.SEND_QUICK_SMS;
  }

  /**
   * Determines the appropriate endpoint for flash SMS
   * @private
   */
  private determineFlashEndpoint(): string {
    if (typeof this.messageData === 'string') {
      return APIEndpoints.SEND_FLASH_SMS_STRING;
    }
    return 'messages' in this.messageData
      ? APIEndpoints.SEND_BULK_FLASH_SMS
      : APIEndpoints.SEND_FLASH_SMS;
  }

  /**
   * Sends the SMS message to the specified endpoint
   * @param endpoint - API endpoint for sending the message
   * @returns Observable with the send operation result
   */
  private sendMessage(endpoint: string): Observable<SMSResponse> {
    return Api(this.config)
      .post(endpoint, this.messageData)
      .pipe(
        map((response) =>
          buildSMSResponse<unknown>(
            HttpStatusCode.OK,
            'Message sent successfully',
            response?.data,
            true,
          ),
        ),
        catchError((error) =>
          of(
            buildSMSResponse<unknown>(
              error?.response?.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
              error?.response?.data?.message ?? 'Failed to send message',
              error,
              false,
            ),
          ),
        ),
      );
  }
}
