import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, productCategory } from '../misc/types';

export type ImageResponse = {
  originalname: string;
  filename: string;
  location: string;
};

export type MyFormData = FormData;
// Function to get the access token from localStorage
const getAccessToken = () => {
  const token = localStorage.getItem('token');
  const formattedToken = token ? token.replace(/^"(.*)"$/, '$1') : '';
  return formattedToken ? `Bearer ${formattedToken}` : '';
};

export const createUpdateproductQueries = createApi({
  reducerPath: 'api2',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5227/api/v1',
    prepareHeaders: (headers, { getState }) => {
      // Get token from localStorage
      const token = getAccessToken();
      if (token) {
        headers.set('Authorization', token);
        return headers;
      }
      headers.set('Content-Type', 'multipart/form-data');
      return headers;
    },
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    createProduct: builder.mutation<Product, FormData>({
      query: (formData) => ({
        url: '/products/form-create',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation<Product, [string, FormData]>({
      query: ([id, formData]) => ({
        url: `/products/${id}/form-update`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});
export const { useCreateProductMutation, useUpdateProductMutation } =
  createUpdateproductQueries;

export const productQueries = createApi({
  reducerPath: 'api',
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
  tagTypes: ['Products'],

  endpoints: (builder) => ({
    fetchAllProducts: builder.query<Product[], void>({
      query: () => ({
        url: '/products',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Products'],
    }),

    getOneProduct: builder.query<Product, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),

    fetchByPriceRangeCategory: builder.query<
      Product[],
      [string | null, number | null, number | null]
    >({
      query: ([id, min, max]) => ({
        url: `/products/?category_id=${id}&min_price=${min}&max_price=${max}`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),

    fetchAllCategories: builder.query<productCategory[], void>({
      query: () => ({
        url: `/categories`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),

    fetchBySearch: builder.query<Product[], string>({
      query: (searchQuery) => ({
        url: `/products/?title=${searchQuery}`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),
    // FormData
    uploadImages: builder.mutation<ImageResponse, FormData>({
      query: (images) => ({
        url: '/files/upload',
        method: 'POST',
        body: images,

        transformResponse: (rawResult: ImageResponse) => rawResult,
      }),

      invalidatesTags: ['Products'],
    }),

    deleteProduct: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchAllCategoriesQuery,
  useGetOneProductQuery,
  useFetchByPriceRangeCategoryQuery,
  useFetchBySearchQuery,
  useUploadImagesMutation,
  useDeleteProductMutation,
} = productQueries;
