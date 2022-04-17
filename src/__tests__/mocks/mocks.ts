import { ISingleSMSBody } from '../../types/interfaces';

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

export const BulkSMSBody: ReadonlyArray<ISingleSMSBody> = [QuickSMSBody];

export const SMSResponse = {
  statusCode: 200,
  statusMessage: 'Sms scheduled successfully',
  data: true,
  timestamp: new Date().toISOString(),
  success: true,
};
