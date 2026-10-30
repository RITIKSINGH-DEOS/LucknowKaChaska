import Link from "next/link";

interface FoodGuide {
  title: string;
  slug: string;
  category: "Street Food" | "Biryani" | "Cafes" | "Breakfast";
  area: string;
  readTime: string;
  updatedAt: string;
  excerpt: string;
  priceRange: string;
}

const FEATURED_GUIDES: FoodGuide[] = [
  {
    title: "5 Best Kathi & Chicken Roll Spots in Gomti Nagar",
    slug: "best-rolls-in-gomti-nagar",
    category: "Street Food",
    area: "Gomti Nagar",
    readTime: "3 min read",
    updatedAt: "Oct 2026",
    excerpt: "From Manish Eating Point's legendary double chicken shawarma at Patrakarpuram to budget egg rolls at Manoj Pandey Chauraha. Complete 2026 price guide.",
    priceRange: "₹80 – ₹160",
  },
  {
    title: "Top 5 Authentic Awadhi Biryani Spots in Chowk (Beyond Tunday)",
    slug: "best-biryani-in-chowk",
    category: "Biryani",
    area: "Chowk / Old City",
    readTime: "4 min read",
    updatedAt: "Oct 2026",
    excerpt: "A deep dive into slow-cooked dum biryani in historic Chowk alleys. Detailed breakdown of Idris, Lalla, and hidden Akbari Gate handi secrets.",
    priceRange: "₹120 – ₹220",
  },
  {
    title: "7 Best Rooftop & Work-Friendly Cafes in Hazratganj",
    slug: "best-cafes-in-hazratganj",
    category: "Cafes",
    area: "Hazratganj",
    readTime: "4 min read",
    updatedAt: "Oct 2026",
    excerpt: "Looking for fast Wi-Fi, peaceful aesthetics, or romantic rooftop views? Here are Hazratganj's top-rated hangout spots with price-for-two breakdown.",
    priceRange: "₹400 – ₹900 for two",
  },
  {
    title: "Top 5 Breakfast Khasta Kachori Spots in Old Lucknow",
    slug: "best-khasta-lucknow",
    category: "Breakfast",
    area: "Aminabad & Chowk",
    readTime: "3 min read",
    updatedAt: "Oct 2026",
    excerpt: "Crispy flaky khasta paired with spicy urad dal and tangy aloo-chhole sabzi. Why morning foodies swear by Bajpayee, Durga, and Rathore.",
    priceRange: "₹30 – ₹60 per plate",
  },
];

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Hero Header */}
      <section className="mb-14 pb-12 border-b border-neutral-200">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-neutral-100 text-[11px] font-mono uppercase tracking-wider text-neutral-700 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Hyper-Local Food Authority • Lucknow, UP
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 leading-[1.1] mb-5">
          The Honest Lucknow Food & Street Eat Guide<span className="text-neutral-400">.</span>
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 max-w-2xl leading-relaxed mb-6">
          No paid PR rankings. Just verified on-ground prices, landmark locations, and authentic Awadhi street recommendations curated by Lucknowites who eat here daily.
        </p>

        {/* Quick Filter Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {["All Guides", "Gomti Nagar Rolls", "Chowk Biryani", "Hazratganj Cafes", "Late Night Stalls"].map(
            (tag, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-3 py-1.5 border border-neutral-300 rounded hover:border-neutral-900 cursor-pointer transition-colors"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </section>

      {/* Trust & Performance Metrics Callout */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-neutral-200 rounded-lg bg-neutral-50 mb-14 text-center">
        <div>
          <div className="text-lg font-black text-neutral-900">0.3s</div>
          <div className="text-[11px] font-mono text-neutral-500 uppercase">Load Latency</div>
        </div>
        <div>
          <div className="text-lg font-black text-neutral-900">100%</div>
          <div className="text-[11px] font-mono text-neutral-500 uppercase">On-Ground Verified</div>
        </div>
        <div>
          <div className="text-lg font-black text-neutral-900">&lt; 38 KB</div>
          <div className="text-[11px] font-mono text-neutral-500 uppercase">Image Payloads</div>
        </div>
        <div>
          <div className="text-lg font-black text-neutral-900">EN / HI</div>
          <div className="text-[11px] font-mono text-neutral-500 uppercase">Dual Vernacular</div>
        </div>
      </section>

      {/* Featured Food Guides Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">
            Latest Curated Guides
          </h2>
          <span className="text-xs font-mono text-neutral-500">
            Showing {FEATURED_GUIDES.length} Verified Entries
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURED_GUIDES.map((guide) => (
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
                  {guide.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="font-mono text-neutral-500">
                  Est. Cost: <strong className="text-neutral-900">{guide.priceRange}</strong>
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
