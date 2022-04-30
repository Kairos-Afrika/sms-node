import { SendSms } from '../services/send-sms';
import { BulkSMSBody, KairosConfigOptions, QuickSMSBody } from './mocks/mocks';
import { lastValueFrom, of } from 'rxjs';
import { SMSResponseStub } from './stubs/quick-sms.stub';
import { HttpStatusCode } from '../constants/http-status-code.constants';

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

    it('should return a bad request', async () => {
      jest.spyOn(sendSmsInstance, 'asBulk').mockImplementation(() => {
        return of(SMSResponseStub(HttpStatusCode.BAD_REQUEST, { message: 'Request body must be an array' }, false));
      });
      const response = await lastValueFrom(sendSmsInstance.asBulk());
      expect(response).toBeDefined();
      expect(response.data.message).toBe('Request body must be an array');
      expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    });
  });

  describe('SMS Bulk Requests', function () {
    beforeEach(() => {
      sendSmsInstance = new SendSms(KairosConfigOptions, BulkSMSBody);
    });

    it('should return a successful response for bulk sms', async () => {
      jest.spyOn(sendSmsInstance, 'asBulk').mockImplementation(() => {
        return of(SMSResponseStub(HttpStatusCode.OK, true, true));
      });
      const response = await lastValueFrom(sendSmsInstance.asBulk());
      expect(response).toBeDefined();
      expect(response.data).toBeTruthy();
      expect(response.statusCode).toBe(HttpStatusCode.OK);
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
