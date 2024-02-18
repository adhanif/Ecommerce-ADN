import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Tokens, User, UserLogin, UserRegister } from '../misc/types';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  error?: any;
}

export const authQueries = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.escuelajs.co/api/v1/auth',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponse, UserLogin>({
      query: (body) => {
        return {
          url: '/login',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['User'],
    }),
    registerUser: builder.mutation<User, UserRegister>({
      query: (body) => ({
        url: 'https://api.escuelajs.co/api/v1/users/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authQueries;
