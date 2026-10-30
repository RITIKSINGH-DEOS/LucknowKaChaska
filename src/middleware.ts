// ========================================================
// File: src/middleware.ts
// Purpose: Protect /admin routes against unauthorized direct URL access
// ========================================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin/new and nested admin paths
  if (pathname.startsWith("/admin/new")) {
    const session = request.cookies.get("admin_session");
    if (!session || session.value !== "authenticated_ritik_session") {
      const loginUrl = new URL("/admin", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/new/:path*"],
};
