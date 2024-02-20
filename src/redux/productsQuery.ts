import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productQueries = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.escuelajs.co/api/v1/products',
  }),
  endpoints: (builder) => ({}),
});

export const {} = productQueries;
