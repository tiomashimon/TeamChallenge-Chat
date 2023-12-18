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
