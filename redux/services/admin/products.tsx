import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getAuthToken = () => {
  if (typeof window === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_data="))
    ?.split("=")[1];

  if (cookie) {
    try {
      const productData = JSON.parse(decodeURIComponent(cookie));
      return productData?.token || null;
    } catch (error) {
      console.error("Error parsing auth token:", error);
      return null;
    }
  }
  return null;
};

export const adminProductsApi = createApi({
  reducerPath: "adminProductsApi",
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
    getProducts: builder.query({
      query: ({ page, perPage }) => `all-products?page=${page}&per_page=${perPage}`,
      keepUnusedDataFor: 0,
    }),    
    getProductById: builder.query({
      query: (id) => `get-product/${id}`,
      keepUnusedDataFor: 0,
    }),
    createProduct: builder.mutation({
      query: (credentials) => ({
        url: "store-product",
        method: "POST",
        body: credentials,
      }),
    }),
    updateProduct: builder.mutation({
      query: (credentials) => (console.log(credentials), {
        url: `update-product`,
        method: "POST",
        body: credentials,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (credentials) => ({
        url: "delete-product",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = adminProductsApi;
