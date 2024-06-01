import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CategoryResponse } from '../misc/types';
import { update } from 'lodash';

const getAccessToken = () => {
  const token = localStorage.getItem('token');
  const formattedToken = token ? token.replace(/^"(.*)"$/, '$1') : '';
  return formattedToken ? `Bearer ${formattedToken}` : '';
};

export const categoryQueries = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5227/api/v1',
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
  }),
});

export const { useGetAllCategoriesQuery, useUpdateCategoryMutation } =
  categoryQueries;
