import { Account } from '../services/account';
import { KairosConfigOptions } from './mocks/mocks';
import { lastValueFrom, of } from 'rxjs';
import { HttpStatusCode } from '../constants/http-status-code.constants';
import { buildSMSResponse } from '../utils/helpers';
import { Balance } from '../types/account.types';

describe('Account Balance', function () {
  let accountInstance: Account;
  beforeAll(() => {
    accountInstance = new Account(KairosConfigOptions);
  });

  it('should create an instance of an account with specific config ', function () {
    expect(accountInstance).toBeInstanceOf(Account);
  });

  it('should return the remaining credit balance', async () => {
    const balanceData: Balance = {
      id: '1234',
      credit: 100,
      totalAmount: 1000,
      user: {
        id: '1',
        name: 'Test User',
        username: null,
        phone: '+233123456789',
      },
    };

    jest.spyOn(accountInstance, 'getBalance').mockImplementation(() => {
      return of(buildSMSResponse<Balance>(HttpStatusCode.OK, 'Balance retrieved successfully', balanceData, true));
    });

    const response = await lastValueFrom(accountInstance.getBalance());
    expect(response).toBeDefined();
    expect(response.data.credit).toBe(balanceData.credit);
    expect(response.statusCode).toBe(HttpStatusCode.OK);
    expect(response.success).toBeTruthy();
  });

  it('should handle balance retrieval failure', async () => {
    jest.spyOn(accountInstance, 'getBalance').mockImplementation(() => {
      return of(
        buildSMSResponse<Balance>(
          HttpStatusCode.FORBIDDEN,
          'Failed to retrieve balance',
          {
            id: '0',
            credit: 0,
            totalAmount: 0,
            user: {
              id: '',
              name: '',
              username: null,
              phone: '',
            },
          },
          false,
        ),
      );
    });

    const response = await lastValueFrom(accountInstance.getBalance());
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(HttpStatusCode.FORBIDDEN);
    expect(response.success).toBeFalsy();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
