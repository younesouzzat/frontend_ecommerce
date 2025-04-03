import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";

const getAuthToken = () => {
  if (typeof window === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_data="))
    ?.split("=")[1];

  if (cookie) {
    try {
      const userData = JSON.parse(decodeURIComponent(cookie));
      return userData?.token || null;
    } catch (error: any) {
      console.error("Error parsing auth token:", error);
      return null;
    }
  }
  return null;
};

export const adminUsersApi = createApi({
  reducerPath: "adminUsersApi",
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
    getUsers: builder.query({
      query: ({ page, perPage }) => `all-users?page=${page}&per_page=${perPage}`,
      keepUnusedDataFor: 0,
    }),    
    getRoles: builder.query({
      query: () => "get-roles",
      keepUnusedDataFor: 0,
    }),
    getUserById: builder.query({
      query: (id) => `get-user/${id}`,
      keepUnusedDataFor: 0,
    }),
    createUser: builder.mutation({
      query: (credentials) => ({
        url: "store-user",
        method: "POST",
        body: credentials,
      }),
    }),
    updateUser: builder.mutation({
      query: (credentials) => ({
        url: "update-user",
        method: "POST",
        body: credentials,
      }),
    }),
    deleteUser: builder.mutation({
      query: (credentials) => ({
        url: "delete-user",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetRolesQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = adminUsersApi;
