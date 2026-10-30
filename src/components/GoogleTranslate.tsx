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
    // 1. Detect current language from cookies
    const cookies = document.cookie.split(";");
    const transCookie = cookies.find((c) => c.trim().startsWith("googtrans="));
    if (transCookie && transCookie.includes("/en/hi")) {
      setCurrentLang("hi");
    } else {
      setCurrentLang("en");
    }

    // 2. Lock body at top: 0 to prevent any header hiding
    const lockBodyAtTop = () => {
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

    lockBodyAtTop();
    const observer = new MutationObserver(lockBodyAtTop);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    // 3. Initialize Google Translate engine
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

  // Helper to completely purge all Google Translate cookies
  const clearGoogleTranslateCookies = () => {
    const hostname = window.location.hostname;
    const domains = [
      "",
      hostname,
      `.${hostname}`,
      hostname.replace(/^www\./, ""),
      `.${hostname.replace(/^www\./, "")}`,
    ];

    for (const d of domains) {
      const domainStr = d ? `; domain=${d}` : "";
      document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${domainStr}`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT${domainStr}`;
    }
  };

  const switchLanguage = (targetLang: "en" | "hi") => {
    if (targetLang === currentLang) return;
    setCurrentLang(targetLang);

    // Smooth soft fade before transition
    document.body.style.transition = "opacity 0.15s ease-out";
    document.body.style.opacity = "0.5";

    if (targetLang === "hi") {
      // Set cookie for Hindi
      const hostname = window.location.hostname;
      document.cookie = "googtrans=/en/hi; path=/;";
      if (hostname) {
        document.cookie = `googtrans=/en/hi; path=/; domain=${hostname};`;
        document.cookie = `googtrans=/en/hi; path=/; domain=.${hostname};`;
      }
    } else {
      // Completely erase cookies to restore original English
      clearGoogleTranslateCookies();
    }

    // Fast soft reload (150ms)
    setTimeout(() => {
      window.location.reload();
    }, 150);
  };

  return (
    <div className="flex items-center">
      {/* Hidden target for Google Translate script */}
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
