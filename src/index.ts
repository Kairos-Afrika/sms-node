import { IKairosSMSOptions } from './types/interfaces';
import { Api } from './api';
import { AxiosObservable } from 'axios-observable';
import { APIEndpoints } from './constants/api-endpoints.constants';

class KairosSMS {
  private readonly options: IKairosSMSOptions;
  constructor(options: IKairosSMSOptions) {
    this.options = options;
  }
  static create(options: IKairosSMSOptions) {
    return new KairosSMS(options);
  }

  send<T>(body: T): AxiosObservable<any> {
    return Api(this.options).post(APIEndpoints.SEND_QUICK_SMS, {});
  }
}

export default KairosSMS;
export { KairosSMS };

const lord = KairosSMS.create({ apiKey: 'xxxxx', apiSecret: 'xxxxx' });
