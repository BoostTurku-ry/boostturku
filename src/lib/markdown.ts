import { Marked } from "marked";

const markdown = new Marked({ gfm: true, breaks: true });

/**
 * Renders trusted Markdown (our content files, or text written by the board in
 * the admin) to HTML. Raw HTML in the source is escaped; external links open in a new tab.
 */
export function renderMarkdown(source: string) {
  const escaped = source.replace(/</g, "&lt;");
  return (markdown.parse(escaped, { async: false }) as string).replace(
    /<a href="(https?:\/\/[^"]+)"/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer"',
  );
}
