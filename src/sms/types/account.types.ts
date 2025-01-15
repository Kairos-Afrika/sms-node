import { ApiResponse } from './common.types';

export interface User {
  readonly id: string;
  readonly username: string | null;
  readonly name: string;
  readonly phone: string;
}

export interface Balance {
  readonly id: string;
  readonly credit: number;
  readonly totalAmount: number;
  readonly user: User;
}

export type AccountBalanceResponse = ApiResponse<Balance>;
