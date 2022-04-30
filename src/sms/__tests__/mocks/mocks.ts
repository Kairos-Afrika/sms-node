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

export const AccountContacts = {
  id: 2506,
  uuid: '234695fb-94c8-4ff5-a8fe-292fea6f2724',
  createdAt: '2022-04-01T16:51:58.149Z',
  updatedAt: '2022-04-01T16:51:58.149Z',
  deletedAt: null,
  name: 'sdafsdfsaf',
  slug: 'sdafsdfsaf',
  phone: '0500949999',
  dateOfBirth: null,
  allowBirthdayNotifications: true,
};

export const AccountContactsList = [AccountContacts];
