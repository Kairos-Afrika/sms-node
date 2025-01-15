import { SendSms } from '../services/send-sms';
import { BulkSMSBody, KairosConfigOptions, QuickSMSBody } from './mocks/mocks';
import { lastValueFrom, of } from 'rxjs';
import { SMSResponseStub } from './stubs/quick-sms.stub';
import { HttpStatusCode } from '../constants/http-status-code.constants';
import { buildSMSResponse } from '../utils/helpers';

jest.mock('../services/send-sms', () => {
  return {
    SendSms: jest.fn().mockImplementation(() => {
      return {
        sendQuick: () => jest.fn(),
        sendFlash: () => jest.fn(),
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
      jest.spyOn(sendSmsInstance, 'sendQuick').mockImplementation(() => {
        return of(buildSMSResponse(
          HttpStatusCode.OK,
          'Message sent successfully',
          { messageId: '123', status: 'sent' },
          true
        ));
      });
      const response = await lastValueFrom(sendSmsInstance.sendQuick());
      expect(response.data).toBeTruthy();
      expect(response.statusCode).toBe(HttpStatusCode.OK);
      expect(response.success).toBeTruthy();
    });

    it('should return a failed response for a quick sms', async () => {
      jest.spyOn(sendSmsInstance, 'sendQuick').mockImplementation(() => {
        return of(buildSMSResponse(
          HttpStatusCode.FORBIDDEN,
          'Account is low on credit',
          { message: 'Account is low on credit' },
          false
        ));
      });
      const response = await lastValueFrom(sendSmsInstance.sendQuick());
      expect(response).toBeDefined();
      expect(response.data).toHaveProperty('message');
      expect(response.statusCode).toBe(HttpStatusCode.FORBIDDEN);
      expect(response.success).toBeFalsy();
    });
  });

  describe('SMS Flash Requests', function () {
    beforeEach(() => {
      sendSmsInstance = new SendSms(KairosConfigOptions, QuickSMSBody);
    });

    it('should return a successful response for a flash sms', async () => {
      jest.spyOn(sendSmsInstance, 'sendFlash').mockImplementation(() => {
        return of(buildSMSResponse(
          HttpStatusCode.OK,
          'Flash message sent successfully',
          { messageId: '123', status: 'sent' },
          true
        ));
      });
      const response = await lastValueFrom(sendSmsInstance.sendFlash());
      expect(response.data).toBeTruthy();
      expect(response.statusCode).toBe(HttpStatusCode.OK);
      expect(response.success).toBeTruthy();
    });

    it('should return a failed response for a flash sms', async () => {
      jest.spyOn(sendSmsInstance, 'sendFlash').mockImplementation(() => {
        return of(buildSMSResponse(
          HttpStatusCode.FORBIDDEN,
          'Account is low on credit',
          { message: 'Account is low on credit' },
          false
        ));
      });
      const response = await lastValueFrom(sendSmsInstance.sendFlash());
      expect(response).toBeDefined();
      expect(response.data).toHaveProperty('message');
      expect(response.statusCode).toBe(HttpStatusCode.FORBIDDEN);
      expect(response.success).toBeFalsy();
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
