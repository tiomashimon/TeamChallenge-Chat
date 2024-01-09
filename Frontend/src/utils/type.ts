import { TypeOf } from 'zod';
import {
  registerGuestSchema,
  registerSchema,
  resetPasswordSchema,
  responseTokenSchema,
  signInSchema,
  userResponseRegisterSchema,
  userSchema,
} from './zodSchema';

export type TRegisterGuestInput = TypeOf<typeof registerGuestSchema>;
export type TRegisterInput = TypeOf<typeof registerSchema>;
export type TResetPassForm = TypeOf<typeof resetPasswordSchema>;
export type TSignInInput = TypeOf<typeof signInSchema>;

export type TResponseToken = TypeOf<typeof responseTokenSchema>;
export type TUserResponseRegister = TypeOf<typeof userResponseRegisterSchema>;

export type TUser = TypeOf<typeof userSchema>;

export type TNavItem = 'message' | 'global' | 'settings';
