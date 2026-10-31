import Link from "next/link";
import { getAllPostRecords } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";

export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams?: Promise<{
    category?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const currentCategory = resolvedSearchParams?.category?.trim() || "";

  const allPosts = await getAllPostRecords();
  const publishedPosts = allPosts.filter((p) => p.status === "PUBLISHED");

  const filteredPosts = currentCategory
    ? publishedPosts.filter(
        (p) => p.category?.toLowerCase() === currentCategory.toLowerCase()
      )
    : publishedPosts;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Hero Header */}
      <section className="mb-12 pb-10 border-b border-neutral-200">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-neutral-100 text-[11px] font-mono uppercase tracking-wider text-neutral-700 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Hyper-Local Food Authority • Lucknow, UP
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 leading-[1.1] mb-5">
          The Honest Lucknow Food &amp; Street Eat Guide<span className="text-neutral-400">.</span>
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 max-w-2xl leading-relaxed mb-6">
          No paid PR rankings. Just verified on-ground prices, landmark locations, and authentic Awadhi street recommendations curated by Lucknowites who eat here daily.
        </p>

        {/* Standardized Category Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <Link
            href="/"
            className={`text-xs font-mono px-3 py-1.5 rounded transition-all ${
              !currentCategory
                ? "bg-neutral-900 text-white font-bold shadow-sm"
                : "border border-neutral-300 text-neutral-700 hover:border-neutral-900 bg-white"
            }`}
          >
            All Guides
          </Link>
          {CATEGORIES.map((cat) => {
            const isSelected =
              currentCategory.toLowerCase() === cat.toLowerCase();
            return (
              <Link
                key={cat}
                href={`/?category=${encodeURIComponent(cat)}`}
                className={`text-xs font-mono px-3 py-1.5 rounded transition-all ${
                  isSelected
                    ? "bg-neutral-900 text-white font-bold shadow-sm"
                    : "border border-neutral-300 text-neutral-700 hover:border-neutral-900 bg-white"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Food Guides Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">
            {currentCategory ? `Guides: ${currentCategory}` : "Latest Curated Guides"}
          </h2>
          <span className="text-xs font-mono text-neutral-500">
            Showing {filteredPosts.length} {filteredPosts.length === 1 ? "Entry" : "Entries"}
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-neutral-300 rounded-lg bg-neutral-50">
            <p className="text-sm font-bold text-neutral-900 mb-1">
              No guides published under &quot;{currentCategory}&quot; yet.
            </p>
            <p className="text-xs text-neutral-500 font-mono mb-4">
              Our food intelligence team is curating on-ground entries for this category.
            </p>
            <Link
              href="/"
              className="inline-flex items-center text-xs font-mono font-bold px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800 transition-colors shadow-sm"
            >
              ← View All Guides
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((guide) => (
              <article
                key={guide.slug}
                className="border border-neutral-200 rounded-lg p-6 bg-white hover:border-neutral-900 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-500 font-mono mb-3">
                    <span className="px-2 py-0.5 bg-neutral-100 rounded text-neutral-800 font-semibold">
                      {guide.category}
                    </span>
                    <span>{guide.area} • {guide.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:underline underline-offset-2 mb-2 leading-snug">
                    <Link href={`/posts/${guide.slug}`}>{guide.title}</Link>
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                    {guide.metaDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="font-mono text-neutral-500">
                    Quick Verdict: <strong className="text-neutral-900">{guide.comparisonTable[0]?.spotName || "Verified"}</strong>
                  </span>
                  <Link
                    href={`/posts/${guide.slug}`}
                    className="font-semibold text-neutral-900 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                  >
                    Read Guide →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Author Byline & E-E-A-T Callout */}
      <section className="mt-16 p-6 sm:p-8 border border-neutral-900 bg-neutral-900 text-white rounded-lg">
        <div className="max-w-2xl">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
            The Editorial Commitment
          </span>
          <h3 className="text-xl font-bold mb-3 tracking-tight">
            Curated on-ground by Ritik Singh
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
            We don&apos;t scrape generic listicles or accept undisclosed paid placements. Every spot reviewed is visited, tasted, and cross-referenced with real Google Maps sentiment and neighborhood consensus.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
            <span>📍 Lucknow, India</span>
            <span>•</span>
            <Link href="/about" className="text-white hover:underline">
              Read Our Review Policy →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
