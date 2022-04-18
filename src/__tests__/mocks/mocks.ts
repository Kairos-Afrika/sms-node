import { IBalance, ISingleSMSBody } from '../../types/interfaces';

export const AxiosConfigOptions = {
  baseURL: 'https://testing.com',
  timeout: 9000,
};

export const KairosConfigOptions = {
  apiKey: 'xxxxxxxxx',
  apiSecret: 'xxxxxxxxxxx',
};

export const QuickSMSBody: ISingleSMSBody = {
  to: '233200746455',
  from: 'KAIROS',
  message: 'This is a testing message',
};

export const BulkSMSBody: { messages: ReadonlyArray<ISingleSMSBody> } = { messages: [QuickSMSBody] };

export const SMSResponse = {
  statusCode: 200,
  statusMessage: 'Sms scheduled successfully',
  data: true,
  timestamp: new Date().toISOString(),
  success: true,
};

export const SMSAccountBalance: IBalance = {
  id: 2,
  credit: '8',
  totalAmount: '0',
  userId: {
    id: 7,
    name: 'New User',
    username: null,
    phone: '0200384773',
  },
};
