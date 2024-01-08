import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface IResetPassForm {
  email: string;
  code: string;
  password: string;
}

export interface IRequestResetPass extends IResetPassForm {}

export type ErrorType = FetchBaseQueryError | SerializedError;
