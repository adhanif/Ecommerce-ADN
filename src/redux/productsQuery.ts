import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  CreateProduct,
  Product,
  UpdateProduct,
  productCategory,
} from '../misc/types';

export type ImageResponse = {
  originalname: string;
  filename: string;
  location: string;
};

export type MyFormData = FormData;
// Function to get the access token from localStorage
const getAccessToken = () => {
  const token = localStorage.getItem('accessToken');
  return token ? `Bearer ${token}` : '';
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
      }
      headers.set('Content-Type', 'multipart/form-data');
      return headers;
    },
  }),
  tagTypes: ['createProducts'],
  endpoints: (builder) => ({
    createUpdateProduct: builder.mutation<Product, FormData>({
      query: (body) => ({
        url: '/products/form-create',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['createProducts'],
    }),
  }),
});
export const { useCreateUpdateProductMutation } = createUpdateproductQueries;

export const productQueries = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5227/api/v1',
    prepareHeaders: (headers, { getState }) => {
      // Get token from localStorage
      const token = getAccessToken();
      if (token) {
        headers.set('Authorization', token);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Products'],

  endpoints: (builder) => ({
    fetchAllProducts: builder.query<Product[], void>({
      query: () => ({
        url: '/products',
        method: 'GET',
        headers: {
          'content-Type': 'application/json',
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
      [number | null, number | null, number | null]
    >({
      query: ([min, max, id]) => ({
        url: `/products/?price_min=${min}&price_max=${max}&categoryId=${id}`,
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

    fetchBySearch: builder.query<Product[], string | null>({
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
    createProduct: builder.mutation<Product, FormData>({
      query: (body) => ({
        url: '/products/form-create',
        method: 'POST',
        body: body,
        // headers: {
        //   'content-Type': 'multipart/form-data',
        // },
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation<Product, [number, UpdateProduct]>({
      query: ([id, body]) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: body,
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
  useUpdateProductMutation,
  useCreateProductMutation,
} = productQueries;
