import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, Category } from "@/types";

interface ProductsResponse {
  last_page?: number;
  current_page?: number;
  products: Product[];
  categories?: Category[];
}

interface GetProductsParams {
  page?: number;
  perPage?: number;
  searchQuery?: string;
  category?: string;
  category_id?: number | string | undefined;
  categoryFilter?: string;
  price_range?: string;
  priceRange?: string;
}

export const clientProductsApi = createApi({
  reducerPath: "clientProductsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  tagTypes: ["Products", "Categories"],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, GetProductsParams>({
      query: ({ page = 1, perPage = 10, searchQuery, category, categoryFilter, price_range, priceRange }) => {
        const queryParams = new URLSearchParams({
          page: String(page),
          per_page: String(perPage),
        });

        if (searchQuery) queryParams.append("search", searchQuery);
        
        const selectedCategory = category || categoryFilter || 'all';
        if (selectedCategory !== 'all') queryParams.append("category", selectedCategory);

        const selectedPriceRange = price_range || priceRange;
        if (selectedPriceRange) queryParams.append("price_range", selectedPriceRange);

        return `shop-products?${queryParams.toString()}`;
      },
      keepUnusedDataFor: 60,
      providesTags: ["Products"],
    }),
    getProductsWithCategory: builder.query<ProductsResponse, void>({
      query: () => `category-products`,
      keepUnusedDataFor: 60,
      providesTags: ["Categories"],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `shop-product/${id}`,
      keepUnusedDataFor: 60,
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsWithCategoryQuery,
  useGetProductByIdQuery,
} = clientProductsApi;
