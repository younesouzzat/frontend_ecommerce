import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getAuthToken = () => {
  if (typeof window === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_data="))
    ?.split("=")[1];

  if (cookie) {
    try {
      const orderData = JSON.parse(decodeURIComponent(cookie));
      return orderData?.token || null;
    } catch (error: any) {
      console.error("Error parsing auth token:", error);
      return null;
    }
  }
  return null;
};

export const adminOrdersApi = createApi({
  reducerPath: "adminOrdersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ page, perPage }) =>
        `all-orders?page=${page}&per_page=${perPage}`,
      keepUnusedDataFor: 0,
    }),
    getOrderById: builder.query({
      query: (id) => `get-order/${id}`,
      keepUnusedDataFor: 0,
    }),
    fetchInvoice: builder.query({
      query: (orderId) => ({
        url: `/invoice/${orderId}`,
        responseHandler: async (response) => {
          const blob = await response.blob();
          return window.URL.createObjectURL(blob);
        },
      }),
    }),
    updateOrder: builder.mutation({
      query: (credentials) => ({
        url: `update-order`,
        method: "POST",
        body: credentials,
      }),
    }),
    deleteOrder: builder.mutation({
      query: (credentials) => ({
        url: "delete-order",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useLazyFetchInvoiceQuery,
} = adminOrdersApi;
