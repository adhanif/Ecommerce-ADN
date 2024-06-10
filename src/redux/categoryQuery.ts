import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category, CategoryResponse } from '../misc/types';

const getAccessToken = () => {
  const token = localStorage.getItem('token');
  const formattedToken = token ? token.replace(/^"(.*)"$/, '$1') : '';
  return formattedToken ? `Bearer ${formattedToken}` : '';
};

export const categoryQueries = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:5227/api/v1',
    baseUrl: 'https://fashion-adn.azurewebsites.net/api/v1',
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getAllCategories: builder.query<CategoryResponse[], void>({
      query: () => '/categories',
      providesTags: ['Category'],
    }),

    updateCategory: builder.mutation<CategoryResponse, CategoryResponse>({
      query: (body) => ({
        url: `/categories/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation<CategoryResponse, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
    createCategory: builder.mutation<CategoryResponse, Category>({
      query: (body) => ({
        url: '/categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
} = categoryQueries;
