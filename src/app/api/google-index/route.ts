// ========================================================
// File: src/app/api/google-index/route.ts
// Purpose: Instant Search Engine Crawl Notification Gateway
// ========================================================

import { NextRequest, NextResponse } from "next/server";
import { triggerSearchIndexing } from "@/lib/indexing";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = (body.url || "").trim();
    const action = body.action === "URL_DELETED" ? "URL_DELETED" : "URL_UPDATED";

    if (!url) {
      return NextResponse.json(
        { success: false, error: "Target URL is required for indexing dispatch." },
        { status: 400 }
      );
    }

    const indexingResult = await triggerSearchIndexing(url, action);

    return NextResponse.json({
      success: true,
      data: {
        url,
        action,
        dispatchedAt: new Date().toISOString(),
        indexingResult,
      },
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Indexing error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
