import { IBalance, ISingleSMSBody } from '../../types/interfaces';
import { QuickSMSBody, SMSAccountBalance, SMSResponse } from '../mocks/mocks';

export const QuickSmsStub = (): ISingleSMSBody => {
  return QuickSMSBody;
};

export const SMSResponseStub = (statusCode?: number | string, data?: any, success?: boolean) => {
  return {
    ...SMSResponse,
    ...(data && {
      data,
    }),
    ...(statusCode && {
      statusCode,
    }),
    ...(success && {
      success,
    }),
  };
};

export const SMSAccountBalanceStub = (): IBalance => {
  return SMSAccountBalance;
};
