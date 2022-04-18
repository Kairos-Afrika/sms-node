import * as ApiRequest from '../api';
import { Axios } from 'axios-observable';
import { IKairosSMSOptions } from '../types/interfaces';

jest.mock('axios');

describe('Axios Instance', function () {
  beforeAll(() => {
    jest.spyOn(ApiRequest, 'Api').mockImplementation((credentials: IKairosSMSOptions) => {
      return Axios.create(credentials);
    });
  });

  it('should return an instance of Kairos API Instance', function () {
    let axiosInstance = ApiRequest.Api({ apiKey: 'xxxxxxxxx', apiSecret: 'xxxxxxxxx', timeout: 90000 });
    expect(axiosInstance).toBeInstanceOf(Axios);
    expect(axiosInstance).toBeDefined();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
