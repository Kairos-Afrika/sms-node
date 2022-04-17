import { ISMSBody } from '../../types/interfaces';

export const AxiosConfigOptions = {
  baseURL: 'https://testing.com',
  timeout: 9000,
};
export const QuickSMSBody: ISMSBody = {
  to: '233200746455',
  from: 'KAIROS',
  message: 'This is a testing message',
};

export const BulkSMSBody: ReadonlyArray<ISMSBody> = [QuickSMSBody];

export const SMSResponse = {
  statusCode: 200,
  statusMessage: 'Sms scheduled successfully',
  data: true,
  timestamp: new Date().toISOString(),
  success: true,
};
