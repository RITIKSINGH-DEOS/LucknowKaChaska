// ========================================================
// File: src/app/sitemap.ts
// Purpose: Dynamic XML Sitemap for Google Search Console
// ========================================================

import { MetadataRoute } from "next";
import { getAllPostRecords } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://food.ritiksingh.in";
  const posts = await getAllPostRecords();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => post.status === "PUBLISHED")
    .map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

  return [...staticRoutes, ...postRoutes];
}
