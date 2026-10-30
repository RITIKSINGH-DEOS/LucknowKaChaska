// ========================================================
// File: src/app/feed.xml/route.ts
// Purpose: Automated RSS 2.0 Feed for Google News Publisher
// ========================================================

import { NextResponse } from "next/server";
import { getAllPostRecords } from "@/lib/posts";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://food.ritiksingh.in";
  const posts = await getAllPostRecords();
  const publishedPosts = posts.filter((p) => p.status === "PUBLISHED");

  const rssItems = publishedPosts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/posts/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/posts/${post.slug}</guid>
      <description><![CDATA[${post.metaDescription}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>contact@ritiksingh.in (Ritik Singh)</author>
      <category><![CDATA[${post.category}]]></category>
    </item>`
    )
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>LucknowKaChaska — The Honest Lucknow Food &amp; Street Eat Guide</title>
    <link>${baseUrl}</link>
    <description>Authentic Awadhi food trails, kathi rolls, and cafe guides curated on-ground by Ritik Singh.</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
