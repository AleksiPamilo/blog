"use client";

import CommentSection from "@/components/CommentSection";
import ErrorDisplay from "@/components/ErrorDisplay";
import FollowButton from "@/components/FollowButton";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import BlogCarousel from "@/components/carousel/BlogCarousel";
import { IPost, IUser } from "@/interfaces";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Profile() {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<{ page: boolean; button: boolean }>({
    page: true,
    button: false,
  });
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const pathname = usePathname();

  const fetchData = useCallback(() => {
    if (!pathname.split("/")[1].startsWith("@")) return;

    setError(null);
    setLoading((prev) => ({ ...prev, page: true }));
    const slug = pathname.split("/")[1];

    fetch(
      `${apiUrl}/users?slug=${slug}&populate=posts,posts.tags,posts.images,posts.author,profile_comments,profile_comments.author,profile_comments.author.avatar,followers&filters=drafts`,
      { cache: "reload" }
    )
      .then(async (data) => {
        if (!data.ok) {
          throw new Error("Failed to fetch data");
        }

        const json = await data.json();
        const userData = json?.data?.[0];

        if (!userData) {
          setError("Unexpected error occurred");
        } else {
          const filteredPosts = userData.posts.filter(
            (post: IPost) => post.publishedAt !== null
          );

          const updatedUserData = {
            ...userData,
            posts: filteredPosts,
          };

          setUser(updatedUserData);

          try {
            const res = await fetch(
              "/api/users/follow-status?id=" + updatedUserData.id
            );
            const json = await res.json();
            setIsFollowing(json.isFollowing);
          } catch {
            setIsFollowing(false);
          }
        }
      })
      .catch(() => {
        setUser(null);
        setError("Failed to fetch data. Please try again later.");
      })
      .finally(() => setLoading((prev) => ({ ...prev, page: false })));
  }, [pathname]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFetchData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  if (!pathname.split("/")[1].startsWith("@")) {
    return <NotFound />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={handleFetchData} />;
  }

  if (loading.page) {
    return <Loading />;
  }

  if (!user) {
    return <NotFound />;
  }

  document.title = user.username + "'s Profile";

  const sortedPosts = user.posts
    .sort((a, b) => {
      return (
        new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
    })
    .reverse();

  return (
    <div className="w-full flex flex-col mt-28 gap-10 items-center justify-center">
      <div className="w-4/5 flex gap-2 items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold">{user.username}</h1>
          <Link href={`${pathname}/followers`}
            className="text-md hover:underline"
          >
            Followers: {user.followers.length}
          </Link>
        </div>
        <div>
          <FollowButton
            userId={user.id}
            isFollowing={isFollowing}
            onSuccess={() => {
              fetchData();
            }}
          />
        </div>
      </div>
      <div className="w-4/5">
        <BlogCarousel posts={sortedPosts} loop />
      </div>
      <div className="w-4/5 border border-zinc-200 p-4 mb-8 rounded-md shadow-md">
        <CommentSection data={user} />
      </div>
    </div>
  );
}
