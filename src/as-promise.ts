/**
 * A definition that converts observable to promises for rxjs lastValueFrom
 * @author LORD-KAY
 * @github https://github.com/LORD-KAY
 * @email offeilord@gmail.com
 */
import { lastValueFrom, Observable } from 'rxjs';
import { IResponse } from './types/interfaces';

/**
 * Converts an observable to a promise and resolves the last value of the observed response
 * @param func
 */
export const asPromise = async (func: Observable<IResponse<any>>): Promise<any> => {
  return await lastValueFrom(func);
};
