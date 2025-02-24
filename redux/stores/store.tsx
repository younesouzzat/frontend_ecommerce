import { configureStore } from "@reduxjs/toolkit";
import { authApi } from '../services/auth';

import { adminUsersApi } from "../services/admin/users";
import { adminRolesApi } from "../services/admin/roles";
import { adminPermissionsApi } from "../services/admin/permissions";

import { adminCategoriesApi } from "../services/admin/categories";
import { adminProductsApi } from "../services/admin/products";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminUsersApi.reducerPath]: adminUsersApi.reducer,
        [adminRolesApi.reducerPath]: adminRolesApi.reducer,
        [adminPermissionsApi.reducerPath]: adminPermissionsApi.reducer,
        [adminCategoriesApi.reducerPath]: adminCategoriesApi.reducer,
        [adminProductsApi.reducerPath]: adminProductsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(adminUsersApi.middleware)
        .concat(adminRolesApi.middleware)
        .concat(adminPermissionsApi.middleware)
        .concat(adminCategoriesApi.middleware)
        .concat(adminProductsApi.middleware)
});
