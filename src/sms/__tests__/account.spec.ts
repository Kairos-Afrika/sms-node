import { Account } from '../services/account';
import { SMSAccountBalanceStub, SMSResponseStub } from './stubs/quick-sms.stub';
import { KairosConfigOptions } from './mocks/mocks';
import { lastValueFrom, of } from 'rxjs';
import { HttpStatusCode } from '../constants/http-status-code.constants';
jest.mock('../services/account', () => {
  return {
    Account: jest.fn().mockImplementation(() => {
      return {
        balance: () => jest.fn(),
      };
    }),
  };
});

describe('Account Balance', function () {
  let accountInstance: Account;
  beforeAll(() => {
    accountInstance = new Account(KairosConfigOptions);
  });

  it('should create an instance of an account with specific config ', function () {
    expect(Account).toBeCalledWith(KairosConfigOptions);
    expect(Account).toBeCalledTimes(1);
  });

  it('should return the remaining credit balance', async () => {
    jest.spyOn(accountInstance, 'balance').mockImplementation(() => {
      return of(SMSResponseStub(HttpStatusCode.OK, SMSAccountBalanceStub(), true));
    });
    const response = await lastValueFrom(accountInstance.balance());
    expect(response).toBeDefined();
    expect(response.data.credit).toBe(SMSAccountBalanceStub().credit);
  });
});
