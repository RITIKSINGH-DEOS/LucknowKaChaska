// ========================================================
// File: src/app/api/auth/logout/route.ts
// Purpose: Clear Admin Session Cookie on Logout
// ========================================================

import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Admin session terminated successfully.",
  });

  response.cookies.delete("admin_session");

  return response;
}
