import { ErrorType } from './interface';
import { TRegisterInput } from './type';

const errorHandler = (error: ErrorType, inputId: keyof TRegisterInput) => {
  if (error && 'status' in error) {
    const newError = error.data as Partial<TRegisterInput>;

    switch (inputId) {
      case 'username':
        return newError.username?.[0];
      case 'password':
        return newError.password?.[0];
      case 'email':
        return newError.email?.[0];
      case 'nickname':
        return newError.nickname?.[0];
      default:
        return undefined;
    }
  }

  return undefined;
};

export default errorHandler;
