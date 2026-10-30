// ========================================================
// File: src/app/api/auth/login/route.ts
// Purpose: Secure Admin Login Authentication Gateway
// ========================================================

import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials } from "@/lib/auth-config";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const isValid = verifyCredentials(email, password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password. Please try again." },
        { status: 401 }
      );
    }

    // Set secure HTTP-only session cookie (Valid for 30 days)
    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful.",
    });

    response.cookies.set("admin_session", "authenticated_ritik_session", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Authentication error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
