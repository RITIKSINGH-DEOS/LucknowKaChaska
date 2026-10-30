import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Feature Your Cafe",
  description:
    "Get in touch with the LucknowKaChaska team for food tips, stall recommendations, and local listings.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="border-b border-neutral-200 pb-8 mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-2">
          Reach the Editorial Desk
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight mb-4">
          Contact LucknowKaChaska<span className="text-neutral-400">.</span>
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed font-mono">
          Direct inquiries for reviews, local sponsorships, and neighborhood stall recommendations.
        </p>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 border border-neutral-200 rounded-lg bg-neutral-50">
            <h3 className="font-bold text-sm text-neutral-900 mb-1">Direct Editorial Email</h3>
            <p className="text-xs text-neutral-600 mb-3">For reviews, corrections, and reader tips.</p>
            <a
              href="mailto:contact@ritiksingh.in"
              className="text-xs font-mono font-bold text-neutral-900 underline"
            >
              contact@ritiksingh.in
            </a>
          </div>

          <div className="p-5 border border-neutral-200 rounded-lg bg-neutral-50">
            <h3 className="font-bold text-sm text-neutral-900 mb-1">Location / Headquarters</h3>
            <p className="text-xs text-neutral-600 mb-3">On-ground operations & research.</p>
            <span className="text-xs font-mono font-bold text-neutral-900">
              Gomti Nagar, Lucknow, UP 226010
            </span>
          </div>
        </div>

        {/* Contact Submission Box */}
        <div className="border border-neutral-200 rounded-lg p-6 bg-white space-y-4">
          <h2 className="text-base font-bold text-neutral-900">Send a Recommendation / Message</h2>
          <form className="space-y-3" action="#">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Ritik Singh"
                className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:border-neutral-900 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="you@domain.com"
                className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:border-neutral-900 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Stall or Cafe Details</label>
              <textarea
                rows={4}
                placeholder="Tell us about the spot, signature dish, and exact landmark in Lucknow..."
                className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:border-neutral-900 outline-none"
              ></textarea>
            </div>
            <button
              type="button"
              className="px-4 py-2 bg-neutral-900 text-white text-xs font-mono rounded hover:bg-neutral-800 transition-colors"
            >
              Submit Recommendation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
