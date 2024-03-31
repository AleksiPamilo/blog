import { IPost } from "@/interfaces/post";
import { timeAgo } from "@/utils/formatTime";
import Link from "next/link";

export default function BlogCard({ post }: { post: IPost }) {
  const author = post.author.data.attributes;

  return (
    <Link
      href={`/@${author.username}/${post.slug}`}
      className="flex flex-col w-[25rem] p-4 rounded-md bg-zinc-100 hover:scale-105"
    >
      <div className="flex items-center justify-between font-semibold">
        <h1>{post.title}</h1>
        <Link href={`/@${author.username}`} className="hover:underline">
          @{author.username}
        </Link>
      </div>
      <footer>Published {timeAgo(post.publishedAt)}</footer>
    </Link>
  );
}
