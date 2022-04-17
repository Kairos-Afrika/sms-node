import { ISMSBody } from '../../types/interfaces';
import { QuickSMSBody, SMSResponse } from '../mocks/mocks';

export const QuickSmsStub = (): ISMSBody => {
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
