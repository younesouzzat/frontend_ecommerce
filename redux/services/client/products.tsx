import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientProductsApi = createApi({
  reducerPath: "clientProductsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => {
        console.log("Received params:", params);
        
        const queryParams = new URLSearchParams({
          page: String(params.page || 1),
          per_page: String(params.perPage || 10),
        });
    
        if (params.searchQuery) queryParams.append("search", params.searchQuery);
        
        const category = params.category || params.categoryFilter || 'all';
        if (category && category !== 'all') queryParams.append("category", category);
        
        const priceRange = params.price_range || params.priceRange;
        if (priceRange) queryParams.append("price_range", priceRange);
    
        return `shop-products?${queryParams.toString()}`;
      },
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
