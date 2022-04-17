import { IResponse } from '../types/interfaces';

export const buildSMSResponse = (
  statusCode: number | string,
  statusMessage: string,
  data: any,
  success: boolean,
): IResponse<any> => {
  return {
    statusMessage,
    statusCode,
    success,
    data,
    timestamp: new Date().toISOString(),
  };
};
