import { IBulkSMSBody, IKairosSMSOptions, ISingleSMSBody } from './types/interfaces';
import { SendSms } from './services/send-sms';
import { Account } from './services/account';

class KairosSMS {
  private readonly config: IKairosSMSOptions;
  constructor(config: IKairosSMSOptions) {
    this.config = config;
  }
  static create(options: IKairosSMSOptions) {
    return new KairosSMS(options);
  }

  /**
   * Defined method for handling checking of account balance and other related acc activities
   */
  account(): Account {
    return new Account(this.config);
  }

  /**
   * Defined method for handling the sending of  sms
   * @type ISMSBody
   * @param body
   */
  send(body: ISingleSMSBody | IBulkSMSBody | string): SendSms {
    return new SendSms(this.config, body);
  }

  /**
   * Static definitions for account balance checker
   * @param config
   */
  static account(config: IKairosSMSOptions): Account {
    return new Account(config);
  }

  /**
   * Static definitions for sending of sms
   * @param config
   * @param body
   */
  static send(config: IKairosSMSOptions, body: ISingleSMSBody | IBulkSMSBody | string): SendSms {
    return new SendSms(config, body);
  }
}

export default KairosSMS;
export { KairosSMS };
