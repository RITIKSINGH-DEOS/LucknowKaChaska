// ========================================================
// File: src/app/api/posts/route.ts
// Purpose: Content Persistence & Retrieval API Handler
// ========================================================

import { NextRequest, NextResponse } from "next/server";
import { getAllPostRecords, savePostRecord, PostRecord } from "@/lib/posts";

export async function GET() {
  try {
    const posts = await getAllPostRecords();
    return NextResponse.json({ success: true, data: posts });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to load posts";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: PostRecord = await req.json();

    if (!body.title || !body.slug) {
      return NextResponse.json(
        { success: false, error: "Title and slug are required." },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const postRecord: PostRecord = {
      ...body,
      slug: body.slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
      publishedAt: body.publishedAt || now,
      updatedAt: now,
    };

    await savePostRecord(postRecord);

    return NextResponse.json({
      success: true,
      data: postRecord,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to save post";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
