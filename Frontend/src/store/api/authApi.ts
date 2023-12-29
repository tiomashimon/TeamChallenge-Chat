import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import {
  IRequestLogin,
  IRequestRegistration,
  IResponseLogin,
  IResponseRegistration,
} from '../../utils/interface';
import { setUser } from '../reducers/userSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  endpoints: (build) => ({
    loginUser: build.mutation<IResponseLogin, IRequestLogin>({
      query: (body) => ({
        url: '/user/token/',
        method: 'POST',
        body,
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const accessToken = data.access;
          const refreshToken = data.refresh;

          const currentDate = new Date();
          const expirationTime = new Date(currentDate.getTime() + 30 * 1000);

          Cookies.set('accessToken', accessToken, { expires: expirationTime });
          Cookies.set('refreshToken', refreshToken, { expires: expirationTime });
          // dispatch(setUser(data.user));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    registerUser: build.mutation<IResponseRegistration, IRequestRegistration>({
      query: (body) => ({
        url: '/user/',
        method: 'POST',
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const accessToken = data.token.access;
          const refreshToken = data.token.refresh;

          const currentDate = new Date();
          const expirationTime = new Date(currentDate.getTime() + 30 * 1000);

          Cookies.set('accessToken', accessToken, { expires: expirationTime });
          Cookies.set('refreshToken', refreshToken, { expires: expirationTime });
          dispatch(setUser(data.user));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
