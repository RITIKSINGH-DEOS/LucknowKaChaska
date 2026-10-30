"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            layout?: unknown;
            autoDisplay?: boolean;
          },
          element: string
        ) => void;
      };
    };
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    // Define the global callback
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,ur",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    // Check if script is already added
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.type = "text/javascript";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="flex items-center gap-1.5 text-xs text-neutral-800 font-medium px-2 py-1 border border-neutral-300 rounded bg-white hover:border-neutral-900 transition-colors">
      <span className="text-neutral-500 font-mono text-[11px]">🌐 Lang:</span>
      <div id="google_translate_element" className="inline-block min-w-[70px]"></div>
    </div>
  );
}
