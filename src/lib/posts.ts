import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { Marked } from "marked";
import { cacheLife } from "next/cache";
import type { PostMeta } from "@/content/types";

/** Stories live as Markdown files with a small JSON-valued frontmatter block. */
const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

const markdown = new Marked({ gfm: true });

function parse(slug: string, source: string) {
  // Files may be checked out with Windows line endings.
  const raw = source.replace(/\r\n/g, "\n");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error(`Post "${slug}" is missing frontmatter`);
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(": ");
    if (i > 0) meta[line.slice(0, i)] = JSON.parse(line.slice(i + 2));
  }
  return {
    meta: {
      slug,
      title: meta.title,
      date: meta.date,
      author: meta.author,
      excerpt: meta.excerpt ?? "",
      cover: meta.cover,
    } satisfies PostMeta,
    body: raw.slice(match[0].length),
  };
}

/** Remove the first Markdown image that points at `src`. */
function withoutFirstImage(body: string, src: string) {
  const end = body.indexOf(`](${src})`);
  if (end === -1) return body;
  const start = body.lastIndexOf("![", end);
  return start === -1 ? body : body.slice(0, start) + body.slice(end + src.length + 3);
}

/** All posts, newest first. */
export async function getAllPosts(): Promise<PostMeta[]> {
  "use cache";
  cacheLife("max");
  const files = (await readdir(POSTS_DIR)).filter((f) => f.endsWith(".md"));
  const posts = await Promise.all(
    files.map(async (file) => parse(file.slice(0, -3), await readFile(path.join(POSTS_DIR, file), "utf8")).meta),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

/** One post with its body rendered to HTML, or null if it doesn't exist. */
export async function getPost(slug: string): Promise<{ meta: PostMeta; html: string } | null> {
  "use cache";
  cacheLife("max");
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  let raw: string;
  try {
    raw = await readFile(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  } catch {
    return null;
  }
  const { meta, body } = parse(slug, raw);
  // The cover is shown above the article, so drop its first appearance in the body.
  const content = meta.cover ? withoutFirstImage(body, meta.cover) : body;
  const html = (markdown.parse(content, { async: false }) as string)
    .replaceAll("<img ", '<img loading="lazy" decoding="async" ')
    .replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"');
  return { meta, html };
}
