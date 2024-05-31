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
    // baseUrl: 'https://fashion-adn.azurewebsites.net/api/v1',

    prepareHeaders: (headers, { getState }) => {
     
      const token = getAccessToken();
      if (token) {
        headers.set('Authorization', token);
        return headers;
      }
    },
  }),
  tagTypes: ['Order', 'Products'],

  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderResponse, Order>({
      query: (body) => ({
        url: '/orders/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order', 'Products'],
    }),
    fetchOrders: builder.query<OrderResponse[], string>({
      query: (userId) => ({
        url: `/orders/user/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),
    fetchAllOrders: builder.query<OrderResponse[], void>({
      query: () => ({
        url: '/orders',
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),
    deleteOrder: builder.mutation<OrderResponse, string>({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useFetchOrdersQuery,
  useFetchAllOrdersQuery,
  useDeleteOrderMutation,
} = orderQueries;
