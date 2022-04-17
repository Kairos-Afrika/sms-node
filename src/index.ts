import { IBulkSMSBody, IKairosSMSOptions, ISingleSMSBody } from './types/interfaces';
import { SendSms } from './services/send-sms';
import { Account } from './services/account';

class KairosSMS {
  private readonly options: IKairosSMSOptions;
  constructor(options: IKairosSMSOptions) {
    this.options = options;
  }
  static create(options: IKairosSMSOptions) {
    return new KairosSMS(options);
  }

  /**
   * Defined method for handling checking of account balance and other related acc activities
   */
  account(): Account {
    return new Account(this.options);
  }

  /**
   * Defined method for handling the sending of  sms
   * @type ISMSBody
   * @param body
   */
  send(body: ISingleSMSBody | IBulkSMSBody | string): SendSms {
    return new SendSms(this.options, body);
  }
}

export default KairosSMS;
export { KairosSMS };

const lord = KairosSMS.create({ apiKey: 'xxxxx', apiSecret: 'xxxxx' });
const response = lord.account().balance();
