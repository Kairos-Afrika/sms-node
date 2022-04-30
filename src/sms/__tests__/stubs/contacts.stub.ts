import { IContacts, IPagination, IResponse } from '../../types/interfaces';
import { AccountContactsList } from '../mocks/mocks';

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
