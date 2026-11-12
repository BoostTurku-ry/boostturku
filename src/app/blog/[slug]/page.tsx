import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/sections/blog/PostCard";
import { Container } from "@/components/ui/Container";
import { formatEventDate } from "@/lib/dates";
import { getAllPosts, getPost } from "@/lib/posts";

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: { type: "article", publishedTime: post.meta.date, images: post.meta.cover ? [post.meta.cover] : undefined },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const all = await getAllPosts();
  const i = all.findIndex((p) => p.slug === slug);
  const newer = all[i - 1];
  const older = all[i + 1];
  const { meta, html } = post;

  return (
    <article>
      <header className="pt-32 sm:pt-40">
        <Container size="narrow">
          <div className="label-mono flex items-center justify-between border-t border-line pt-4 text-ink-muted">
            <Link href="/blog" className="hover:text-ink">
              ← Stories
            </Link>
            <span>{formatEventDate(meta.date).long}</span>
          </div>
          <h1 className="heading mt-10 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05]">{meta.title}</h1>
          {meta.author && <p className="label-mono mt-6 text-ink-muted">By {meta.author}</p>}
        </Container>
        {meta.cover && (
          <Container size="default" className="mt-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-line">
              <Image src={meta.cover} alt="" fill preload sizes="(min-width: 1152px) 1088px, 95vw" className="object-cover" />
            </div>
          </Container>
        )}
      </header>

      <Container size="narrow" className="py-16 sm:py-20">
        {/* Rendered from our own Markdown files in src/content/posts. */}
        <div className="prose-boost" dangerouslySetInnerHTML={{ __html: html }} />
      </Container>

      {(newer || older) && (
        <section className="border-t border-line bg-surface py-20">
          <Container size="wide">
            <p className="label-mono text-ink-muted">Keep reading</p>
            <div className="mt-8 grid gap-10 sm:grid-cols-2">
              {[older, newer].filter(Boolean).map((p) => (
                <PostCard key={p!.slug} post={p!} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
