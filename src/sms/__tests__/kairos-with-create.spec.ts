import KairosSMS from '../index';
import { KairosConfigOptions } from './mocks/mocks';
jest.mock('../index');

describe('KairosSMS with create', function () {
  let kairosInstance: KairosSMS;
  beforeAll(() => {
    jest.spyOn(KairosSMS, 'create').mockImplementation(() => {
      return new KairosSMS(KairosConfigOptions);
    });
    kairosInstance = KairosSMS.create(KairosConfigOptions);
  });
  it('should define an instance of Kairos SMS', function () {
    expect(kairosInstance).toBeDefined();
    expect(KairosSMS.create).toBeCalledWith(KairosConfigOptions);
    expect(KairosSMS.create).toBeCalledTimes(1);
  });
});
