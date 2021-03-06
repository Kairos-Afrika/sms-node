import * as Helpers from '../utils/helpers';
import { SMSResponseStub } from './stubs/quick-sms.stub';
import { HttpStatusCode } from '../constants/http-status-code.constants';
import { buildSMSResponse } from '../utils/helpers';

describe('Helper Functions', function () {
  beforeAll(() => {
    jest
      .spyOn(Helpers, 'buildSMSResponse')
      .mockImplementation((statusCode: number | string, statusMessage: string, data: any, success: boolean) => {
        return SMSResponseStub(statusCode, data, success);
      });
  });

  describe('Build SMS Response', function () {
    const response = buildSMSResponse(200, 'Sms scheduled successfully', true, true);
    expect(response.data).toBeTruthy();
    expect(response.statusCode).toBe(200);
    expect(response.statusMessage).toBe('Sms scheduled successfully');
  });

  describe('SMS Responses', function () {
    it('should return a successful sms response', function () {
      const response = Helpers.buildSMSResponse(200, `Sms scheduled successfully`, false, true);
      expect(response).toBeDefined();
      expect(response.data).toBeTruthy();
      expect(response.statusCode).toBe(200);
    });
    it('should return a failed sms response', function () {
      const response = Helpers.buildSMSResponse(
        500,
        'Sms failed to schedule',
        { message: 'Invalid request made' },
        false,
      );
      expect(response).toStrictEqual(
        Helpers.buildSMSResponse(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Sms failed to schedule',
          { message: 'Invalid request made' },
          false,
        ),
      );
      expect(response.data).toHaveProperty(['message']);
      expect(response.statusCode).toBe(500);
    });
  });
});
