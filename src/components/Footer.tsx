import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="font-extrabold text-base text-neutral-900 tracking-tight">
              LucknowKaChaska<span className="text-neutral-400">.</span>
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed max-w-sm">
              An independent, hyper-local food and street dining publication focused on the culinary heritage, hidden stalls, and modern cafes of Lucknow, Uttar Pradesh.
            </p>
            <div className="text-xs text-neutral-500 font-mono">
              Curated on-ground &amp; engineered by{" "}
              <a
                href="https://ritiksingh.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                Ritik Singh
              </a>.
            </div>
          </div>

          {/* Quick Hubs */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-900 font-bold">
              Food Hubs
            </h4>
            <ul className="text-xs space-y-1.5 text-neutral-600">
              <li><Link href="/#street-food" className="hover:text-black transition-colors">Gomti Nagar Rolls</Link></li>
              <li><Link href="/#biryani" className="hover:text-black transition-colors">Chowk Biryani &amp; Kebabs</Link></li>
              <li><Link href="/#cafes" className="hover:text-black transition-colors">Hazratganj Cafes</Link></li>
              <li><Link href="/#street-food" className="hover:text-black transition-colors">Aminabad Street Food</Link></li>
            </ul>
          </div>

          {/* Compliance & E-E-A-T */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-900 font-bold">
              Trust &amp; Editorial
            </h4>
            <ul className="text-xs space-y-1.5 text-neutral-600">
              <li><Link href="/about" className="hover:text-black transition-colors">About Ritik Singh</Link></li>
              <li><Link href="/contact" className="hover:text-black transition-colors">Contact / Feature Stalls</Link></li>
              <li><Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><span className="text-neutral-400">Editorial Independence</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-3">
          <p>© {new Date().getFullYear()} LucknowKaChaska. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
