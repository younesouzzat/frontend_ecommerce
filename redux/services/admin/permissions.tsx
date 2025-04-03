import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_data="))
    ?.split("=")[1];
  if (cookie) {
    try {
      const permissionData = JSON.parse(decodeURIComponent(cookie));
      return permissionData?.token || null;
    } catch (error: any) {
      console.error("Error parsing auth token:", error);
      return null;
    }
  }
  return null;
};

export const adminPermissionsApi = createApi({
  reducerPath: "adminPermissionsApi",
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
  tagTypes: ['RolePermissions'],
  endpoints: (builder) => ({
    getPermissionById: builder.query({
      query: (id) => `role-permissions/${id}`,
      keepUnusedDataFor: 0,
    }),
    createPermission: builder.mutation({
      query: (credentials) => ({
        url: "store-permissions",
        method: "POST",
        body: credentials,
      })
    }),
  }),
});


export const {
  useGetPermissionByIdQuery,
  useCreatePermissionMutation
} = adminPermissionsApi;