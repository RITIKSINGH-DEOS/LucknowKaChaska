// ========================================================
// File: src/lib/image.ts
// Purpose: WebP Media Generation & Compression Engine (<40KB)
// ========================================================

import fs from "fs";
import path from "path";
import sharp from "sharp";

export interface ProcessedImageResult {
  publicUrl: string;
  byteSize: number;
  format: "webp";
  isUnderThreshold: boolean; // Must be true for < 40KB
}

/**
 * Generates and compresses a featured cover image to WebP format strictly under 40 KB.
 */
export async function generateAndCompressImage(
  topic: string,
  slug: string
): Promise<ProcessedImageResult> {
  const imagesDir = path.join(process.cwd(), "public", "images", "posts");

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const outputPath = path.join(imagesDir, `${slug}.webp`);
  const publicUrl = `/images/posts/${slug}.webp`;

  // Create visual prompt
  const cleanPrompt = `Authentic appetizing ${topic} in Lucknow street food market, professional culinary photography, high contrast lighting, delicious, 16:9 aspect ratio`;
  const encodedPrompt = encodeURIComponent(cleanPrompt);
  const sourceUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=450&nologo=true`;

  let imageBuffer: Buffer | null = null;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const response = await fetch(sourceUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      imageBuffer = Buffer.from(arrayBuffer);
    }
  } catch (err) {
    console.warn("External image fetch timed out or failed, generating clean fallback SVG graphic:", err);
  }

  // If external fetch fails, create a clean minimalist SVG buffer
  if (!imageBuffer) {
    const svgGraphic = `
    <svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#111827"/>
      <rect x="20" y="20" width="760" height="410" fill="none" stroke="#374151" stroke-width="2"/>
      <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-family="-apple-system, sans-serif" font-weight="900" font-size="28">
        LUCKNOWKACHASKA
      </text>
      <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="#9CA3AF" font-family="monospace" font-size="16">
        ${topic.toUpperCase().slice(0, 45)}
      </text>
    </svg>
    `;
    imageBuffer = Buffer.from(svgGraphic);
  }

  // Compress using Sharp: Resize to 800x450, convert to WebP, optimize quality
  const compressedBuffer = await sharp(imageBuffer)
    .resize(800, 450, { fit: "cover" })
    .webp({ quality: 72, effort: 6 })
    .toBuffer();

  fs.writeFileSync(outputPath, compressedBuffer);

  const byteSize = compressedBuffer.length;
  const isUnderThreshold = byteSize <= 40960; // 40 KB in bytes

  return {
    publicUrl,
    byteSize,
    format: "webp",
    isUnderThreshold,
  };
}
