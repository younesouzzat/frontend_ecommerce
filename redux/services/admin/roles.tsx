import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_data="))
    ?.split("=")[1];
  if (cookie) {
    try {
      const roleData = JSON.parse(decodeURIComponent(cookie));
      return roleData?.token || null;
    } catch (error) {
      console.error("Error parsing auth token:", error);
      return null;
    }
  }
  return null;
};

export const adminRolesApi = createApi({
  reducerPath: "adminRolesApi",
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
  tagTypes: ['Roles', 'Role'],
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => "all-roles",
      keepUnusedDataFor: 0,
    }),

    getRoleById: builder.query({
      query: (id) => `get-role/${id}`,
      keepUnusedDataFor: 0,
    }),

    createRole: builder.mutation({
      query: (credentials) => ({
        url: "store-role",
        method: "POST",
        body: credentials,
      })
    }),

    updateRole: builder.mutation({
      query: (credentials) => ({
        url: "update-role",
        method: "POST",
        body: credentials,
      })
    }),

    deleteRole: builder.mutation({
      query: (credentials) => ({
        url: "delete-role",
        method: "POST",
        body: credentials,
      })
    }),
  }),
});


export const {
  useGetRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation
} = adminRolesApi;