// ========================================================
// File: src/lib/posts.ts
// Purpose: Git-Native File Persistence Engine (content/posts)
// ========================================================

import fs from "fs";
import path from "path";

export interface ComparisonRow {
  spotName: string;
  landmark: string;
  signatureDish: string;
  priceRange: string;
  hours: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PostRecord {
  slug: string;
  title: string;
  metaDescription: string;
  targetKeyword: string;
  category: string;
  area: string;
  readTime: string;
  quickVerdict: string;
  coverImageUrl: string;
  comparisonTable: ComparisonRow[];
  contentMarkdown: string;
  faqs: FAQItem[];
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string;
  updatedAt: string;
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function ensureDirectoryExists() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
    seedInitialPosts();
  }
}

/**
 * Seeds initial curated posts if the repository is completely fresh.
 */
function seedInitialPosts() {
  const initialGomtiNagarRolls: PostRecord = {
    slug: "best-rolls-in-gomti-nagar",
    title: "5 Best Kathi & Chicken Roll Spots in Gomti Nagar (2026 Prices & Timings)",
    metaDescription: "Craving a juicy chicken shawarma or crispy kathi roll in Gomti Nagar? Here are the top 5 roll corners with verified 2026 prices, landmarks, and must-try rolls.",
    targetKeyword: "best roll in gomti nagar lucknow",
    category: "Street Food",
    area: "Gomti Nagar",
    readTime: "3 min read",
    quickVerdict: "The best chicken shawarma roll in Gomti Nagar is found at Manish Eating Point (Patrakarpuram) for its tender meat and garlic mayo, while Roll Express near Manoj Pandey Chauraha is unbeatable for budget veg and egg rolls under ₹100.",
    coverImageUrl: "/images/posts/top-5-kathi-rolls-in-gomti-nagar.webp",
    comparisonTable: [
      { spotName: "Manish Eating Point", landmark: "Patrakarpuram Crossing", signatureDish: "Double Chicken Shawarma", priceRange: "₹120 – ₹160", hours: "6:00 PM – 11:00 PM" },
      { spotName: "Roll Express", landmark: "Manoj Pandey Chauraha", signatureDish: "Paneer & Egg Chicken Roll", priceRange: "₹80 – ₹140", hours: "5:00 PM – 11:30 PM" },
      { spotName: "The Roll Xpress", landmark: "Vivek Khand (Near Dayal)", signatureDish: "Butter Chicken Kathi Roll", priceRange: "₹110 – ₹180", hours: "1:00 PM – 11:00 PM" },
      { spotName: "Al-Baike Chatori Gali", landmark: "1090 Roundabout Strip", signatureDish: "Crispy Fried Chicken Mayo", priceRange: "₹90 – ₹150", hours: "5:30 PM – Midnight" },
      { spotName: "Kathi Nation", landmark: "Gomti Nagar Extension", signatureDish: "Afghani Malai Chaap Roll", priceRange: "₹100 – ₹190", hours: "4:00 PM – 11:00 PM" },
    ],
    contentMarkdown: `## 1. Manish Eating Point (Patrakarpuram) — The Shawarma Champion
When it comes to evening street food in Gomti Nagar, Patrakarpuram is the beating heart, and **Manish Eating Point** is its undisputed star. While they serve a full Awadhi menu, their roll counter is constantly packed.

* **Why it ranks #1:** Their shawarma chicken is slow-roasted, tender, and wrapped in a soft, flaky rumali paratha layered with homemade garlic mayo and crisp onions.
* **Must-Try Dish:** Double Chicken Shawarma Roll (₹140).
* **Location:** Near Patrakarpuram Chauraha, Gomti Nagar.
* **Parking Tip:** Roadside casual; two-wheeler parking is easy in the service lane.

---

## 2. Roll Express (Manoj Pandey Chauraha) — Best for Budget & Veg
If you are near Manoj Pandey Chauraha and looking for a quick bite under ₹100, **Roll Express** is the local favorite.

* **Why it ranks #2:** Freshly tossed paneer tawa gravy and crispy lachha parathas made on order.
* **Must-Try Dish:** Paneer Tikka Kathi Roll (₹90) & Double Egg Single Chicken Roll (₹110).
* **Location:** Manoj Pandey Chauraha service lane, Gomti Nagar.
* **Opening Hours:** 5:00 PM to 11:30 PM.`,
    faqs: [
      { question: "Which spot serves the best chicken roll in Gomti Nagar under ₹100?", answer: "Roll Express near Manoj Pandey Chauraha offers their classic Single Egg Single Chicken Roll for just ₹90." },
      { question: "Are there vegetarian options available?", answer: "Yes, Roll Express and Kathi Nation have separate dedicated tawas for paneer and soya chaap rolls." },
      { question: "Which roll corners stay open late at night in Gomti Nagar?", answer: "The roll corners near Chatori Gali and 1090 roundabout stay active till 12:00 AM." },
    ],
    status: "PUBLISHED",
    publishedAt: "2026-10-30T18:00:00.000Z",
    updatedAt: "2026-10-31T01:00:00.000Z",
  };

  fs.writeFileSync(
    path.join(POSTS_DIR, "best-rolls-in-gomti-nagar.json"),
    JSON.stringify(initialGomtiNagarRolls, null, 2)
  );
}

/**
 * Retrieves all posts sorted by updated date (newest first).
 */
export async function getAllPostRecords(): Promise<PostRecord[]> {
  ensureDirectoryExists();

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".json"));
  const posts: PostRecord[] = [];

  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
      const parsed: PostRecord = JSON.parse(raw);
      posts.push(parsed);
    } catch (e) {
      console.error(`Error reading post file ${file}:`, e);
    }
  }

  return posts.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

/**
 * Retrieves a single post record by its slug.
 */
export async function getPostRecordBySlug(slug: string): Promise<PostRecord | null> {
  ensureDirectoryExists();

  const filePath = path.join(POSTS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as PostRecord;
  } catch (e) {
    console.error(`Error reading post ${slug}:`, e);
    return null;
  }
}

/**
 * Saves or updates a post record directly to disk.
 */
export async function savePostRecord(post: PostRecord): Promise<void> {
  ensureDirectoryExists();

  const filePath = path.join(POSTS_DIR, `${post.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(post, null, 2), "utf-8");
}
