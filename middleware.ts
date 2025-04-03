import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routes } from "./utils/routes";

export function middleware(req: NextRequest) {
  const cookieData = req.cookies.get("auth_data")?.value ?? null;
  let authData: { token?: string; role?: string[] } | null = null;

  try {
    authData = cookieData ? JSON.parse(cookieData) : null;
  } catch (error) {
    console.error("Invalid auth_data cookie:", error);
    authData = null;
  }

  const token = authData?.token;
  const roles: string[] = authData?.role || [];
  const currentPath = req.nextUrl.pathname;

  const isDashboard = currentPath.startsWith(routes.dashboard);
  const isAccount = currentPath.startsWith(routes.account);
  const allowedRoles = ["admin", "super_admin"];

  if ((isDashboard || isAccount) && !token) {
    return NextResponse.redirect(new URL(routes.home, req.url));
  }

  if (isDashboard && !roles.some(role => allowedRoles.includes(role))) {
    return NextResponse.redirect(new URL(routes.home, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_static|favicon.ico|sitemap.xml).*)"],
};
