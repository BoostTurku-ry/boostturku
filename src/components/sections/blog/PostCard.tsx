import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/content/types";
import { cn } from "@/lib/cn";
import { formatEventDate } from "@/lib/dates";

type PostCardProps = {
  post: PostMeta;
  size?: "default" | "feature";
};

export function PostCard({ post, size = "default" }: PostCardProps) {
  const feature = size === "feature";
  return (
    <Link href={`/blog/${post.slug}`} className={cn("group block", feature && "grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10")}>
      <div
        className={cn(
          "relative overflow-hidden rounded-card bg-line",
          feature ? "aspect-[16/10] rounded-3xl lg:col-span-7" : "aspect-[16/10]",
        )}
      >
        {post.cover ? (
          <Image
            src={post.cover}
            alt=""
            fill
            sizes={feature ? "(min-width: 1024px) 58vw, 92vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          // No cover: a typographic placeholder in brand colours.
          <div className="absolute inset-0 flex items-end bg-boost-soft p-6">
            <span className="heading-display text-5xl text-boost/25">{post.date.slice(0, 4)}</span>
          </div>
        )}
      </div>
      <div className={feature ? "lg:col-span-5" : "mt-5"}>
        <p className="label-mono text-ink-muted">
          {formatEventDate(post.date).long}
          {post.author && post.author !== "Boost Turku" && ` · ${post.author}`}
        </p>
        <h3 className={cn("heading mt-3 group-hover:text-boost", feature ? "text-3xl sm:text-4xl" : "text-xl")}>{post.title}</h3>
        {post.excerpt && (
          <p className={cn("mt-3 leading-relaxed text-ink-soft", feature ? "text-lg" : "line-clamp-2 text-[15px]")}>{post.excerpt}</p>
        )}
      </div>
    </Link>
  );
}
