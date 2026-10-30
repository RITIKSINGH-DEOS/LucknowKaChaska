import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy and transparency standards for LucknowKaChaska.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="border-b border-neutral-200 pb-8 mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-2">
          Legal & Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight mb-4">
          Privacy Policy<span className="text-neutral-400">.</span>
        </h1>
        <p className="text-xs text-neutral-500 font-mono">
          Last Updated: October 31, 2026
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
        <p>
          At <strong>LucknowKaChaska</strong> (operating at <code>food.ritiksingh.in</code>), accessible from across the globe, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded and how we use it.
        </p>

        <h2 className="text-base font-bold text-neutral-900 pt-2">1. Information We Do Not Collect</h2>
        <p>
          We do not require user accounts, passwords, or personal data to read our guides. We do not sell, rent, or trade your personal information to third parties under any circumstances.
        </p>

        <h2 className="text-base font-bold text-neutral-900 pt-2">2. Log Files & Analytics</h2>
        <p>
          Like any standard web property, LucknowKaChaska uses standard server log files provided by our hosting infrastructure (Vercel). The information collected includes IP addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and number of clicks. These are not linked to any personally identifiable information.
        </p>

        <h2 className="text-base font-bold text-neutral-900 pt-2">3. Cookies & Advertising (Google AdSense)</h2>
        <p>
          Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to LucknowKaChaska. Users may opt out of personalized advertising by visiting Google Ads Settings.
        </p>

        <h2 className="text-base font-bold text-neutral-900 pt-2">4. Contact Information</h2>
        <p>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <code>contact@ritiksingh.in</code>.
        </p>
      </div>
    </div>
  );
}
