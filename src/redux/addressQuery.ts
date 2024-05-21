import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Address } from '../misc/types';
import { update } from 'lodash';

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

export interface UpdateAddress {
  id: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

export interface UpdateAddressResponse {
  street: string;
  city: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
  userId: string;
  user: null;
  id: string;
  createdDate: string;
  updatedDate: string;
}

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
    fetchAllAddresses: builder.query<UpdateAddressResponse[], string>({
      query: (userId) => ({
        url: `/addresses/user/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Address'],
    }),
    updateAddress: builder.mutation<UpdateAddressResponse, UpdateAddress>({
      query: (body) => ({
        url: `/addresses/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Address'],
    }),
    deleteAddress: builder.mutation<Address, string>({
      query: (id) => ({
        url: `/addresses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Address'],
    }),
  }),
});

export const {
  useCreateAddressMutation,
  useFetchAllAddressesQuery,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressQueries;
