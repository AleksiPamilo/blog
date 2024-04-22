"use client";

import Loading from "@/components/Loading";
import ProfileBlogCard from "@/components/ProfileBlogCard";
import { Button } from "@/components/ui/button";
import { IUser } from "@/interfaces";
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
  }, [pathname]);

  if (!user) return <Loading />;
  document.title = user.username + "'s Profile";

  const sortedPosts = user.posts.sort((a, b) => {
    return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
  }).reverse();

  return (
    <div className="w-full flex flex-col mt-28 gap-10 items-center justify-center">
      <div className="w-4/5 flex gap-2 items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold">{user.username}</h1>
          <button onClick={() => alert("Todo Follower Logic")} className="text-md hover:underline">Followers: 126</button>
        </div>
        <div>
          <Button onClick={() => alert("TODO")}>Follow</Button>
        </div>
      </div>
      <div className="w-4/5 flex flex-col gap-3">
        {sortedPosts.map((post) => (
          <ProfileBlogCard user={user} post={post} key={post.slug} />
        ))}
      </div>
    </div>
  );
}
