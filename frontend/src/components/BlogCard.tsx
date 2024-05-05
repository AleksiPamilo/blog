"use client";

import { IPost, IUser } from "@/interfaces";
import { formatDDMMYYYY } from "@/utils/formatTime";
import Link from "next/link";
import Image from "next/image";
import BlogCardSkeleton from "./BlogCardSkeleton";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function BlogCard({
  post,
  author,
}: {
  post: IPost;
  author?: IUser;
}) {
  const user = author ?? post.author;

  if (!user) {
    return <BlogCardSkeleton />;
  }

  const image = post.images?.[0];
  const thumbnail = strapiUrl + image?.url;

  return (
    <div className="relative hover:scale-105 transition-all ease-in-out duration-500">
      <Link
        href={`/${user.slug}/${post.slug}`}
        className="flex flex-col w-[23rem] h-[25rem] rounded-md shadow-md"
      >
        <div className="w-full relative h-1/2 border-b">
          {image ?
            <Image
              src={thumbnail}
              alt={image.alternativeText ?? "thumbnail"}
              className="object-fill rounded-t-md"
              fill={true}
            />
            : <div className={`
          ${[
                "from-emerald-400 to-pink-400",
                "from-fuchsia-300 to-emerald-500",
                "from-cyan-200 to-violet-500",
                "from-lime-500 to-rose-400"
              ][Math.floor(Math.random() * 4)]} bg-gradient-to-br w-full h-full rounded-t-md
          `} />
          }
        </div>
        <div className="w-full h-max p-2">
          <div className="flex gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag.id}
                className="py-2 px-4 rounded-full text-gray-700"
                style={{
                  backgroundColor: tag.color,
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>

          <div className="text-left mt-4">
            <h1 className="text-xl font-semibold">{post.title}</h1>
          </div>
        </div>
      </Link>
      <footer className="absolute bottom-1 left-0 w-full flex p-2 items-center justify-between">
        <span>{formatDDMMYYYY(post.publishedAt)}</span>
        <Link
          href={`/@${user.username}`}
          className="hover:underline"
        >
          {user.slug}
        </Link>
      </footer>
    </div>
  );
}
