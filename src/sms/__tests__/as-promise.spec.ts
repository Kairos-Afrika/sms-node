import { lastValueFrom, Observable, of } from 'rxjs';
import { SMSResponseStub } from './stubs/quick-sms.stub';
import * as promisesFunc from '../as-promise';
import { IResponse } from '../types/interfaces';

describe('AsPromise', function () {
  it('should convert observable to promise', async () => {
    const response = await lastValueFrom(of(SMSResponseStub(200, true, true)));
    expect(response.statusCode).toBe(200);
    expect(response.data).toBeTruthy();
    expect(response.success).toBeTruthy();
  });
});
