import { KairosSMSConfig } from './types/config.types';
import { BulkSMSBody, SingleSMSBody } from './types/sms.types';
import { Account } from './services/account';
import { SendSms } from './services/send-sms';
import { Contacts } from './services/contacts';
import { ContactsOptions } from './types/contacts.types';

/**
 * Main class for interacting with Kairos SMS API
 * @class KairosSMS
 */
export class KairosSMS {
  /**
   * Creates a new instance of KairosSMS
   * @param config - Configuration options for the SMS service
   */
  constructor(private readonly config: KairosSMSConfig) {}

  /**
   * Creates a new instance of KairosSMS
   * @param config - Configuration options for the SMS service
   * @returns A new KairosSMS instance
   */
  public static create(config: KairosSMSConfig): KairosSMS {
    return new KairosSMS(config);
  }

  /**
   * Provides access to account-related operations
   * @returns Account service instance
   */
  public getAccount(): Account {
    return new Account(this.config);
  }

  /**
   * Sends an SMS message
   * @param body - SMS message details
   * @returns SendSms service instance
   */
  public sendMessage(body: SingleSMSBody | BulkSMSBody | string): SendSms {
    return new SendSms(this.config, body);
  }

  /**
   * Manages contact-related operations
   * @param options - Optional contact settings
   * @returns Contacts service instance
   */
  public getContacts(options?: ContactsOptions): Contacts {
    return new Contacts(this.config, options);
  }

  /**
   * Static method to access account operations
   * @param config - Configuration options
   * @returns Account service instance
   */
  public static getAccount(config: KairosSMSConfig): Account {
    return new Account(config);
  }

  /**
   * Static method to send SMS messages
   * @param config - Configuration options
   * @param body - SMS message details
   * @returns SendSms service instance
   */
  public static sendMessage(config: KairosSMSConfig, body: SingleSMSBody | BulkSMSBody | string): SendSms {
    return new SendSms(config, body);
  }

  /**
   * Static method to manage contacts
   * @param config - Configuration options
   * @param options - Optional contact settings
   * @returns Contacts service instance
   */
  public static getContacts(config: KairosSMSConfig, options?: ContactsOptions): Contacts {
    return new Contacts(config, options);
  }
}
