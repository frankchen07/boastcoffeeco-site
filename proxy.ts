import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { WHOLESALE_AUTH_COOKIE, isValidCookie } from "@/lib/wholesale-auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/wholesaleshop/login") {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(WHOLESALE_AUTH_COOKIE)?.value;
  if (isValidCookie(cookie)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/wholesaleshop/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: "/wholesaleshop/:path*",
};
