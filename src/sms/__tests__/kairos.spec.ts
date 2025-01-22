import { KairosSMS } from '../index';
import { KairosConfigOptions } from './mocks/mocks';
import { IBulkSMSBody, ISingleSMSBody } from '../types/interfaces';
import { SendSms } from '../services/send-sms';
import { QuickSmsStub } from './stubs/quick-sms.stub';
import { Account } from '../services/account';
import Contacts from '../services/contacts';

describe('Kairos SMS with new keyword', function () {
  let kairosInstance: KairosSMS;
  beforeAll(() => {
    kairosInstance = new KairosSMS(KairosConfigOptions);
  });
  it('should defined an instance of kairos', async () => {
    expect(kairosInstance).toBeDefined();
  });

  it('should return all defined methods in the kairos send class', async () => {
    jest.spyOn(kairosInstance, 'send').mockImplementation((body: ISingleSMSBody | IBulkSMSBody | string): SendSms => {
      return new SendSms(KairosConfigOptions, body);
    });
    expect(kairosInstance.send).toBeDefined();
    const response = await kairosInstance.send(QuickSmsStub());
    expect(response.asBulk).toBeDefined();
    expect(response.asQuick).toBeDefined();
    expect(response.asPing).toBeDefined();
  });

  it('should return all defined methods in the kairos account class', async () => {
    jest.spyOn(kairosInstance, 'account').mockImplementation((): Account => {
      return new Account(KairosConfigOptions);
    });
    expect(kairosInstance.account).toBeDefined();
    const response = await kairosInstance.account();
    expect(response.balance).toBeDefined();
  });

  it('should return all defined methods in the kairos contacts class', async () => {
    jest.spyOn(kairosInstance, 'contacts').mockImplementation((): Contacts => {
      return new Contacts(KairosConfigOptions, { paginate: { page: 1, size: 15 } });
    });
    expect(kairosInstance.contacts).toBeDefined();
  });
});

describe('Kairos SMS Instances with static create', function () {
  let kairosInstance: KairosSMS;
  beforeEach(() => {
    kairosInstance = KairosSMS.create(KairosConfigOptions);
  });

  it('should return an instance of kairos sms with the static create', async () => {
    expect(kairosInstance).toBeInstanceOf(KairosSMS);
    expect(kairosInstance.send).toBeDefined();
    expect(kairosInstance.account).toBeDefined();
    expect(kairosInstance.contacts).toBeDefined();
  });

  it('should return an instance of Account ', function () {
    let accountInstance = kairosInstance.account();
    expect(accountInstance).toBeInstanceOf(Account);
    expect(accountInstance.balance).toBeDefined();
  });

  it('should return an instance of SendSms ', function () {
    let sendSMSInstance = kairosInstance.send(QuickSmsStub());
    expect(sendSMSInstance).toBeInstanceOf(SendSms);
    expect(sendSMSInstance.asPing).toBeDefined();
    expect(sendSMSInstance.asQuick).toBeDefined();
    expect(sendSMSInstance.asBulk).toBeDefined();
  });

  it('should return an instance of Contacts', function () {
    let contactInstance = kairosInstance.contacts();
    expect(contactInstance).toBeInstanceOf(Contacts);
    expect(contactInstance.create).toBeDefined();
    expect(contactInstance.asList).toBeDefined();
  });
});

describe('Kairos SMS Instances with static methods', function () {
  it('should return an instance of an Account', function () {
    let kairosInstance = KairosSMS.account(KairosConfigOptions);
    expect(kairosInstance).toBeInstanceOf(Account);
  });

  it('should return an instance of an Send SMS', function () {
    let kairosInstance = KairosSMS.send(KairosConfigOptions, QuickSmsStub());
    expect(kairosInstance).toBeInstanceOf(SendSms);
  });

  it('should return an instance of Contact', function () {
    let kairosInstance = KairosSMS.contacts(KairosConfigOptions);
    expect(kairosInstance).toBeInstanceOf(Contacts);
  });
});
