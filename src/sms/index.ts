import { IBulkSMSBody, IContactsOptions, IKairosSMSOptions, ISingleSMSBody } from './types/interfaces';
import { SendSms } from './services/send-sms';
import { Account } from './services/account';
import { Contacts } from './services/contacts';

class KairosSMS {
  private readonly config: IKairosSMSOptions;

  /**
   * Kairos SMS constructor
   * @param config
   */
  constructor(config: IKairosSMSOptions) {
    this.config = config;
  }

  /**
   * Create an instance of KairosSMS Using the static create
   * @param config
   */
  static create(config: IKairosSMSOptions) {
    return new KairosSMS(config);
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
   * Defined method for handling actions on customer contacts
   * @param options
   */
  contacts(options?: IContactsOptions): Contacts {
    return new Contacts(this.config, options);
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

  /**
   * Static definitions for contacts impl.
   */
  static contacts(config: IKairosSMSOptions, options?: IContactsOptions): Contacts {
    return new Contacts(config, options);
  }
}

export default KairosSMS;
export { KairosSMS };
