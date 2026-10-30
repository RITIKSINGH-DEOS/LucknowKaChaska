"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay?: boolean;
          },
          element: string
        ) => void;
      };
    };
  }
}

export default function GoogleTranslate() {
  const [currentLang, setCurrentLang] = useState<"en" | "hi">("en");

  useEffect(() => {
    // 1. Check existing cookie preference
    const cookies = document.cookie.split(";");
    const transCookie = cookies.find((c) => c.trim().startsWith("googtrans="));
    if (transCookie && transCookie.includes("/en/hi")) {
      setCurrentLang("hi");
    } else {
      setCurrentLang("en");
    }

    // 2. Continuous Anti-Shift Guardian: keeps body top locked to 0
    const resetBodyShift = () => {
      if (document.body.style.top && document.body.style.top !== "0px") {
        document.body.style.setProperty("top", "0px", "important");
      }
      if (document.body.style.position && document.body.style.position !== "static") {
        document.body.style.setProperty("position", "static", "important");
      }
      const banner = document.querySelector(".goog-te-banner-frame");
      if (banner) {
        banner.remove();
      }
    };

    resetBodyShift();
    const observer = new MutationObserver(resetBodyShift);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    // 3. Initialize Google Translate with hidden target
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi",
            autoDisplay: false,
          },
          "google_translate_hidden_target"
        );
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.type = "text/javascript";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => observer.disconnect();
  }, []);

  // Instant in-place smooth language switcher (Zero Page Reload!)
  const switchLanguage = (targetLang: "en" | "hi") => {
    if (targetLang === currentLang) return;
    setCurrentLang(targetLang);

    // Save cookie for persistence across pages
    document.cookie = `googtrans=/en/${targetLang}; path=/;`;
    if (window.location.hostname) {
      document.cookie = `googtrans=/en/${targetLang}; path=/; domain=${window.location.hostname};`;
      document.cookie = `googtrans=/en/${targetLang}; path=/; domain=.${window.location.hostname};`;
    }

    // 1. Try instant in-place DOM translation via Google Translate Select Combo
    const selectEl = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (selectEl) {
      selectEl.value = targetLang === "hi" ? "hi" : "";
      selectEl.dispatchEvent(new Event("change", { bubbles: true }));

      // Also handle restoration if switching to English
      if (targetLang === "en") {
        // Click Google original banner close button if present
        const closeBtn = document.querySelector<HTMLAnchorElement>(".goog-te-banner-frame .goog-close-link");
        if (closeBtn) closeBtn.click();
      }
      return;
    }

    // 2. Fallback only if Google script hasn't mounted the combo element yet
    window.location.reload();
  };

  return (
    <div className="flex items-center">
      {/* Hidden off-screen anchor for Google Translate combo */}
      <div
        id="google_translate_hidden_target"
        className="fixed -top-[9999px] -left-[9999px] opacity-0 pointer-events-none"
        aria-hidden="true"
      ></div>

      {/* Modern High-Contrast Minimalist Pill Toggle */}
      <div className="inline-flex items-center rounded border border-neutral-300 bg-white p-0.5 text-xs font-mono shadow-sm">
        <button
          type="button"
          onClick={() => switchLanguage("en")}
          className={`rounded px-2.5 py-1 transition-all ${
            currentLang === "en"
              ? "bg-neutral-900 text-white font-bold"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
          title="Read in English"
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => switchLanguage("hi")}
          className={`rounded px-2.5 py-1 transition-all ${
            currentLang === "hi"
              ? "bg-neutral-900 text-white font-bold"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
          title="हिन्दी में पढ़ें"
        >
          हिन्दी
        </button>
      </div>
    </div>
  );
}
