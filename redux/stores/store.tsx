import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/auth";
import { adminUsersApi } from "../services/admin/users";
import { adminRolesApi } from "../services/admin/roles";
import { adminPermissionsApi } from "../services/admin/permissions";
import { adminCategoriesApi } from "../services/admin/categories";
import { adminProductsApi } from "../services/admin/products";

// Import the global slice
import globalReducer from "../services/shop/globalSlice";
import { clientProductsApi } from "../services/client/products";
import { clientCategoriesApi } from "../services/client/categories";
import { clientOrdersApi } from "../services/client/orders";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminUsersApi.reducerPath]: adminUsersApi.reducer,
        [adminRolesApi.reducerPath]: adminRolesApi.reducer,
        [adminPermissionsApi.reducerPath]: adminPermissionsApi.reducer,
        [adminCategoriesApi.reducerPath]: adminCategoriesApi.reducer,
        [adminProductsApi.reducerPath]: adminProductsApi.reducer,
        [clientProductsApi.reducerPath]: clientProductsApi.reducer,
        [clientCategoriesApi.reducerPath]: clientCategoriesApi.reducer,
        [clientOrdersApi.reducerPath]: clientOrdersApi.reducer,
        global: globalReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(adminUsersApi.middleware)
        .concat(adminRolesApi.middleware)
        .concat(adminPermissionsApi.middleware)
        .concat(adminCategoriesApi.middleware)
        .concat(adminProductsApi.middleware)
        .concat(clientProductsApi.middleware)
        .concat(clientCategoriesApi.middleware)
        .concat(clientOrdersApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
