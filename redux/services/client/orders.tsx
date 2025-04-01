import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientOrdersApi = createApi({
  reducerPath: "clientOrdersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (credentials) => ({
        url: "save-order",
        method: "POST",
        body: credentials,
      }),
    }),
    getOrderById: builder.query<any, { userId: string; page: number; perPage: number }>({
      query: ({ userId, page, perPage }) => `my-orders/${userId}?page=${page}&per_page=${perPage}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
} = clientOrdersApi;
