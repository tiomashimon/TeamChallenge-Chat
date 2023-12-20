export interface IGuestForm {
  nickname: string;
}

export interface IAuthForm {
  username: string;
  password: string;
}

export interface IRegistrationForm {
  username: string;
  password: string;
  email: string;
  nickname: string;
}

export interface IResetPassForm {
  email: string;
  code: string;
  password: string;
}

export interface ISignInForm {
  username: string;
  password: string;
}

interface IToken {
  access: string;
  refresh: string;
}

interface ISettingsUser {
  id: number;
  is_dark_mode: boolean;
  is_show_notifications: boolean;
  language: string;
}
interface IUser {
  id: number;
  email: string;
  username: string;
  nickname: string;
  settings: ISettingsUser;
}

export interface IResponseRegistration {
  token: IToken;
  user: IUser;
}

export interface IRequestRegistration extends IRegistrationForm {}
export interface IRequestLogin extends IAuthForm {}
export interface IRequestGuest extends IGuestForm {}
export interface IRequestResetPass extends IResetPassForm {}
export interface IRequestSignIn extends ISignInForm {}
