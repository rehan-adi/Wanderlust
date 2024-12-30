import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("next-auth.session-token")?.value;

  const protectedRoutes = [
    "/dashboard",
    "/dashboard/chat",
    "/dashboard/generate",
    "/profile",
    "/settings",
    "/chat-history",
  ];

  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!token) {
      const loginUrl = new URL("/", request.url);
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/chat",
    "/dashboard/generate",
    "/profile",
    "/settings",
    "/chat-history",
  ],
};
