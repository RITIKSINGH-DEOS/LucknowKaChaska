import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="border-b border-neutral-200 pb-6 mb-8 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-1">
            Publishing Console
          </span>
          <h1 className="text-2xl font-black text-neutral-900 tracking-tight">
            LucknowKaChaska Admin<span className="text-neutral-400">.</span>
          </h1>
        </div>
        <Link
          href="/"
          className="text-xs font-mono px-3 py-1.5 border border-neutral-300 rounded hover:border-neutral-900 transition-colors"
        >
          ← Back to Site
        </Link>
      </div>

      <div className="p-8 border border-neutral-200 rounded-lg bg-neutral-50 text-center space-y-4">
        <div className="inline-block p-3 rounded-full bg-neutral-200 text-neutral-800 text-xl font-mono">
          🛠️
        </div>
        <h2 className="text-lg font-bold text-neutral-900">
          Admin Console Ready for Phase 3 Implementation
        </h2>
        <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
          The Phase 1 Foundation Scaffold is successfully compiled. In Phase 2 &amp; 3, this console will host the <strong>Magic One-Click AI Auto-Fill</strong> engine alongside the <strong>WordPress-style Manual Markdown Editor</strong>.
        </p>
      </div>
    </div>
  );
}
