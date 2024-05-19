import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  Tokens,
  User,
  UserLogin,
  UserProfileData,
  UserRegister,
  LoginResponse,
  UserGoogleProfile,
} from '../misc/types';

export const userQueries = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://api.escuelajs.co/api/v1',
    baseUrl: 'http://localhost:5227/api/v1',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponse, UserLogin>({
      query: (body) => {
        return {
          url: '/auth/login/',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['User'],
    }),

    registerUser: builder.mutation<User, UserRegister>({
      query: (body) => ({
        url: '/users/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    userProfile: builder.query<UserProfileData, Tokens>({
      query: (body) => ({
        url: '/auth/profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${body.access_token}`,
        },
      }),
    }),

    googleUserProfile: builder.query<UserGoogleProfile, string>({
      query: (body) => ({
        url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${body}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useUserProfileQuery,
  useGoogleUserProfileQuery,
} = userQueries;
