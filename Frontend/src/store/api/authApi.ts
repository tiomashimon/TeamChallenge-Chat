import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  TRegisterGuestInput,
  TRegisterInput,
  TResponseToken,
  TSignInInput,
  TUserResponseRegister,
} from '../../utils/type';
import { responseTokenSchema, userResponseRegisterSchema } from '../../utils/zodSchema';
import { logoutToken, setToken } from '../reducers/tokenSlice';
import { setUser } from '../reducers/userSlice';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  endpoints: (build) => ({
    loginUser: build.mutation<TResponseToken, TSignInInput>({
      query: (body) => ({
        url: '/user/token/',
        method: 'POST',
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          responseTokenSchema.parse(data);

          const accessToken = data.access;
          const refreshToken = data.refresh;

          dispatch(setToken({ tokenAccess: accessToken, tokenRefresh: refreshToken }));
          // dispatch(setUser(data.user));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    registerUser: build.mutation<TUserResponseRegister, TRegisterInput>({
      query: (body) => ({
        url: '/user/',
        method: 'POST',
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          userResponseRegisterSchema.parse(data);

          const accessToken = data.token.access;
          const refreshToken = data.token.refresh;

          dispatch(setToken({ tokenAccess: accessToken, tokenRefresh: refreshToken }));
          dispatch(setUser(data.user));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    registerGuest: build.mutation<TUserResponseRegister, TRegisterGuestInput>({
      query: (body) => ({
        url: '/user/guest/',
        method: 'POST',
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          userResponseRegisterSchema.parse(data);

          const accessToken = data.token.access;
          const refreshToken = data.token.refresh;
          dispatch(setToken({ tokenAccess: accessToken, tokenRefresh: refreshToken }));
          dispatch(setUser(data.user));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    tokenRefresh: build.mutation<{ access: string }, { refresh: string }>({
      query: (body) => ({
        url: '/user/token/refresh/',
        method: 'POST',
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          const accessToken = data.access;

          const { tokenState } = getState() as RootState;
          dispatch(setToken({ tokenAccess: accessToken, tokenRefresh: tokenState.tokenRefresh }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    isVerified: build.mutation<Record<string, never>, { token: string }>({
      query: (body) => ({
        url: '/user/token/verify/',
        method: 'POST',
        body,
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          dispatch(logoutToken());
        }
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useTokenRefreshMutation,
  useIsVerifiedMutation,
  useRegisterGuestMutation,
} = authApi;
