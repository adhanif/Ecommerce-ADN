import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  Tokens,
  User,
  UserLogin,
  UserProfileData,
  UserRegister,
  LoginResponse,
  Available,
  Email,
} from '../misc/types';

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
    userProfile: builder.query<UserProfileData, Tokens>({
      query: (body) => ({
        url: 'https://api.escuelajs.co/api/v1/auth/profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${body.access_token}`,
        },
      }),
    }),
    // userProfile: builder.query<UserProfileData, void>({
    //   query: () => ({
    //     url: 'https://api.escuelajs.co/api/v1/auth/profile',
    //     transformResponse: (response: User) => {
    //       const { id, role, name, email, avatar } = response;
    //       return {
    //         id,
    //         role,
    //         name,
    //         email,
    //         avatar,
    //       };
    //     },
    //   }),
    // }),

    //
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useCheckUserMutation,
  // useUserProfileQuery,
  useUserProfileQuery,
} = userQueries;
