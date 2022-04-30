import * as promisesFunc from '../as-promise';
import { lastValueFrom, Observable, of } from 'rxjs';
import { SMSResponseStub } from './stubs/quick-sms.stub';
import { IResponse } from '../types/interfaces';
jest.mock('../as-promise');
describe('AsPromise', function () {
  it('should convert an observable to a promise', async () => {
    jest.spyOn(promisesFunc, 'asPromise').mockImplementation((response: Observable<IResponse<any>>) => {
      return lastValueFrom(response);
    });
    const response = await promisesFunc.asPromise(of(SMSResponseStub(200, true, true)));
    expect(response).toBeDefined();
    await expect(promisesFunc.asPromise(of(SMSResponseStub(200, true, true)))).resolves.toStrictEqual(
      SMSResponseStub(200, true, true),
    );
  });
});
