import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    socialite: builder.mutation({
      query: (provider) => ({
        url: `/auth/${provider}`,
        method: "GET",
      }),
    }),
    requestpwd: builder.mutation({
      query: (credentials) => ({
        url: "request-password",
        method: "POST",
        body: credentials,
      }),
    }),
    resetpwd: builder.mutation({
      query: (credentials) => ({
        url: "reset-password",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: (data: any) => ({
        url: "logout",
        method: "POST",
        headers: data.headers,
      }),
    }),
    getUser: builder.query({
      query: () => "user",
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useSocialiteMutation,
  useRequestpwdMutation,
  useResetpwdMutation,
  useLogoutMutation,
  useGetUserQuery,
} = authApi;
