// ========================================================
// File: src/lib/markdown.ts
// Purpose: Lightweight, zero-dependency Markdown parser for Food Guides
// ========================================================

/**
 * Formats inline Markdown patterns (**bold**, *italic*, `code`) into HTML.
 */
export function formatInlineMarkdown(text: string): string {
  if (!text) return "";
  return text
    // Bold: **text**
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-neutral-900">$1</strong>')
    // Italic: *text* (excluding already formatted HTML tags)
    .replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '<em class="italic text-neutral-800">$1</em>')
    // Inline code: `code`
    .replace(/`(.*?)`/g, '<code class="bg-neutral-100 px-1 py-0.5 rounded text-xs font-mono text-neutral-800">$1</code>');
}

/**
 * Parses full article Markdown into clean semantic HTML with styling.
 */
export function parseMarkdownToHtml(markdown: string): string {
  if (!markdown) return "";

  // Normalize line breaks
  const normalized = markdown.replace(/\r\n/g, "\n");
  const blocks = normalized.split(/\n\n+/);

  const htmlBlocks = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";

    // Horizontal Rule
    if (trimmed === "---" || trimmed === "***") {
      return '<hr class="my-6 border-neutral-200" />';
    }

    // Headings
    if (trimmed.startsWith("### ")) {
      const headingText = formatInlineMarkdown(trimmed.slice(4));
      return `<h3 class="text-base font-bold text-neutral-900 pt-2 mt-4">${headingText}</h3>`;
    }
    if (trimmed.startsWith("## ")) {
      const headingText = formatInlineMarkdown(trimmed.slice(3));
      return `<h2 class="text-xl font-bold text-neutral-900 pt-4 mt-6 border-t border-neutral-100">${headingText}</h2>`;
    }
    if (trimmed.startsWith("# ")) {
      const headingText = formatInlineMarkdown(trimmed.slice(2));
      return `<h1 class="text-2xl font-black text-neutral-900 mb-4">${headingText}</h1>`;
    }

    // List or Key-Value Bullets block
    const lines = trimmed.split("\n");
    const isBulletList = lines.every((line) => line.trim().startsWith("* ") || line.trim().startsWith("- "));

    if (isBulletList) {
      const renderedLines = lines.map((line) => {
        const rawItem = line.trim().replace(/^[\*\-]\s+/, "");
        // Check for "* **Key:** Value"
        const keyValueMatch = rawItem.match(/^\*\*(.*?):\*\*\s*(.*)$/);
        if (keyValueMatch) {
          const key = keyValueMatch[1];
          const value = formatInlineMarkdown(keyValueMatch[2]);
          return `<div class="text-xs my-2 pl-3 border-l-2 border-neutral-300 py-0.5"><strong class="text-neutral-900 font-mono font-bold">${key}:</strong> <span class="text-neutral-700">${value}</span></div>`;
        }
        return `<li class="text-xs my-1 text-neutral-700">${formatInlineMarkdown(rawItem)}</li>`;
      });

      // If it contains regular <li> items, wrap with <ul>
      if (renderedLines.some((l) => l.startsWith("<li"))) {
        return `<ul class="list-disc pl-5 my-3 space-y-1">${renderedLines.join("")}</ul>`;
      }
      return `<div class="my-3 space-y-1.5">${renderedLines.join("")}</div>`;
    }

    // Regular Paragraph
    return `<p class="text-sm text-neutral-700 leading-relaxed my-3">${formatInlineMarkdown(trimmed)}</p>`;
  });

  return htmlBlocks.filter(Boolean).join("\n");
}
