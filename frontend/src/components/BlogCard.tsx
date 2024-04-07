"use client";

import { IPost } from "@/interfaces/post";
import { IUser } from "@/interfaces/user";
import { formatDDMMYYYY } from "@/utils/formatTime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SkeletonCard from "./SkeletonCard";
import Image from "next/image";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function BlogCard({
  post,
  author,
}: {
  post: IPost;
  author?: IUser;
}) {
  const router = useRouter();
  author = author ?? post.author.data.attributes;

  if (!author) {
    return <SkeletonCard />;
  }

  const image = post.images.data[0].attributes;
  const thumbnail = strapiUrl + image.url;

  return (
    <button
      className="flex flex-col relative w-full h-[25rem] rounded-md shadow-md bg-zinc-100 hover:scale-105"
      onClick={() => {
        router.push(`/${author.slug}/${post.slug}`);
      }}
    >
      <div className="w-full relative h-1/2 border-b">
        <Image
          src={thumbnail}
          alt={image.alternativeText ?? "thumbnail"}
          className="object-fill rounded-t-md"
          fill={true}
        />
      </div>
      <div className="w-full h-max p-2">
        <div className="flex gap-2">
          {post.tags.data.slice(0, 2).map((tag) => (
            <span
              key={tag.id}
              className="py-2 px-4 rounded-lg text-zinc-200"
              style={{
                backgroundColor: tag.attributes.color,
              }}
            >
              {tag.attributes.name}
            </span>
          ))}
        </div>

        <div className="text-left mt-4">
          <h1 className="text-xl font-semibold">{post.title}</h1>
        </div>
      </div>
      <footer className="absolute bottom-1 left-0 w-full flex p-2 items-center justify-between">
        <span>{formatDDMMYYYY(post.publishedAt)}</span>
        <Link
          onClick={(e) => e.stopPropagation()}
          href={`/@${author.username}`}
          className="hover:underline"
        >
          {author.slug}
        </Link>
      </footer>
    </button>
  );
}
