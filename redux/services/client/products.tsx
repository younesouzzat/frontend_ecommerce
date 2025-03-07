import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientProductsApi = createApi({
  reducerPath: "clientProductsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, perPage }) => `shop-products?page=${page}&per_page=${perPage}`,
      keepUnusedDataFor: 0,
    }),    
    getProductsWithCategory: builder.query({
      query: () => `category-products`,
      keepUnusedDataFor: 0,
    }),    
    getProductById: builder.query({
      query: (id) => `shop-product/${id}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsWithCategoryQuery,
} = clientProductsApi;
