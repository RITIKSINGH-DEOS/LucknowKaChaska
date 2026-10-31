"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";

interface ComparisonRow {
  spotName: string;
  landmark: string;
  signatureDish: string;
  priceRange: string;
  hours: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export default function NewPostPage() {
  const router = useRouter();

  // AI Generator States
  const [aiTopic, setAiTopic] = useState("");
  const [aiArea, setAiArea] = useState("Gomti Nagar");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");

  // Editor Form States
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const [category, setCategory] = useState("Street Food");
  const [area, setArea] = useState("Gomti Nagar");
  const [readTime, setReadTime] = useState("3 min read");
  const [quickVerdict, setQuickVerdict] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Dynamic Comparison Table State
  const [comparisonTable, setComparisonTable] = useState<ComparisonRow[]>([
    { spotName: "", landmark: "", signatureDish: "", priceRange: "", hours: "" },
  ]);

  // Dynamic FAQs State
  const [faqs, setFaqs] = useState<FAQItem[]>([
    { question: "", answer: "" },
  ]);

  // Handle AI Auto-Generation
  const handleAutoGenerate = async () => {
    if (!aiTopic.trim()) {
      alert("Please enter a topic to trigger autonomous generation.");
      return;
    }

    setIsGenerating(true);
    setGenerationStep("1/3 Extracting live SERP facts from Lucknow directories...");

    try {
      setTimeout(() => {
        setGenerationStep("2/3 Synthesizing with Gemini 2.0 Flash (AEO/GEO optimization)...");
      }, 1500);

      setTimeout(() => {
        setGenerationStep("3/3 Generating & compressing WebP featured media (<40KB)...");
      }, 3500);

      const res = await fetch("/api/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: aiTopic, area: aiArea }),
      });

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error || "Generation failed");
      }

      const d = json.data;
      setTitle(d.meta.title || "");
      setSlug(d.meta.slug || "");
      setMetaDescription(d.meta.description || "");
      setTargetKeyword(d.meta.targetKeyword || "");
      setCategory(d.meta.category || "Street Food");
      setArea(d.meta.area || aiArea);
      setReadTime(d.meta.readTime || "3 min read");
      setQuickVerdict(d.aeoSnippet.quickVerdict || "");
      setCoverImageUrl(d.assets.coverImageUrl || "");
      setComparisonTable(d.geoComparisonGrid || []);
      setFaqs(d.faqs || []);

      // Assemble Markdown Content from structured sections
      let markdown = "";
      if (Array.isArray(d.sections)) {
        markdown = d.sections
          .map(
            (sec: { spotNumber: number; spotName: string; tagline: string; overview: string; mustTry: string; price: string; landmark: string; insiderTip: string }) =>
              `## ${sec.spotNumber}. ${sec.spotName} — ${sec.tagline}\n${sec.overview}\n\n* **Must-Try Dish:** ${sec.mustTry}\n* **Price Range:** ${sec.price}\n* **Landmark:** ${sec.landmark}\n* **Insider Tip:** ${sec.insiderTip}\n`
          )
          .join("\n---\n\n");
      }
      setContentMarkdown(markdown);

      setFeedbackMessage({
        type: "success",
        text: `✨ Autonomous Draft Generated! Image compressed to ${(d.assets.byteSize / 1024).toFixed(1)} KB. Review below and publish.`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error generating post";
      setFeedbackMessage({ type: "error", text: msg });
    } finally {
      setIsGenerating(false);
      setGenerationStep("");
    }
  };

  // Add / Remove Row Helpers
  const addTableRow = () => {
    setComparisonTable([...comparisonTable, { spotName: "", landmark: "", signatureDish: "", priceRange: "", hours: "" }]);
  };
  const removeTableRow = (index: number) => {
    setComparisonTable(comparisonTable.filter((_, i) => i !== index));
  };
  const updateTableRow = (index: number, field: keyof ComparisonRow, val: string) => {
    const updated = [...comparisonTable];
    updated[index][field] = val;
    setComparisonTable(updated);
  };

  const addFaqRow = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaqRow = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));
  const updateFaqRow = (index: number, field: keyof FAQItem, val: string) => {
    const updated = [...faqs];
    updated[index][field] = val;
    setFaqs(updated);
  };

  // Save / Publish Post Handler
  const handleSavePost = async (publishNow: boolean = false) => {
    if (!title || !slug) {
      alert("Title and URL Slug are required.");
      return;
    }

    setIsSaving(true);
    const postStatus = publishNow ? "PUBLISHED" : status;

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          metaDescription,
          targetKeyword,
          category,
          area,
          readTime,
          quickVerdict,
          coverImageUrl,
          comparisonTable,
          contentMarkdown,
          faqs,
          status: postStatus,
        }),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Failed to save post");

      setFeedbackMessage({
        type: "success",
        text: publishNow
          ? "🚀 Article Published Live to food.ritiksingh.in!"
          : "💾 Draft saved cleanly to content/posts/ directory.",
      });

      setTimeout(() => {
        router.push("/admin");
      }, 1200);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving post";
      setFeedbackMessage({ type: "error", text: msg });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6 mb-8 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-1">
            Publishing Workspace
          </span>
          <h1 className="text-2xl font-black text-neutral-900 tracking-tight">
            Create or Auto-Generate Guide<span className="text-neutral-400">.</span>
          </h1>
        </div>
        <Link
          href="/admin"
          className="text-xs font-mono px-3 py-1.5 border border-neutral-300 rounded hover:border-neutral-900 transition-colors"
        >
          ← Back to Console
        </Link>
      </div>

      {feedbackMessage && (
        <div
          className={`p-4 rounded-lg mb-8 text-xs font-mono border ${
            feedbackMessage.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-900"
              : "bg-red-50 border-red-300 text-red-900"
          }`}
        >
          {feedbackMessage.text}
        </div>
      )}

      {/* ======================================================== */}
      {/* OPTION A: ONE-CLICK MAGIC AI AUTO-FILL                  */}
      {/* ======================================================== */}
      <section className="p-6 border-2 border-neutral-900 rounded-lg bg-neutral-50 mb-12 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">✨</span>
          <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider font-mono">
            Option A: Magic AI Auto-Fill Engine
          </h2>
        </div>
        <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
          Type any food topic. Backend automation will research real live prices/timings via Search API, write AEO/GEO tables with Gemini 2.0, compress a WebP image &lt;40KB, and auto-fill the editor below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <input
              type="text"
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              placeholder="e.g. Top 5 Biryani Spots in Chowk"
              className="w-full text-xs p-3 border border-neutral-300 rounded focus:border-neutral-900 outline-none font-medium bg-white"
            />
          </div>
          <div>
            <select
              value={aiArea}
              onChange={(e) => setAiArea(e.target.value)}
              className="w-full text-xs p-3 border border-neutral-300 rounded focus:border-neutral-900 outline-none bg-white font-medium"
            >
              <option value="Gomti Nagar">Gomti Nagar</option>
              <option value="Chowk">Chowk / Old City</option>
              <option value="Hazratganj">Hazratganj</option>
              <option value="Aminabad">Aminabad</option>
              <option value="Alambagh">Alambagh</option>
              <option value="Aliganj">Aliganj</option>
              <option value="Indiranagar">Indiranagar</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            disabled={isGenerating}
            onClick={handleAutoGenerate}
            className="px-5 py-2.5 bg-neutral-900 text-white text-xs font-mono font-bold rounded hover:bg-neutral-800 disabled:opacity-50 transition-all flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                <span>Generating Draft...</span>
              </>
            ) : (
              <span>⚡ Generate Complete Draft</span>
            )}
          </button>
          {generationStep && (
            <span className="text-xs font-mono text-neutral-600 animate-pulse">
              {generationStep}
            </span>
          )}
        </div>
      </section>

      {/* ======================================================== */}
      {/* OPTION B: WORDPRESS-STYLE MANUAL EDITOR                  */}
      {/* ======================================================== */}
      <section className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider font-mono">
            ✍️ Option B: Editorial Review &amp; Manual Customization
          </h2>
          <span className="text-[11px] text-neutral-500 font-mono">
            Modify any generated field or write manually from scratch.
          </span>
        </div>

        {/* Title & Slug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-700 mb-1">
              Article Title (H1 / SEO)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 5 Best Kathi & Chicken Roll Spots in Gomti Nagar"
              className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:border-neutral-900 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-700 mb-1">
              URL Slug (Clean URI)
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. best-rolls-in-gomti-nagar"
              className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:border-neutral-900 outline-none font-mono"
            />
          </div>
        </div>

        {/* Category & Area */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:border-neutral-900 outline-none bg-white"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}




            </select>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-700 mb-1">Area</label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:border-neutral-900 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-700 mb-1">Read Time</label>
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:border-neutral-900 outline-none font-mono"
            />
          </div>
        </div>

        {/* Meta Description */}
        <div>
          <label className="block text-xs font-mono uppercase text-neutral-700 mb-1">
            Meta Description (Google SERP Snippet: 140-155 characters)
          </label>
          <textarea
            rows={2}
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            placeholder="Clickable meta description for Google searchers..."
            className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:border-neutral-900 outline-none"
          ></textarea>
        </div>

        {/* Position #0 AEO Quick Verdict Box */}
        <div className="p-4 border border-neutral-300 rounded-lg bg-neutral-50">
          <label className="block text-xs font-mono uppercase font-bold text-neutral-900 mb-1">
            ⚡ Quick Verdict (Summary — 40-50 Words)
          </label>
          <textarea
            rows={3}
            value={quickVerdict}
            onChange={(e) => setQuickVerdict(e.target.value)}
            placeholder="Direct no-fluff answer naming #1 spot and #1 budget spot..."
            className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:border-neutral-900 outline-none bg-white"
          ></textarea>
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-xs font-mono uppercase text-neutral-700 mb-1">
            Cover Image Path / URL
          </label>
          <input
            type="text"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            placeholder="/images/posts/your-slug.webp"
            className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:border-neutral-900 outline-none font-mono"
          />
        </div>

        {/* Comparison Table Editor (GEO) */}
        <div className="border border-neutral-200 rounded-lg p-4 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold uppercase text-neutral-900">
              📊 Comparison Table Rows (GEO Entity Grid)
            </span>
            <button
              type="button"
              onClick={addTableRow}
              className="text-[11px] font-mono px-2 py-1 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded"
            >
              + Add Row
            </button>
          </div>
          <div className="space-y-2">
            {comparisonTable.map((row, idx) => (
              <div key={idx} className="grid grid-cols-6 gap-2 items-center">
                <input
                  type="text"
                  placeholder="Spot Name"
                  value={row.spotName}
                  onChange={(e) => updateTableRow(idx, "spotName", e.target.value)}
                  className="col-span-1 text-[11px] p-2 border border-neutral-300 rounded outline-none"
                />
                <input
                  type="text"
                  placeholder="Landmark"
                  value={row.landmark}
                  onChange={(e) => updateTableRow(idx, "landmark", e.target.value)}
                  className="col-span-1 text-[11px] p-2 border border-neutral-300 rounded outline-none"
                />
                <input
                  type="text"
                  placeholder="Signature Dish"
                  value={row.signatureDish}
                  onChange={(e) => updateTableRow(idx, "signatureDish", e.target.value)}
                  className="col-span-2 text-[11px] p-2 border border-neutral-300 rounded outline-none"
                />
                <input
                  type="text"
                  placeholder="Price (₹)"
                  value={row.priceRange}
                  onChange={(e) => updateTableRow(idx, "priceRange", e.target.value)}
                  className="col-span-1 text-[11px] p-2 border border-neutral-300 rounded outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeTableRow(idx)}
                  className="col-span-1 text-xs text-red-600 hover:underline font-mono"
                >
                  ✕ Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Content Markdown Area */}
        <div>
          <label className="block text-xs font-mono uppercase text-neutral-700 mb-1">
            Article Body Content (Markdown)
          </label>
          <textarea
            rows={12}
            value={contentMarkdown}
            onChange={(e) => setContentMarkdown(e.target.value)}
            placeholder="Write in clean markdown: ## 1. Spot Name..."
            className="w-full text-xs font-mono p-3 border border-neutral-300 rounded focus:border-neutral-900 outline-none leading-relaxed"
          ></textarea>
        </div>

        {/* FAQs Editor */}
        <div className="border border-neutral-200 rounded-lg p-4 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold uppercase text-neutral-900">
              ❓ FAQs for Google People Also Ask
            </span>
            <button
              type="button"
              onClick={addFaqRow}
              className="text-[11px] font-mono px-2 py-1 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded"
            >
              + Add FAQ
            </button>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-3 border border-neutral-200 rounded bg-neutral-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-neutral-600">Question #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeFaqRow(idx)}
                    className="text-xs text-red-600 hover:underline font-mono"
                  >
                    ✕ Remove
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Question"
                  value={faq.question}
                  onChange={(e) => updateFaqRow(idx, "question", e.target.value)}
                  className="w-full text-xs p-2 border border-neutral-300 rounded outline-none bg-white"
                />
                <textarea
                  rows={2}
                  placeholder="Answer"
                  value={faq.answer}
                  onChange={(e) => updateFaqRow(idx, "answer", e.target.value)}
                  className="w-full text-xs p-2 border border-neutral-300 rounded outline-none bg-white"
                ></textarea>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Publishing Controls */}
        <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs font-mono">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="DRAFT"
                checked={status === "DRAFT"}
                onChange={() => setStatus("DRAFT")}
              />
              <span>Save as Draft</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="PUBLISHED"
                checked={status === "PUBLISHED"}
                onChange={() => setStatus("PUBLISHED")}
              />
              <span className="text-emerald-700 font-bold">Publish to Live Site</span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleSavePost(false)}
              className="px-4 py-2 border border-neutral-300 text-neutral-800 text-xs font-mono rounded hover:border-neutral-900 transition-colors"
            >
              {isSaving ? "Saving..." : "💾 Save Draft"}
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleSavePost(true)}
              className="px-5 py-2 bg-neutral-900 text-white text-xs font-mono font-bold rounded hover:bg-neutral-800 transition-colors shadow-sm"
            >
              {isSaving ? "Publishing..." : "🚀 Publish Post Now"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
