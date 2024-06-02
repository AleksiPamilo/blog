"use client";

import { IPost, IUser } from "@/interfaces";
import { formatDDMMYYYY } from "@/utils/formatTime";
import Link from "next/link";
import Image from "next/image";
import BlogCardSkeleton from "./BlogCardSkeleton";
import { cn } from "@/lib/utils";
import { Calendar, PenLine, Timer } from "lucide-react";
import { estimateReadingTimeFromHtml } from "@/utils/readingTime";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function BlogCard({
  post,
  author,
  draft,
  className,
}: {
  post: IPost;
  author?: IUser;
  draft?: boolean;
  className?: string;
}) {
  const user = author ?? post.author;

  if (!user) {
    return <BlogCardSkeleton />;
  }

  const image = post.images?.[0];
  const thumbnail = strapiUrl + image?.url;

  return (
    <div className={cn("w-[20rem] h-[25rem] relative hover:scale-105 transition-all ease-in-out duration-500", className)}>
      <Link
        href={`/${user.slug}${draft ? "/drafts" : ""}/${post.slug}`}
        className="grid grid-rows-6 w-full h-full rounded-3xl shadow-md"
        passHref
      >
        <div className="w-full relative h-full border-b row-span-3">
          {image ?
            <Image
              src={thumbnail}
              alt={image.alternativeText ?? "thumbnail"}
              className="object-fill rounded-t-3xl"
              fill={true}
            />
            : <div className={`
            ${[
                "from-emerald-400 to-pink-400",
                "from-fuchsia-300 to-emerald-500",
                "from-cyan-200 to-violet-500",
                "from-lime-500 to-rose-400"
              ][Math.floor(Math.random() * 4)]} bg-gradient-to-br w-full h-full rounded-t-3xl
              `} />
          }
        </div>
        <div className="w-full h-full p-4">
          <div className="flex flex-wrap gap-2">
            <span className="flex gap-2 text-sm items-center">
              <PenLine className="w-5 h-5" />
              <Link href={`/${user.slug}`} className="hover:underline">
                {user.username}
              </Link>
            </span>

            <span className="flex gap-2 text-sm items-center">
              <Calendar className="w-5 h-5" />
              <p>{formatDDMMYYYY(draft ? post.createdAt : post.publishedAt)}</p>
            </span>

            <span className="flex gap-2 text-sm items-center">
              <Timer className="w-5 h-5" />
              <p>{estimateReadingTimeFromHtml(post.description)} min</p>
            </span>

            <span hidden={!draft} className="text-cyan-500 drop-shadow-[2px_2px_4px_#06b6d4]">draft</span>
          </div>
        </div>

        <div className="px-4 row-span-2 mt-2">
          <div className="text-left">
            <h1 className="text-xl font-semibold">{post.title}</h1>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-2 gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.id}
              className=""
              style={{
                color: tag.color,
                textShadow: `2px 2px 4px ${tag.color}`,
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
}
