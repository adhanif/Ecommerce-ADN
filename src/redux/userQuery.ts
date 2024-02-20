import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  Tokens,
  User,
  UserLogin,
  UserProfileData,
  UserRegister,
} from '../misc/types';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  error?: any;
}

type Available = {
  userExists: boolean | Available | undefined;
  isAvailable: boolean;
};

type Email = {
  email: string;
};

type TokenRequestBody = {
  access_token: string;
};

export const userQueries = createApi({
  reducerPath: 'userApi',
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
    checkUser: builder.mutation<Available, Email>({
      query: (body) => ({
        url: 'https://api.escuelajs.co/api/v1/users/is-available',
        method: 'POST',
        body,
      }),
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
    userProfile: builder.mutation<UserProfileData, TokenRequestBody>({
      query: (body) => ({
        url: 'https://api.escuelajs.co/api/v1/auth/profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${body.access_token}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useCheckUserMutation,
  useUserProfileMutation,
} = userQueries;
