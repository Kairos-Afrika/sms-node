import { IBulkSMSBody, IKairosSMSOptions, ISingleSMSBody } from './types/interfaces';
import { SendSms } from './services/send-sms';

class KairosSMS {
  private readonly options: IKairosSMSOptions;
  constructor(options: IKairosSMSOptions) {
    this.options = options;
  }
  static create(options: IKairosSMSOptions) {
    return new KairosSMS(options);
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
const response = lord.send({ to: '', message: '', from: '' }).asQuick();
