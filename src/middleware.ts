import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./routing";

const intlMiddleware = createIntlMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the user is on the root path
  if (pathname === "/" || pathname === "/en" || pathname === "/hr") {
    // Redirect to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // For all other routes, use the intl middleware
  return intlMiddleware(request);
}

/**
 * Here we add all the routes in the application
 */
export const config = {
  matcher: [
    "/",
    "/login",
    "/join",
    "/register",
    "/profile",
    "/settings",
    "/setprofile",
    "/group-events",
    "/group",
    "/orders",
    "/event",
    "/test",
    "/forgot-password",
    "/(hr|en)/:path*",
  ],
};
