import { boolean, number, object, string } from 'zod';

export const registerGuestSchema = object({
  nickname: string().min(2, 'Nickname is required').max(20, 'Nickname is too long'),
});

export const registerSchema = object({
  nickname: string().min(1, 'Nickname is required').max(20, 'Nickname is too long'),
  username: string().min(1, 'Username is required').max(20, 'Username is too long'),
  email: string().min(1, 'Email is required').email('Email is invalid'),
  password: string()
    .min(1, 'Password is required')
    .max(20, 'Password is too long')
    .refine((value) => value.length >= 8, { message: 'Password must be at least 8 characters' }),
});

export const resetPasswordSchema = object({
  code: string().min(1, 'Code is required'),
  email: string().min(1, 'Email is required').email('Email is invalid'),
  password: string()
    .min(1, 'Password is required')
    .max(20, 'Password is too long')
    .refine((value) => value.length >= 8, { message: 'Password must be at least 8 characters' }),
});

export const signInSchema = object({
  username: string().min(1, 'Username is required'),
  password: string()
    .min(2, 'Password is required')
    .max(20, 'Password is too long')
    .refine((value) => value.length >= 8, { message: 'Password must be at least 8 characters' }),
});

export const responseTokenSchema = object({
  access: string(),
  refresh: string(),
});

const settingsUserSchema = object({
  id: number(),
  is_dark_mode: boolean(),
  is_show_notifications: boolean(),
  language: string(),
});

export const userSchema = object({
  id: number(),
  email: string().optional(),
  username: string(),
  nickname: string(),
  settings: settingsUserSchema.optional(),
  is_guest: boolean().optional(),
});

export const userResponseRegisterSchema = object({
  user: userSchema,
  token: responseTokenSchema,
});
