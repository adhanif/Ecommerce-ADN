import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, productCategory } from '../misc/types';

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

    getOneProduct: builder.query<Product, number>({
      query: (productId) => ({
        url: `https://api.escuelajs.co/api/v1/products/${productId}`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),

    fetchByPriceRangeCategory: builder.query<
      Product[],
      [number, number, number]
    >({
      query: ([min, max, id]) => ({
        url: `https://api.escuelajs.co/api/v1/products/?price_min=${min}&price_max=${max}&categoryId=${id}`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),

    fetchAllCategories: builder.query<productCategory[], void>({
      query: () => ({
        url: `https://api.escuelajs.co/api/v1/categories`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),
    fetchBySearch: builder.query<Product[], string | null>({
      query: (searchQuery) => ({
        url: `https://api.escuelajs.co/api/v1/products/?title=${searchQuery}`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchAllCategoriesQuery,
  useGetOneProductQuery,
  useFetchByPriceRangeCategoryQuery,
  useFetchBySearchQuery,
} = productQueries;
