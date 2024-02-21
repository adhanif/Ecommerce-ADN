import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../misc/types';

export const productQueries = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.escuelajs.co/api/v1/products',
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query<Product[], void>({
      query: () => '',
      providesTags: ['Products'],
    }),
    getOneProduct: builder.mutation<Product, number>({
      query: (productId) => ({
        url: `https://api.escuelajs.co/api/v1/products/${productId}`,
        method: 'GET',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const { useFetchAllProductsQuery, useGetOneProductMutation } =
  productQueries;
