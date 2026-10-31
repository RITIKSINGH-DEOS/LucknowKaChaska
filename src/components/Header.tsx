import Link from "next/link";
import GoogleTranslate from "./GoogleTranslate";
import { CATEGORIES } from "@/lib/categories";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <Link href="/" className="flex items-center group shrink-0">
          <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-neutral-900 group-hover:opacity-80 transition-opacity">
            LucknowKaChaska<span className="text-neutral-400">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-5 text-xs lg:text-[13px] font-medium text-neutral-700">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/?category=${encodeURIComponent(cat)}`}
              className="hover:text-black transition-colors whitespace-nowrap"
            >
              {cat}
            </Link>
          ))}
          <Link
            href="/about"
            className="hover:text-black transition-colors whitespace-nowrap text-neutral-500 hover:text-neutral-900"
          >
            About
          </Link>
        </nav>

        {/* Translation Widget */}
        <div className="flex items-center gap-3 shrink-0">
          <GoogleTranslate />
        </div>
      </div>
    </header>
  );
}
