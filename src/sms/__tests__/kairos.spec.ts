import { KairosSMS } from '../index';
import { KairosConfigOptions } from './mocks/mocks';
import { QuickSmsStub } from './stubs/quick-sms.stub';
import { SendSms } from '../services/send-sms';
import { Account } from '../services/account';
import { Contacts } from '../services/contacts';

describe('Kairos SMS with new keyword', function () {
  let kairosInstance: KairosSMS;
  let sendSMSInstance: SendSms;
  let accountInstance: Account;
  let contactInstance: Contacts;

  beforeAll(() => {
    kairosInstance = new KairosSMS(KairosConfigOptions);
    sendSMSInstance = kairosInstance.send(QuickSmsStub());
    accountInstance = kairosInstance.account();
    contactInstance = kairosInstance.contacts();
  });

  it('should create an instance of kairos sms', function () {
    expect(kairosInstance).toBeDefined();
    const response = kairosInstance.send(QuickSmsStub());
    expect(response).toBeDefined();
    expect(response.sendQuick).toBeDefined();
    expect(response.sendFlash).toBeDefined();
  });

  it('should create an instance of account', function () {
    const response = kairosInstance.account();
    expect(response).toBeDefined();
    expect(response.getBalance).toBeDefined();
  });

  it('should create an instance of account with specific config', function () {
    expect(accountInstance).toBeDefined();
  });

  it('should create an instance of send sms with specific config', function () {
    expect(sendSMSInstance).toBeDefined();
  });

  it('should define account methods', function () {
    expect(accountInstance.getBalance).toBeDefined();
  });

  it('should define sms methods', function () {
    expect(sendSMSInstance.sendQuick).toBeDefined();
    expect(sendSMSInstance.sendFlash).toBeDefined();
  });

  it('should define contact methods', function () {
    expect(contactInstance.createContact).toBeDefined();
    expect(contactInstance.getContacts).toBeDefined();
    expect(contactInstance.updateContact).toBeDefined();
    expect(contactInstance.deleteContact).toBeDefined();
  });
});
