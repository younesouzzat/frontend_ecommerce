export const routes = {
  home: "/",
  shop: "/shop",
  about: "/about-us",
  contact: "/contact-us",
  account: "/account",
  agentOrder: (id: string | number) => `/my-orders/${id}`,
  wishlist: "/wishlist",
  checkout: "/checkout",
  orderComplete: "/order-complete",
  product: (id: string | number) => `/product/${id}`,
  login: "/login",
  signup: "/signup",
  requestpwd: "/request-password",
  resetpwd: "/reset-password",
  dashboard: "/dashboard",
  adminUsers: "/dashboard/users",
  adminCreateUser: "/dashboard/users/create",
  adminUpdateUser: (id: string | number) => `/dashboard/users/edit/${id}`,
  adminRoles: "/dashboard/roles",
  adminCreateRole: "/dashboard/roles/create",
  adminUpdateRole: (id: string | number) => `/dashboard/roles/edit/${id}`,
  adminUpdatePermission: (id: string | number) =>
    `/dashboard/permissions/edit/${id}`,
  adminCategories: "/dashboard/categories",
  adminCreateCategorie: "/dashboard/categories/create",
  adminUpdateCategorie: (id: string | number) =>
    `/dashboard/categories/edit/${id}`,
  adminProducts: "/dashboard/products",
  adminCreateProduct: "/dashboard/products/create",
  adminUpdateProduct: (id: string | number) => `/dashboard/products/edit/${id}`,
  adminOrders: "/dashboard/orders",
  adminUpdateOrder: (id: string | number) => `/dashboard/orders/edit/${id}`,
} as const;

export type RouteKey = keyof typeof routes;

export const getRoute = (name: RouteKey, param?: string | number): string => {
  const route = routes[name];
  return typeof route === "function" ? route(param!) : route;
};
