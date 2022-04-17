import { SendSms } from '../services/send-sms';
import { KairosConfigOptions, QuickSMSBody } from './mocks/mocks';
import { lastValueFrom, of } from 'rxjs';
import { SMSResponseStub } from './stubs/quick-sms.stub';

jest.mock('../services/send-sms', () => {
  return {
    SendSms: jest.fn().mockImplementation(() => {
      return {
        asQuick:() => jest.fn(),
        asPing:() => jest.fn(),
        asBulk: () => jest.fn()
      }
    })
  }
});

describe('Send SMS', function () {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  let sendSmsInstance: SendSms;
  describe('SMS Quick Requests', function () {
    beforeEach(() => {
      sendSmsInstance = new SendSms(KairosConfigOptions, QuickSMSBody);
    });

    it('should create an instance of the send sms class', function () {
      expect(sendSmsInstance).toBeDefined();
    });

    it('should return a successful response for a quick sms', async () => {
      jest.spyOn(sendSmsInstance, 'asQuick').mockImplementation(() => {
        return of(SMSResponseStub(200, true, true));
      });
      const response = await lastValueFrom(sendSmsInstance.asQuick());
      expect(response.data).toBeTruthy();
      expect(response.statusCode).toBe(200);
      expect(response.success).toBeTruthy();
    });

    it('should return a failed response for a quick sms', async () => {
      jest.spyOn(sendSmsInstance, 'asQuick').mockImplementation(() => {
        return of(SMSResponseStub(403, { message: 'Account is low on credit' }, false));
      });
      const response = await lastValueFrom(sendSmsInstance.asQuick());
      expect(response).toBeDefined();
      expect(response.data).toHaveProperty(['message']);
      expect(response.data.message).toBe('Account is low on credit');
      expect(response.statusCode).toBe(403);
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
