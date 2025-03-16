import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// const authPages = ["/login", "/signup", "/request-password", "/reset-password"];
// const publicPaths = [...authPages, "/"];

// export const config = {
//   matcher: ["/((?!api|_next|_static|favicon.ico|sitemap.xml).*)"],
// };

export function middleware(req: NextRequest) {
  // const authData = req.cookies.get("auth_data")?.value
  //   ? JSON.parse(req.cookies.get("auth_data")?.value)
  //   : null;
  
  // const token = authData?.token;
  // const role  = authData?.role;
  // const currentPath = req.nextUrl.pathname;

  // const isAuthPage = authPages.includes(currentPath);
  // const isPublicPage = publicPaths.includes(currentPath);

  // if (isAuthPage && token) {
  //   // return NextResponse.redirect(new URL("/dashboard", req.url));
  //   if (role === 'admin') {
  //     return NextResponse.redirect(new URL("/dashboard", req.url));
  //   } else if (role === 'user') {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  // }

  // if (!isPublicPage && !token) {
  //   // return NextResponse.redirect(new URL("/login", req.url));
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  return NextResponse.next();
}
