import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getAuthToken = () => {
  if (typeof window === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_data="))
    ?.split("=")[1];

  if (cookie) {
    try {
      const categorieData = JSON.parse(decodeURIComponent(cookie));
      return categorieData?.token || null;
    } catch (error) {
      console.error("Error parsing auth token:", error);
      return null;
    }
  }
  return null;
};

export const adminCategoriesApi = createApi({
  reducerPath: "adminCategoriesApi",
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
    getCategories: builder.query({
      query: ({ page, perPage }) => `categories?page=${page}&per_page=${perPage}`,
      keepUnusedDataFor: 0,
    }),    
    getAllCategories: builder.query({
      query: () => `all-categories`,
      keepUnusedDataFor: 0,
    }),
    getCategorieById: builder.query({
      query: (id) => `get-categorie/${id}`,
      keepUnusedDataFor: 0,
    }),
    createCategorie: builder.mutation({
      query: (credentials) => ({
        url: "store-categorie",
        method: "POST",
        body: credentials,
      }),
    }),
    updateCategorie: builder.mutation({
      query: (credentials) => ({
        url: "update-categorie",
        method: "POST",
        body: credentials,
      }),
    }),
    deleteCategorie: builder.mutation({
      query: (credentials) => ({
        url: "delete-categorie",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetAllCategoriesQuery,
  useGetCategorieByIdQuery,
  useCreateCategorieMutation,
  useUpdateCategorieMutation,
  useDeleteCategorieMutation,
} = adminCategoriesApi;
