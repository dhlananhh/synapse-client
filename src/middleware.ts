import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("synapse-tokens");

  const isAppRoute = request.nextUrl.pathname.startsWith("/app");

  if (isAppRoute && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/app/(auth)/:path*",
    "/app/(main)/:path*",
  ],
};
