export interface IKairosSMSOptions {
  /**
   * API Key for the sms
   * @description A generated API Key from the Kairos Afrika SMS Portal (https://kairosafrika.com)
   */
  apiKey: string;
  /**
   * API Secret for the sms
   * @description A generated secret from the  Kairos Afrika SMS Portal (https://kairosafrika.com)
   */
  apiSecret: string;
  /**
   * API call timeout
   * @description The amount of time in milliseconds which the api call should abort the request
   * @default 8000
   */
  timeout?: number;
}

interface ISMSBody {
  /**
   * MSISDN
   * @description Contact number of which the message is to be sent to
   */
  to: string;

  /**
   * SENDER ID
   * @description The originator of the message, these sender ids are created on the kairos afrika's portal and requires approval to be able to use it
   */
  from: string;

  /**
   * MESSAGE
   * @description The content of the message to be sent to the 3rd party
   */
  message: string;
  /**
   * TYPE
   * @description How the message should be shown on the 3rd party's handset, Accepts one of two values ['Quick', 'Flash']
   * @default Quick
   */
  type?: ISMSType;
}

/**
 * Types of sms
 */
type ISMSType = 'Quick' | "Flash";

/**
 * Generic API Call Response
 */
export interface IResponse<T> {
  statusCode: number | string;
  statusMessage: string;
  timestamp: string;
  success: boolean;
  data: T;
}

export type ISingleSMSBody = ISMSBody;

export interface IBulkSMSBody {
  messages: ReadonlyArray<ISMSBody>;
}

/**
 * Account balance type definition
 */
export interface IBalance {
  id: string | number;
  credit: number | string;
  totalAmount: number | string;
  userId: IUser;
}

/**
 * User type definition
 */
export interface IUser {
  id: string | number;
  username: string | null;
  name: string;
  phone: string;
}

export interface IPaginateOption<T> {
  content: ReadonlyArray<T>;
  limit: number;
  total: number;
  pages: number;
  page: number;
  links?: ILinks;
}

export interface ILinks {
  previousPage?: string;
  nextPage?: string;
}
