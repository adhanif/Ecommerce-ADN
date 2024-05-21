import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Address } from '../misc/types';

const getAccessToken = () => {
  const token = localStorage.getItem('token');
  const formattedToken = token ? token.replace(/^"(.*)"$/, '$1') : '';
  return formattedToken ? `Bearer ${formattedToken}` : '';
};

export type AddressBody = {
  street: string;
  city: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
  userId: string;
};

export const addressQueries = createApi({
  reducerPath: 'addressApi',
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
  tagTypes: ['Address'],

  endpoints: (builder) => ({
    createAddress: builder.mutation<Address, AddressBody>({
      query: (body) => ({
        url: '/addresses/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Address'],
    }),
    // fetchOrders: builder.query<OrderResponse[], string>({
    //   query: (userId) => ({
    //     url: `/orders/user/${userId}`,
    //     method: 'GET',
    //   }),
    //   providesTags: ['Order'],
    // }),
  }),
});

export const { useCreateAddressMutation } = addressQueries;
