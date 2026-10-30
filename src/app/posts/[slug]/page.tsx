import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPostRecords, getPostRecordBySlug } from "@/lib/posts";


interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPostRecords();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostRecordBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://food.ritiksingh.in";
  const postUrl = `${baseUrl}/posts/${post.slug}`;

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: postUrl,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ["Ritik Singh"],
      images: [
        {
          url: post.coverImageUrl.startsWith("http")
            ? post.coverImageUrl
            : `${baseUrl}${post.coverImageUrl}`,
          width: 800,
          height: 450,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.coverImageUrl],
    },
  };
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostRecordBySlug(slug);

  if (!post) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://food.ritiksingh.in";
  const postUrl = `${baseUrl}/posts/${post.slug}`;

  // Build JSON-LD Schemas (Article + ItemList + FAQPage)
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        mainEntityOfPage: postUrl,
        author: {
          "@type": "Person",
          name: "Ritik Singh",
          url: "https://ritiksingh.in",
          jobTitle: "Lead Food Explorer & Software Engineer",
        },
        publisher: {
          "@type": "Organization",
          name: "LucknowKaChaska",
          url: baseUrl,
        },
        image: [post.coverImageUrl.startsWith("http") ? post.coverImageUrl : `${baseUrl}${post.coverImageUrl}`],
      },
      {
        "@type": "ItemList",
        name: post.title,
        description: `Verified ranking of top food spots in ${post.area}, Lucknow`,
        itemListElement: (post.comparisonTable || []).map((row, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: `${row.spotName} (${row.landmark})`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: (post.faqs || []).map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="text-xs font-mono text-neutral-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span>›</span>
        <span className="text-neutral-700">{post.category}</span>
        <span>›</span>
        <span className="text-neutral-400 truncate max-w-[200px]">{post.slug}</span>
      </nav>

      {/* Header Info */}
      <header className="mb-8 border-b border-neutral-200 pb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-neutral-100 text-neutral-800">
            {post.category}
          </span>
          <span className="text-xs font-mono text-neutral-500">
            📍 {post.area}, Lucknow
          </span>
          <span className="text-neutral-300">•</span>
          <span className="text-xs font-mono text-neutral-500">{post.readTime}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-tight mb-4">
          {post.title}
        </h1>

        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6">
          {post.metaDescription}
        </p>

        {/* Author Byline */}
        <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 text-xs font-mono text-neutral-600">
          <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
            RS
          </div>
          <div>
            <div className="font-bold text-neutral-900">
              Curated by <Link href="/about" className="hover:underline">Ritik Singh</Link>
            </div>
            <div className="text-[11px] text-neutral-400">
              Updated: {new Date(post.updatedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })} • Verified On-Ground
            </div>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      {post.coverImageUrl && (
        <div className="mb-10 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            width={800}
            height={450}
            priority
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* ======================================================== */}
      {/* ⚡ AEO POSITION #0 QUICK VERDICT CALLOUT BOX             */}
      {/* ======================================================== */}
      {post.quickVerdict && (
        <div className="mb-10 p-5 sm:p-6 border-2 border-neutral-900 rounded-lg bg-neutral-50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">⚡</span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900">
              Quick Verdict
            </span>
          </div>
          <p className="text-sm font-medium text-neutral-800 leading-relaxed">
            {post.quickVerdict.replace(/\*\*/g, "")}

          </p>
        </div>
      )}

      {/* ======================================================== */}
      {/* 📊 GEO COMPARISON GRID (Perplexity & AI Citation Bait)   */}
      {/* ======================================================== */}
      {post.comparisonTable && post.comparisonTable.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-bold text-neutral-900 tracking-tight mb-3">
            Quick Comparison: Top Spots at a Glance
          </h2>
          <div className="border border-neutral-200 rounded-lg overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-900 text-white font-mono uppercase text-[11px]">
                <tr>
                  <th className="p-3">Spot Name</th>
                  <th className="p-3">Landmark</th>
                  <th className="p-3">Signature Dish</th>
                  <th className="p-3">Price (₹)</th>
                  <th className="p-3">Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                {post.comparisonTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="p-3 font-bold text-neutral-900 whitespace-nowrap">
                      {idx + 1}. {row.spotName}
                    </td>
                    <td className="p-3 text-neutral-600 whitespace-nowrap">{row.landmark}</td>
                    <td className="p-3 text-neutral-800 font-medium">{row.signatureDish}</td>
                    <td className="p-3 font-mono text-neutral-900 font-bold whitespace-nowrap">
                      {row.priceRange}
                    </td>
                    <td className="p-3 text-neutral-500 font-mono text-[11px] whitespace-nowrap">
                      {row.hours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* DETAILED ARTICLE CONTENT                                */}
      {/* ======================================================== */}
      <section className="space-y-6 text-sm text-neutral-800 leading-relaxed border-b border-neutral-200 pb-12 mb-12">
        <div
          className="prose prose-neutral max-w-none space-y-4"
          dangerouslySetInnerHTML={{
            __html: post.contentMarkdown
              .replace(/## (.*?)\n/g, '<h2 class="text-xl font-bold text-neutral-900 pt-4 mt-6 border-t border-neutral-100">$1</h2>')
              .replace(/\* \*\*(.*?):\*\* (.*?)(?:\n|$)/g, '<div class="text-xs my-1.5"><strong class="text-neutral-900 font-mono">$1:</strong> <span class="text-neutral-700">$2</span></div>')
              .replace(/\*\*/g, "")
              .replace(/\n\n/g, "<p class='text-sm text-neutral-700 leading-relaxed my-3'></p>")
              .replace(/---/g, '<hr class="my-6 border-neutral-200" />'),




          }}
        />
      </section>

      {/* ======================================================== */}
      {/* ❓ FAQS SECTION (Google People Also Ask)                 */}
      {/* ======================================================== */}
      {post.faqs && post.faqs.length > 0 && (
        <section className="mb-14">
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {post.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group border border-neutral-200 rounded-lg p-4 bg-neutral-50 open:bg-white transition-all"
              >
                <summary className="font-bold text-sm text-neutral-900 cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <span className="font-mono text-neutral-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-xs text-neutral-600 leading-relaxed pt-2 border-t border-neutral-100">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Author Credential Footer Box */}
      <section className="p-6 border border-neutral-900 rounded-lg bg-neutral-900 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white text-neutral-900 flex items-center justify-center font-black text-sm shrink-0">
            RS
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm">Written &amp; Verified by Ritik Singh</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Software Architect &amp; Local Food Enthusiast based in Gomti Nagar, Lucknow. Every venue is evaluated for taste, hygiene, price transparency, and neighborhood reputation.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-neutral-400">
              <Link href="/about" className="text-white underline hover:no-underline">
                Review Policy
              </Link>
              <span>•</span>
              <Link href="/contact" className="text-white underline hover:no-underline">
                Submit Stall Update
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
