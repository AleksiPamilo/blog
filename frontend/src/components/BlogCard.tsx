import { IPost } from "@/interfaces/post";
import { IUser } from "@/interfaces/user";
import { timeAgo } from "@/utils/formatTime";
import Link from "next/link";

export default function BlogCard({
  post,
  author,
}: {
  post: IPost;
  author?: IUser;
}) {
  author = author ?? post.author.data.attributes;

  if (!author) {
    return <div>Loading...</div>;
  }

  return (
    <Link
      href={`/${author.slug}/${post.slug}`}
      className="flex flex-col w-full p-4 rounded-md bg-zinc-100 hover:scale-105"
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
