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
 * @template T - Type of the response data
 * @param func - Observable to convert to Promise
 * @returns Promise that resolves with the response
 */
export const asPromise = <T>(func: Observable<IResponse<T>>): Promise<IResponse<T>> => {
  return lastValueFrom(func);
};
