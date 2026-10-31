import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Ritik Singh & LucknowKaChaska",
  description:
    "Learn about the mission, editorial standards, and the food explorer behind LucknowKaChaska.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="border-b border-neutral-200 pb-8 mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-2">
          Editorial & Founder Bio
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight mb-4">
          About LucknowKaChaska<span className="text-neutral-400">.</span>
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed font-mono">
          An independent food publication architected and curated by <a href="https://ritiksingh.in" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-neutral-900">Ritik Singh</a>.
        </p>
      </div>

      <div className="prose prose-neutral max-w-none space-y-6 text-sm text-neutral-800 leading-relaxed">
        <h2 className="text-xl font-bold text-neutral-900">The Problem with Modern Food Blogs</h2>
        <p>
          Most city food blogs are either sponsored advertorials for high-end cafes or shallow lists re-written by remote writers who have never tasted an authentic galouti kebab or waited in line for a hot khasta in Chowk. 
        </p>
        <p>
          <strong>LucknowKaChaska</strong> was born out of a simple conviction: <em>Lucknow’s street food deserves rigorous, honest, and hyper-local documentation.</em>
        </p>

        <h2 className="text-xl font-bold text-neutral-900 pt-4">About the Curator: <a href="https://ritiksingh.in" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Ritik Singh</a></h2>
        <p>
          I am a software engineer, SEO strategist, and lifelong food explorer born and raised around the culinary arteries of Lucknow. Whether it&apos;s mapping the best roll stalls across Gomti Nagar or finding early-morning nihari at Akbari Gate, every review on this platform is verified through direct on-ground experience.
        </p>

        <div className="p-4 border border-neutral-300 rounded bg-neutral-50 my-6">
          <h3 className="text-sm font-bold text-neutral-900 mb-2">Our 3 Non-Negotiable Editorial Principles:</h3>
          <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-700">
            <li><strong>Zero Undisclosed Sponsorships:</strong> We never accept payment to rank a stall or cafe as &ldquo;best&rdquo;.</li>
            <li><strong>Current 2026 Prices:</strong> We personally verify price-for-two and half/full plate charges before publishing.</li>
            <li><strong>Exact Landmarks:</strong> We tell you exactly which chauraha, crossing, or lane a vendor is located in.</li>
          </ul>
        </div>

        <h2 className="text-xl font-bold text-neutral-900 pt-4">Connect & Collaborate</h2>
        <p>
          Have a secret neighborhood food stall that deserves recognition? Or want to list your cafe for an honest evaluation?
        </p>
        <p>
          Reach out directly via our <Link href="/contact" className="underline font-semibold">Contact Page</Link> or email us at <code>contact@ritiksingh.in</code>.
        </p>
      </div>
    </div>
  );
}
