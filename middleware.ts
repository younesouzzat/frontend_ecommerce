import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const authData = req.cookies.get("auth_data")?.value
    ? JSON.parse(req.cookies.get("auth_data")?.value)
    : null;

  const token = authData?.token;
  const roles: string[] = authData?.role || [];
  const currentPath = req.nextUrl.pathname;

  const isDashboard = currentPath.startsWith("/dashboard");
  const allowedRoles = ["admin", "super_admin"];

  if (isDashboard) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (!roles.some(role => allowedRoles.includes(role))) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_static|favicon.ico|sitemap.xml).*)"],
};