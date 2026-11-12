import type { MetadataRoute } from "next";
import { programDetails } from "@/content/programs";
import { getAllPosts } from "@/lib/posts";

const BASE = "https://www.boostturku.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/about", "/programs", "/events", "/alumni", "/blog", "/get-involved", "/contact"];
  const posts = await getAllPosts();
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}` })),
    ...programDetails.map((p) => ({ url: `${BASE}/programs/${p.slug}` })),
    ...posts.map((p) => ({ url: `${BASE}/blog/${p.slug}`, lastModified: p.date })),
  ];
}
