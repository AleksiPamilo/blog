"use client";

import ErrorDisplay from "@/components/ErrorDisplay";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import ProfileBlogCard from "@/components/ProfileBlogCard";
import { Button } from "@/components/ui/button";
import { IUser } from "@/interfaces";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Profile() {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();

  const fetchData = useCallback(() => {
    setError(null);
    setLoading(true);
    const slug = pathname.split("/")[1];

    fetch(`${apiUrl}/api/users?slug=${slug}&populate=posts,posts.tags,posts.images`)
      .then(async (data) => {
        if (!data.ok) {
          throw new Error("Failed to fetch data");
        }

        const json = await data.json();
        const userData = json?.data?.[0];
        if (!userData) setError("Unexpected error occurred");
        setUser(userData);
      })
      .catch(() => {
        setUser(null);
        setError("Failed to fetch data. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [pathname]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFetchData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  if (error) {
    return <ErrorDisplay error={error} onRetry={handleFetchData} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <NotFound />
  }

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
