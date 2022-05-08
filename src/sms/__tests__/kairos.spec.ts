import { KairosSMS } from '../index';
import { KairosConfigOptions } from './mocks/mocks';
import { IBulkSMSBody, ISingleSMSBody } from '../types/interfaces';
import { SendSms } from '../services/send-sms';
import { QuickSmsStub } from './stubs/quick-sms.stub';
import { Account } from '../services/account';
import Contacts from '../services/contacts';
jest.mock('../index', () => ({
  KairosSMS: jest.fn().mockImplementation(() => {
    return {
      send: () =>
        jest.fn().mockImplementation(() => {
          return new SendSms(KairosConfigOptions, '2');
        }),
      account: () => jest.fn(),
      contacts: () => jest.fn(),
    };
  }),
}));

jest.mock('../services/send-sms', () => {
  return {
    SendSms: jest.fn().mockImplementation(() => {
      return {
        asQuick: () => jest.fn(),
        asQuickMultipleMSISDN: () => jest.fn(),
        asPing: () => jest.fn(),
        asBulk: () => jest.fn(),
      };
    }),
  };
});

jest.mock('../services/account', () => {
  return {
    Account: jest.fn().mockImplementation(() => {
      return {
        balance: () => jest.fn(),
      };
    }),
  };
});

jest.mock('../services/contacts');

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
    expect(response.asQuickMultipleMSISDN).toBeDefined();
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
