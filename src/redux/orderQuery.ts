import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order, OrderResponse } from '../misc/types';

const getAccessToken = () => {
  const token = localStorage.getItem('token');
  const formattedToken = token ? token.replace(/^"(.*)"$/, '$1') : '';
  return formattedToken ? `Bearer ${formattedToken}` : '';
};

export const orderQueries = createApi({
  reducerPath: 'orderApi',
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
  tagTypes: ['Order'],

  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderResponse, Order>({
      query: (body) => ({
        url: '/orders/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),
    fetchOrders: builder.query<OrderResponse[], string>({
      query: (userId) => ({
        url: `/orders/user/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),
  }),
});

export const { useCreateOrderMutation, useFetchOrdersQuery } = orderQueries;
