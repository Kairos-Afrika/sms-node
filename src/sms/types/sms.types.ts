/**
 * Types related to SMS functionality
 */

export type SMSType = 'Quick' | 'Flash';

export interface SMSBody {
  /**
   * Contact number to which the message will be sent
   */
  readonly to: string;

  /**
   * Approved sender ID from the Kairos Afrika portal
   */
  readonly from: string;

  /**
   * Content of the message
   */
  readonly message: string;

  /**
   * Message display type on recipient's handset
   * @default 'Quick'
   */
  readonly type?: SMSType;
}

export interface SingleSMSBody extends SMSBody {}

export interface BulkSMSBody {
  readonly messages: ReadonlyArray<SMSBody>;
}
