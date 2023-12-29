import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { IRequestGuest, IResponseRegistration } from '../../utils/interface';
import { setUser } from '../reducers/userSlice';

export const guestApi = createApi({
  reducerPath: 'guestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  endpoints: (build) => ({
    registerGuest: build.mutation<IResponseRegistration, IRequestGuest>({
      query: (body) => ({
        url: '/user/guest/',
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

export const { useRegisterGuestMutation } = guestApi;
