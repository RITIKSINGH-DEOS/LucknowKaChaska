import Link from "next/link";
import GoogleTranslate from "./GoogleTranslate";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Identity */}
        <Link href="/" className="flex items-center group">
          <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-neutral-900 group-hover:opacity-80 transition-opacity">
            LucknowKaChaska<span className="text-neutral-400">.</span>
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
            Biryani &amp; Kebabs
          </Link>
          <Link href="/about" className="hover:text-black transition-colors">
            About
          </Link>
        </nav>

        {/* Translation Widget (Admin link completely removed from public view) */}
        <div className="flex items-center gap-3">
          <GoogleTranslate />
        </div>
      </div>
    </header>
  );
}
