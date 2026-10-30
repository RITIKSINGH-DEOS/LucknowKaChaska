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
    // Check existing cookie
    const cookies = document.cookie.split(";");
    const transCookie = cookies.find((c) => c.trim().startsWith("googtrans="));
    if (transCookie && transCookie.includes("/en/hi")) {
      setCurrentLang("hi");
    } else {
      setCurrentLang("en");
    }

    // Initialize hidden Google Translate element
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi",
            autoDisplay: false,
          },
          "google_translate_hidden"
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
  }, []);

  const switchLanguage = (lang: "en" | "hi") => {
    if (lang === currentLang) return;

    // Set google translate cookies
    document.cookie = `googtrans=/en/${lang}; path=/;`;
    if (window.location.hostname) {
      document.cookie = `googtrans=/en/${lang}; path=/; domain=${window.location.hostname};`;
      document.cookie = `googtrans=/en/${lang}; path=/; domain=.${window.location.hostname};`;
    }

    setCurrentLang(lang);
    window.location.reload();
  };

  return (
    <div className="flex items-center">
      {/* Hidden container for Google script execution */}
      <div id="google_translate_hidden" className="hidden" aria-hidden="true"></div>

      {/* Modern Minimalist B&W Pill Switcher */}
      <div className="inline-flex items-center rounded border border-neutral-300 bg-white p-0.5 text-xs font-mono shadow-sm">
        <button
          type="button"
          onClick={() => switchLanguage("en")}
          className={`rounded px-2 py-1 transition-all ${
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
