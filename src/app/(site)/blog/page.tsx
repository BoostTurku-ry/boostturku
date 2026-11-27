import type { Metadata } from "next";
import { gallery } from "@/content/gallery";
import { PostCard } from "@/components/sections/blog/PostCard";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Container } from "@/components/ui/Container";
import type { PostMeta } from "@/content/types";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Stories",
  description: "Stories from the Boost community: Startup Journey teams, alumni interviews and news since 2016.",
};

function byYear(posts: PostMeta[]) {
  const groups = new Map<string, PostMeta[]>();
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }
  return [...groups.entries()];
}

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;
  const years = byYear(rest);

  return (
    <>
      <PageHero
        eyebrow="Stories"
        meta={`${posts.length} stories`}
        title="Stories from the community."
        intro="Startup Journey teams, alumni interviews, board news and lessons learned, written by Boosters over the years."
        photo={gallery.stories}
      />

      <section className="pb-24 sm:pb-32">
        <Container size="wide">
          {featured && (
            <div className="border-b border-line pb-16">
              <p className="meta-label mb-6 text-boost">Latest</p>
              <PostCard post={featured} size="feature" />
            </div>
          )}

          {/* Year index */}
          <nav aria-label="Jump to year" className="meta-label mt-10 flex flex-wrap gap-2 text-ink-muted">
            {years.map(([year, list]) => (
              <a
                key={year}
                href={`#y${year}`}
                className="rounded-sm border border-line bg-surface px-3 py-1.5 hover:border-ink/30 hover:text-ink"
              >
                {year} <span className="text-ink-muted/70">· {list.length}</span>
              </a>
            ))}
          </nav>

          <div className="mt-6 space-y-20">
            {years.map(([year, list]) => (
              <div key={year} id={`y${year}`} className="scroll-mt-28">
                <div className="flex items-baseline gap-4 border-t border-line pt-4">
                  <h2 className="heading-display text-3xl text-ink">{year}</h2>
                  <span className="meta-label text-ink-muted">{list.length} {list.length === 1 ? "story" : "stories"}</span>
                </div>
                <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((post) => (
                    <li key={post.slug}>
                      <PostCard post={post} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
