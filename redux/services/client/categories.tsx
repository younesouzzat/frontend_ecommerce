import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientCategoriesApi = createApi({
  reducerPath: "clientCategoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `list-categories`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useGetCategoriesQuery
} = clientCategoriesApi;
