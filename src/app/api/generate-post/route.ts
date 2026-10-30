// ========================================================
// File: src/app/api/generate-post/route.ts
// Purpose: Unified Ingestion, Synthesis & Media API Gateway
// ========================================================

import { NextRequest, NextResponse } from "next/server";
import { searchLocalFacts } from "@/lib/search";
import { generateFoodArticle } from "@/lib/gemini";
import { generateAndCompressImage } from "@/lib/image";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const topic = (body.topic || "").trim();
    const area = (body.area || "Gomti Nagar").trim();

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required to trigger autonomous generation." },
        { status: 400 }
      );
    }

    // Step 1: Live SERP Fact Extraction & Grounding
    const groundingData = await searchLocalFacts(topic, area);

    // Step 2: Gemini 2.0 Flash AEO/GEO Synthesis
    const article = await generateFoodArticle(topic, area, groundingData);

    // Step 3: Media Synthesis & Sharp WebP Compression (<40KB)
    const imageResult = await generateAndCompressImage(topic, article.slug);

    // Step 4: Return Unified Production Payload
    const payload = {
      meta: {
        title: article.title,
        slug: article.slug,
        description: article.metaDescription,
        targetKeyword: article.targetKeyword,
        category: article.category,
        area: article.area,
        readTime: article.readTime,
      },
      aeoSnippet: {
        quickVerdict: article.quickVerdict,
        recommendedEntity: article.comparisonTable[0]?.spotName || "Local Favorite",
      },
      geoComparisonGrid: article.comparisonTable,
      sections: article.sections,
      faqs: article.faqs,
      structuredSchemas: article.jsonLdSchema,
      assets: {
        coverImageUrl: imageResult.publicUrl,
        format: imageResult.format,
        byteSize: imageResult.byteSize,
        isUnder40KB: imageResult.isUnderThreshold,
      },
    };

    return NextResponse.json({
      success: true,
      data: payload,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown internal server error";
    console.error("API /api/generate-post error:", err);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
