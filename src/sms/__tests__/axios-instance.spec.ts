import { Axios } from 'axios-observable';
import { AxiosConfigOptions, KairosConfigOptions } from './mocks/mocks';
import { APIEndpoints } from '../constants/api-endpoints.constants';

describe('Create Axios Instance', function () {
  beforeEach(() => {
    jest.spyOn(Axios, 'create').mockImplementation(() => {
      return { get: () => jest.fn(), post: () => jest.fn() } as any;
    });
  });
  it('should return an instance of Axios', function () {
    const axiosInstance = Axios.create(AxiosConfigOptions);
    expect(axiosInstance.get).toBeDefined();
  });
});
