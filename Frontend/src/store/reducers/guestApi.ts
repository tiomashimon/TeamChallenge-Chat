import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRequestGuest, IResponseRegistration } from '../../utils/interface';

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
      transformResponse: (response: IResponseRegistration) => {
        localStorage.setItem('access', response.token.access);
        localStorage.setItem('refresh', response.token.refresh);
        localStorage.setItem('isAuth', 'true');
        return response;
      },
    }),
  }),
});

export const { useRegisterGuestMutation } = guestApi;
