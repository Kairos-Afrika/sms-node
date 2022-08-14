import { IContacts, IPagination, IResponse } from '../../types/interfaces';
import { AccountContacts, AccountContactsList, AccountContactsResponse } from '../mocks/mocks';

export const AccountContactsStub = (
  statusCode: number,
  statusMessage: string,
  success: boolean,
  data?: string,
  page?: number,
  size?: number,
): IResponse<IPagination<IContacts>> => {
  return {
    success,
    statusCode: statusCode,
    statusMessage,
    timestamp: new Date().toISOString(),
    data: {
      paginateObj: {
        docs: AccountContactsList,
        limit: size ?? 15,
        page: page ?? 1,
        pages: 1,
        total: 3,
      },
      meta: {
        item_count: 3,
        limit: 15,
      },
    },
  };
};

export const CreateAccountContactStub = () => {
  return {
    name: 'sdafsdfsaf',
    phone: '0500949999',
    dateOfBirth: null,
  };
};

export const AccountContactDetailsStub = () => {
  return AccountContacts;
};

export const CreateAccountContactResponseStub = (
  statusCode?: number,
  success?: boolean,
  data?: any,
  message?: string,
) => {
  return {
    ...AccountContactsResponse,
    ...(data && {
      data,
    }),
    ...(statusCode && {
      statusCode,
    }),
    ...(success !== undefined && {
      success,
    }),
    ...(message && {
      statusMessage: message,
    }),
  };
};
