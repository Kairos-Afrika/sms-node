import * as ApiRequest from '../api';
import { Axios } from 'axios-observable';
import { IKairosSMSOptions } from '../types/interfaces';
import { APIEndpoints } from '../constants/api-endpoints.constants';
import {AxiosConfigOptions} from "./mocks/mocks";



describe("Axios Instance", function () {
  it('should return an instance of an axios', function () {
    const axiosInstance = Axios.create(AxiosConfigOptions)
    expect(axiosInstance).toBeInstanceOf(Axios)
    expect(axiosInstance).toBeDefined();
    expect(axiosInstance.defaults.baseURL).toBe("https://testing.com")
    expect(axiosInstance.defaults.timeout).toBe(8000)
  });
})

describe('API Call Instance', function () {
  beforeAll(() => {
    jest.spyOn(ApiRequest, 'Api').mockImplementation((credentials: IKairosSMSOptions) => {
      return Axios.create(credentials);
    });
  });

  it('should return an instance of Kairos API Instance', function () {
    let axiosInstance = ApiRequest.Api({ apiKey: 'xxxxxxxxx', apiSecret: 'xxxxxxxxx', timeout: 90000 });
    expect(axiosInstance).toBeInstanceOf(Axios);
    expect(axiosInstance.defaults.timeout).toBe(90000)
    expect(axiosInstance).toBeDefined();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
