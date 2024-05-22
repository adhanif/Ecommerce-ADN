import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  Tokens,
  User,
  UserLogin,
  UserProfileData,
  UserRegister,
  UserGoogleProfile,
  UserUpdateResponse,
  UserUpdate,
} from '../misc/types';

export type MyFormData = FormData;

// Function to get the access token from localStorage
const getAccessToken = () => {
  const token = localStorage.getItem('token');
  const formattedToken = token ? token.replace(/^"(.*)"$/, '$1') : '';
  return formattedToken ? `Bearer ${formattedToken}` : '';
};

export const userQueries = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5227/api/v1',
    prepareHeaders: (headers, { getState }) => {
      // Get token from localStorage
      const token = getAccessToken();
      if (token) {
        headers.set('Authorization', token);
        return headers;
      }
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    loginUser: builder.mutation<string, UserLogin>({
      query: (body) => {
        return {
          url: '/auth/login/',
          method: 'POST',
          body,
          responseHandler: (response: { text: () => any }) => response.text(),
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
    userProfile: builder.query<UserProfileData, string>({
      query: (access_token) => ({
        url: '/auth/profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        providesTags: ['User'],
      }),
    }),

    userLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    updateUser: builder.mutation<UserUpdateResponse, UserUpdate>({
      query: (body) => ({
        url: '/users/profile',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
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
  useUserLogoutMutation,
  useUpdateUserMutation,
} = userQueries;
