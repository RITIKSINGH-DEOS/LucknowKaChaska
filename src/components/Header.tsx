import Link from "next/link";
import GoogleTranslate from "./GoogleTranslate";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Identity */}
        <Link href="/" className="flex flex-col group">
          <span className="font-extrabold text-lg sm:text-xl tracking-tight text-neutral-900 group-hover:opacity-80 transition-opacity">
            LucknowKaChaska<span className="text-neutral-400">.</span>
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
            food.ritiksingh.in
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-700">
          <Link href="/#street-food" className="hover:text-black transition-colors">
            Street Food
          </Link>
          <Link href="/#cafes" className="hover:text-black transition-colors">
            Cafes
          </Link>
          <Link href="/#biryani" className="hover:text-black transition-colors">
            Biryani & Kebabs
          </Link>
          <Link href="/about" className="hover:text-black transition-colors">
            About
          </Link>
        </nav>

        {/* Translation Widget & Admin Link */}
        <div className="flex items-center gap-3">
          <GoogleTranslate />
          <Link
            href="/admin"
            className="text-xs font-mono font-medium px-2.5 py-1.5 border border-neutral-900 bg-neutral-900 text-white rounded hover:bg-neutral-800 transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
