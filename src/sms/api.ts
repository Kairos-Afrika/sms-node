import { IKairosSMSOptions } from './types/interfaces';
import Axios from 'axios-observable';
import { APIEndpoints } from './constants/api-endpoints.constants';

export const Api = (credentials: IKairosSMSOptions) => {
  return Axios.create({
    baseURL: APIEndpoints.BASE_URL,
    timeout: credentials?.timeout ?? 8000,
    headers: {
      'x-api-key': credentials.apiKey,
      'x-api-secret': credentials.apiSecret,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};
