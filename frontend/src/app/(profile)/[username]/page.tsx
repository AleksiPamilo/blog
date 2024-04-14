"use client";

import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { IUser } from "@/interfaces/user";
import { formatTime } from "@/utils/formatTime";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Profile() {
  const [user, setUser] = useState<IUser | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const slug = pathname.split("/")[1];

    fetch(`${apiUrl}/api/users?slug=${slug}&populate=posts,posts.tags,posts.images`).then(async (data) => {
      const json = await data.json();
      const user = json?.data?.[0];

      setUser(user);
    }).catch(() => {
      setUser(null);
    });
  }, []);

  if (!user) return <Loading />;

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <div className="grid grid-cols-3 p-4 rounded-md w-4/5 bg-zinc-100 shadow-md">
        <div className="col-span-2">{user.username}</div>
        <div className="text-right">
          User created: {formatTime(user.createdAt)}
        </div>
      </div>
      <div className="w-4/5 flex flex-col gap-3">
        <h1>User{"'"}s blog posts:</h1>
        {user.posts.map((post) => (
          <BlogCard post={post} author={user} key={post.slug} />
        ))}
      </div>
    </div>
  );
}
