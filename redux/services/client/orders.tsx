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
    })
  }),
});

export const {
  useCreateOrderMutation,
} = clientOrdersApi;
