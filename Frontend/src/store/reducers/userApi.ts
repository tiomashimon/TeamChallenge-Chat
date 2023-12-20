import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRequestLogin, IRequestRegistration, IResponseRegistration } from '../../utils/interface';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  endpoints: (build) => ({
    login: build.mutation<IResponseRegistration, IRequestLogin>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    registerUser: build.mutation<IResponseRegistration, IRequestRegistration>({
      query: (body) => ({
        url: '/user/',
        method: 'POST',
        body,
      }),
      transformResponse: (response: IResponseRegistration) => {
        localStorage.setItem('access', response.token.access);
        localStorage.setItem('refresh', response.token.refresh);
        localStorage.setItem('isAuth', 'true');
        return response;
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterUserMutation } = userApi;
