import { CategoryProps } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientCategoriesApi = createApi({
  reducerPath: 'clientCategoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryProps[], void>({
      query: () => `list-categories`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
} = clientCategoriesApi;

